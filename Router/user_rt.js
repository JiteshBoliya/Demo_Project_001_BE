const express = require('express')
const User = require('../Model/user_mdl')
const router = new express.Router()
const userctr=require('../Controller/userctr')
const userlist=require('../Controller/userMgtctr')
const auth =require('../middleware/auth')
const multer = require('multer')
const formdata = multer()
const path = require("path");
const passport = require('passport');

const makeid=()=>{
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        cb(null, "user" + makeid() + path.extname(file.originalname))
    },
});


const upload = multer({storage: storage});   

//Get all users
router.get('/user/all',userctr.get_allUsers)

// #Add user login with google
router.post('/user/login',userctr.set_user)

// #Get specific user by token
router.get('/user/:id',userctr.get_user)

// register with manual
router.post('/user/register',formdata.none(),userctr.set_UserManual)

// Login with manual
router.post('/user/userlogin',formdata.none(),userctr.get_userManual)


//User croud opration

//Add
router.post('/userlist',upload.array("file",5),userlist.Add_UserList)

//Update
router.post('/userlist/update/:id',upload.array("file",5),userlist.update_userlist)

//Get
router.get('/userlist',userlist.get_userlist)

//Get
router.get('/userlist/all',userlist.get_alluserlist)


//Delete
router.get('/userlist/delete/:id',userlist.delete_userlist)

//Get by id
router.get('/userlist/getData/:id',userlist.get_userlistById)

//sort
router.get('/userlist/sort/:sortby/:sortwith',userlist.get_userbysort)

//pagger
router.get('/userlist/pagger/:page',userlist.get_userlist_pagger)

//Twitter login
// router.get('/twitter', userctr.login_twitter)
// router.get('/twitter/callback', userctr.login_twitter_collback)
router.get('/login/twitter', passport.authenticate('twitter'));
module.exports = router