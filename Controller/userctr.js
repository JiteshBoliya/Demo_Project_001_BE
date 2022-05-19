const req = require("express/lib/request");
const users = require("../Model/user_mdl");

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
    const user = result
    const token = user.genrateAuthToken();
    res.send({ user, token });
  });
}

// #login user
exports.get_userManual = async(req,res)=>{
  console.log(req.body);
  const Users = users.findOne({email:req.body.email,password:req.body.password}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
    const user = data
    const token = user.genrateAuthToken()
    res.send({ user, token })
    });
}



