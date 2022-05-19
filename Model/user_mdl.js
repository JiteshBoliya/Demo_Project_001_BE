const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email:{
        type:String,
        // required:true,  
    },
    password:{
        type:String
    },
    token:{
        type:String,
        // required:true
    }

},{timeStamp:true}
);

userSchema.methods.genrateAuthToken = async function(){
    const user=this
    if(user!=null){
    const token =jwt.sign({_id: user._id.toString()},"privatekey")
    user.token=token ;
    await user.save()
    return token
    }
}
userSchema.statics.findCredentials=async (email)=>User.findOne({email})

const User= mongoose.model("User",userSchema);
module.exports = User


