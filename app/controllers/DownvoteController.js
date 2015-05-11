
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

  console.log("downvote asset:" + assetId + " user:" + userId);

  Asset.findOne({_id: assetId}).exec(function(err, asset) {

    if(err || !asset) {
      res.statusCode = 500;
      return res.json({message: "Some error " + JSON.stringify(err), data: err});
    } else {

      remove(asset.upvotes, userId);
      remove(asset.downvotes, userId);

      //0 value
      /*if(asset.upvotes.length - asset.downvotes.length < 0) {

        res.statusCode = 201;

        asset.remove();

        return res.json({message: "Removed stock", data:{}});
      }*/


      console.log("Found asset");

      if(!asset.upvotes)
        asset.upvotes = [];
      if(!asset.downvotes)
        asset.downvotes = [];


      asset.downvotes.push(userId);
      //console.log("Asset: ")

      asset.save(function(err) {

        if(err) {
          res.statusCode = 500;
          return res.json({message: "Error saving downvote", data: asset});
        } else {

          res.statusCode = 201;
          return res.json({message: "Successfully added downvote", data:asset}); 
        }
      });
    }
  });
}