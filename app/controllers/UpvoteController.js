
var User = require('../models/user');
var Asset = require('../models/asset');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
}

exports.post = function(req, res) {

  var userId = req.body.user;
  var assetId = req.body.asset;

  console.log("upvote asset:" + assetId + " user:" + userId);

  Asset.findOne({_id: assetId}).exec(function(err, asset) {

    if(err) {
      res.statusCode = 500;
      return res.json({message: "Some error " + JSON.stringify(err), data: err});
    } else {
      //res.statusCode = 201;
      //return res.json({message: "Found asset", data:asset});
    
      console.log("Found asset");

      if(!asset.upvotes)
        asset.upvotes = [];
      if(!asset.downvotes)
        asset.downvotes = [];

      remove(asset.upvotes, userId);
      remove(asset.downvotes, userId);

      asset.upvotes.push(userId);
      //console.log("Asset: ")

      asset.save(function(err) {

        if(err) {
          res.statusCode = 500;
          return res.json({message: "Error saving upvote", data: asset});
        } else {

          res.statusCode = 201;
          res.json({message: "Successfully added upvote", data:asset}); 
        }
      });
    }
  });
}