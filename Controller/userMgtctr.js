// const req = require("express/lib/request");
const UserList = require("../Model/userlist");

exports.Add_UserList=async function(req,res){
    try {
    const userlist=new UserList({
        ...req.body,    
        file:req.files
    })
        await userlist.save()
          res.status(201).send({userlist})        
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

exports.update_userlist = async (req,res) => {
    // #Find the document
    UserList.findByIdAndUpdate(req.params.id, {
        ...req.body,    
        file:req.files
    }, function (error, result) {
      if (error) return;
      res.send({result});
    });
};

exports.delete_userlist = async (req,res) => {
    // #Find the document
    UserList.findByIdAndDelete(req.params.id, function (error, result) {
      if (error) return;
      res.send({result});
    });
};

exports.get_userlist= async function(req, res){
    UserList.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).limit(3)
}  
exports.get_alluserlist= async function(req, res){
    UserList.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.get_userlistById= async function(req, res){
    UserList.find({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
} 
exports.get_userbysort= async function(req, res){
    var sortObject = {};
    var stype =req.params.sortby
    if(req.params.sortwith=='Assending'){
        var sortwith=-1
    }
    else{
    var sortwith=1
    }
    sortObject[stype] = sortwith;

    const userlist=UserList.find((err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        console.log(data[0].name);
        res.status(200).send(data)   
    }).sort(sortObject).limit(3)
}
exports.get_userlist_pagger= async function(req, res){
    UserList.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).skip(req.params.page).limit(3)
}  




