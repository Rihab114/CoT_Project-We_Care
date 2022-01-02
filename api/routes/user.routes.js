var mongoose = require('mongoose')

var userSchema = new mongoose.Schema(
    {
        surname : String,
        forename: String,
        username: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        permissionLevel : Number,
        role:{type:String, enum:["admin","surfer","member"]},
        location:String,
        meta:{age:Number,website:String},
        created_at:{type:Date, default:Date.Now},
        updated_at:{type:Date, default:Date.Now}
    });

    userSchema.statics.createIdentity = (infos)=> {
    const user = new mongoose.model("User", userSchema)(infos);
    return user.save();
};

userSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

userSchema.set('toJSON',{virtuals : true});

userSchema.statics.sayHello=function(){
    return "Hello"+this.forename+" "+this.surname;
};

userSchema.statics.findByUsername = (username)=> {
    return mongoose.model("User", userSchema).find({username : username});
};

userSchema.statics.Delete = (id)=> {
    console.log(id)
    return mongoose.model("User", userSchema).deleteOne({_id : ObjectId(id)});
}



module.exports = mongoose.model('User',userSchema);