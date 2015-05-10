
var User = require('../models/user');
var Asset = require('../models/asset');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

exports.post = function(req, res) {

  var asset = new Asset();
  asset.symbol = req.body.symbol;

  console.log("proposed symbol: " + req.body.symbol);

  asset.save(function(err) {

    if(err) {
      res.statusCode = 500;
      if(err.code === 11000)
        return res.json({message: "Duplicate asset!"});
      console.log("Error: " + JSON.stringify(err));
      return res.json({message: "some error " + JSON.stringify(err)});
    }
    else {
      res.statusCode = 201;
      res.json({message: "Successfully created asset", data: asset});
    }
  });
}

exports.get = function(req, res) {

  Asset.find().exec(function(err, assets) {
    if(err) {
      res.statusCode = 500;
      return res.json({message: "Error getting assets"});
    }

    /*assets.forEach(function(asset, index, arr) {

      arr[index].value = 
        asset.upvotes.length
        - asset.downvotes.length;


      console.log("---------");
      console.log(asset);
      //asset.value = 

    });*/

    //console.log("assets: " + JSON.stringify(assets) + "\n\n");

    for(var i = 0; i < assets.length; i++) {

      var asset = assets[i];
      var value = asset.upvotes.length - asset.downvotes.length;
      console.log("value: " + value);
      assets[i]['value'] = value;

      console.log("asset: " + JSON.stringify(assets[i]));
    }

    return res.json({message: "Successfully got assets", data: assets});
  });
}


exports.delete = function(req, res) {

  console.log('in delete func');
  Asset.remove({_id: req.params.id}, function(err, asset){

    console.log('delete err: ' + JSON.stringify(err));
    if(!asset) {
      res.statusCode = 404;
      return res.json({message: "Error deleting asset"});
    }

    return res.json({message: "Success delete", data:[]});
  });
}