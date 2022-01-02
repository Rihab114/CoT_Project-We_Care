var express = require('express');
var router = express.Router();
var IdentityProvider = require('../controller/identity.provider')
/* GET users listing. */

var identityProvider = new IdentityProvider();

router.get('/',[identityProvider.getUsers]);

router.post('/register',[identityProvider.signUp]);

router.post('/login',[identityProvider.signIn]);

router.post('/authorize',[identityProvider.PreSignIn]);

router.post('/oauth/token',[identityProvider.PostSignIn]);

router.post('/oauth/token/refresh',[identityProvider.RefreshSignIn]);

router.post('/profile',[identityProvider.getUser]); 

router.delete('/delete',[identityProvider.DeleteUser]);

router.put('/update',[identityProvider.UpdateUser]);


module.exports = router;