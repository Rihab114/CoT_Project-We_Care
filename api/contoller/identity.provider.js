const identityModel = require('../model/user');
const argon2 = require('argon2');
const uuidv4 = require('uuidv4');
const validityTime = require('../config.js')().validityTime;
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
function IdentityProvider(){};
IdentityProvider.prototype.signUp = async (req, res , next)=> {
    console.log("aaaaa");
    try {
        req.body.password = await argon2.hash(req.body.password, {
            type : argon2.argon2id,
            memoryCost : 2**16,
            hashLength : 64,
            saltLength : 32,
            timeCost : 11,
            parallelism : 2
        });
        req.body.created_at = Date.now();
        req.body.permissionLevel = 1 ;
        const saved = await identityModel.createIdentity(req.body)
        return res.status(201).send({id : saved._id});
    }catch(err){
        res.status(400).send({errors : ['User already exists']});
    }
};
IdentityProvider.prototype.PreSignIn = async(req, res , next) => {
    this.clientId = req.body.clientId;
    this.codeChallenge = req.body.codeChallenge;
    this.SignInId = require('crypto').randomBytes(32).toString('hex');
    return res.status(200).send({SignInId : this.SignInId});
}
IdentityProvider.prototype.signIn = async (req, res , next) => {
    //input : singInId , username , password
    //route : '/authenticate'
    //output : authorizationCode
    try {
    if(this.SignInId !== req.body.SignInId){
        return res.status(401).send({errors : ['Unauthorized']});
    }
    identityModel.findByUsername(req.body.username).then(async (user)=> {
        if(!user[0]){
            return res.status(400).send({errors : ['Invalid Credentials']});
        }else{
            if(await argon2.verify(user[0].password,req.body.password)){
                this.authorizationCode = require('crypto').randomBytes(16).toString('hex');
                return res.status(200).send({authorizationCode : this.authorizationCode});

            }else{
                return res.status(400).send({errors : ['Invalid Credentials']});
            }
        }
    });
    }catch(err){
        return next(err);
    }
};
IdentityProvider.prototype.PostSignIn = async(req, res , next) => {
    if(req.body.authorizationCode !== this.authorizationCode){
        return res.status(401).send({errors : ['Unauthorized']});
    }
    var hash = crypto.createHash('sha256')
   .update(req.body.codeVerifier)
   .digest('hex');
    if(hash !== this.codeChallenge){
        console.log(this.codeChallenge);
        console.log(hash);
        return res.status(401).send({errors : ['Unauthorized']});
    }
    user = identityModel.findByUsername(req.body.username).then(async (user)=> {
        var now = Math.floor(Date.now()/1000);
        req.body = {
            iss : 'urn:smartlypark.me',
            aud : 'urn:' + (req.get('origin') ? req.get('origin') : '*.smartlypark.me'),
            sub : user[0].username ,
            name : user[0].forename + ' ' + user[0].surname,
            userId : user[0]._id,
            roles : user[0].permissionLevel,
            jti : uuidv4,
            iat : now,
            exp : now + validityTime
        };
        //Create JWT Token and return it
        console.log(req.body)
        jwt.sign(req.body, require('crypto').randomBytes(64).toString('hex'), (err, token) => {
        res.json({
            token
        });
        console.log(token);
         });
    this.clientId=null;
    this.codeChallenge=null;
    this.codeVerifier=null;
    this.authorizationCode=null;
    this.SignInId=null;
    });
    //input : codeverifier , authorizationCode
    //route : /oauth/token
    //check codeverifier compatiblity using the authorizationCode
    //generate Access Token & Refresh Token

}
IdentityProvider.prototype.RefreshSignIn = async(req, res , next) =>{
    //route : /oauth/token/refresh
    //input : currentRefreshToken , currentAccessToken
    //output : newRefreshToken , newAccessToken
}
IdentityProvider.prototype.getUsers =  function(req, res, next) {
    identityModel.find(function (error, users){
        if(error)
            return next(error);
        res.json(users);
    });
};

IdentityProvider.prototype.getUser =  function(req, res, next) {
    identityModel.findByUsername(req.body.username).then(async (user)=> {
        res.json(user);
        console.log(user)
    });
};

IdentityProvider.prototype.minimunPermissionLevelRequired = function(permissionLevel) {
};


IdentityProvider.prototype.DeleteUser =  function(req, res, next) {
    identityModel.findByUsername(req.body.username).then(async (user)=> {
        if(!user[0]){
            return res.status(404).send({errors : ['Does Not Exist']});
        }
        else
        {
            identityModel.deleteOne({_id :user[0]._id}).then(async (user)=> { });
            return res.status(200).send({message : ['Deleted']});
        }
    });
  };


  IdentityProvider.prototype.UpdateUser =  function(req, res, next) {
    identityModel.findByUsername(req.body.username).then(async (user)=> {
        if(!user[0]){
            return res.status(404).send({errors : ['Does Not Exist']});
        }
        else
        {
            var conditions= {_id: user[0]._id};
            identityModel.update(conditions,req.body ).then (doc=> {
                if(!doc){return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err=> next(err));
        }
    });
  };

module.exports = IdentityProvider;