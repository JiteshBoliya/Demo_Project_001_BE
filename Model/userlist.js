const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')

const userListSchema = new mongoose.Schema({
    file:[{
        type:Object,
    }],
    name: {
        type: String,
        // required: true,
    },
    gender:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,  
    },
    dob:{
        type:Date
    },
    mobileno:{
        type:Number
    }

},{timeStamp:true}
);

const UserList= mongoose.model("UserList",userListSchema);
module.exports = UserList


