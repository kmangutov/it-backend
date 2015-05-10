
var User = require('../models/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

exports.post = function(req, res) {

  var user = new User();
  user.name = req.body.name;
  
  console.log("proposed name: " + req.body.name);

  user.save(function(err) {

    if(err) {
      res.statusCode = 500;
      if(err.code === 11000)
        return res.json({message: "Duplicate users!"});
      console.log("Error: " + JSON.stringify(err));
      return res.json({message: "some error " + JSON.stringify(err)});
    }
    else {
      res.statusCode = 201;
      res.json({message: "Successfully created user", data: user});
    }
  });
}

exports.get = function(req, res) {

  User.find().exec(function(err, users) {
    if(err) {
      res.statusCode = 500;
      return res.json({message: "Eror getting users"});
    }

    return res.json({message: "Succesfsully got users", data: users});
  });
}

exports.delete = function(req, res) {

  console.log('in delete func');
  User.remove({_id: req.params.id}, function(err, user){

    console.log('delete err: ' + JSON.stringify(err));
    if(!user) {
      res.statusCode = 404;
      return res.json({message: "Error deleting user"});
    }

    return res.json({message: "Success delete", data:[]});
  });
}