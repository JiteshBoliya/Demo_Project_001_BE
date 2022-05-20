const req = require("express/lib/request");
const users = require("../Model/user_mdl");
const LoginWithTwitter = require('login-with-twitter')


const tw = new LoginWithTwitter({
  consumerKey: '1527556908692824064-s3l3bBC7yvdFpUVBPj8TfPYRqdnpol',
  consumerSecret: 'uFdi9xBHX0jVA8jTGRT68mYgXavpPPvL6VCYiyisMIbHo',
  callbackUrl: 'https://example.com/twitter/callback'
})

// #get all users
exports.get_allUsers=async function (req, res) {
  const Users = users.find({}, function (err, data) {
    if (err) res.status(400).send({ error: err.message });
    res.status(200).send(data);
  });
};

// #Get user by token
exports.get_users = async function (req, res) {
  const Users = users.find({}, function (err, data) {
    if (err) res.status(400).send({ error: err.message });
    res.status(200).send(data);
  });
};

// #Add user
exports.set_user = async (req,res) => {
  var query = {name:req.body.name,email:req.body.email},
    update = {token:req.body.token},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // #Find the document
  const user=users.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;
    if(result==null) return
    const user = result
    const token = user.genrateAuthToken();
    res.send({ user, token });
  });
};

// #Get specific user detail
exports.get_user = async(req,res)=>{
    const Users = users.findOne({_id:req.params.id}, function (err, data) {
        if (err) res.status(400).send({ error: err.message });
        res.status(200).send(data);
      });
}

// #Add user
exports.set_UserManual=async function(req, res){
  var query = {email:req.body.email,password:req.body.password},
    update = {token:req.body.token,name:req.body.username},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // #Find the document
  const user=users.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;
    if(result==null) return
    res.send(result);
  });
}

// #login user
exports.get_userManual = async(req,res)=>{
  // console.log(req.body);
  const Users = users.findOne({email:req.body.email,password:req.body.password}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
    if(data==null){
      console.log(data);
      res.status(404).send("not valid")
      return
    } 
    const user = data
    const token = user.genrateAuthToken()
    res.send({ user, token })
    });
}



// exports.login_twitter=async (req, res) => {
//   tw.login((err, tokenSecret, url) => {
//     // req.session.tokenSecret = tokenSecret
//     // res.redirect(url)
//   })
// }
// exports.login_twitter_collback=async (req, res) => {
//   tw.callback({
//     oauth_token: req.query.oauth_token,
//     oauth_verifier: req.query.oauth_verifier
//   }, req.session.tokenSecret, (err, user) => {
//     delete req.session.tokenSecret
    
//     // The user object contains 4 key/value pairs, which
//     // you should store and use as you need, e.g. with your
//     // own calls to Twitter's API, or a Twitter API module
//     // like `twitter` or `twit`.
//     // user = {
//     //   userId,
//     //   userName,
//     //   userToken,
//     //   userTokenSecret
//     // }
//     req.session.user = user
//     console.log(user);
//     res.redirect('http://localhost:4200/home')
//   });
// }

