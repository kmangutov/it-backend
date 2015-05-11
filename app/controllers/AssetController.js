
var User = require('../models/user');
var Asset = require('../models/asset');
var Portfolio = require('../models/portfolio');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();


exports.post = function(req, res) {

  var id = req.params.id;
  var userId = req.body.user;

  var asset = new Asset();
  asset.symbol = req.body.symbol;
  asset.upvotes = [];
  asset.upvotes.push(userId + '');
  asset.downvotes = [];


  console.log("proposed symbol: " + req.body.symbol);

  Portfolio.findOne({_id: id}).exec(function(err, portfolio) {

    if(err) {
      res.statusCode = 500;
      console.log('Tried to query asset in undefined portfolio ' + id);
      return res.json({message: 'No such portfolio', data: {}});
    }

    console.log("The portfolio: " + JSON.stringify(portfolio));

    portfolio.assets.push(asset._id);

    console.log("post push: " + JSON.stringify(portfolio));

    portfolio.save(function(err) {
      
      if(err) {
        console.log('SOME ERROR ' + JSON.stringify(err));
        res.statusCode = 500;
        return res.json({message: 'ERROR', data: err});
      }

      console.log('Portfolio saved');

      asset.save(function(err) {

        if(err) {
          res.statusCode = 500;
          if(err.code === 11000)
            return res.json({message: "Duplicate asset!", data: err});
          console.log("Error: " + JSON.stringify(err));
          return res.json({message: "some error " + JSON.stringify(err)});
        }
        else {

          console.log('Asset saved');
          res.statusCode = 201;
          res.json({message: "Successfully created asset", data: asset});

          //asset created, put it into the portfolio

        }
      });



    }); 

  

  });

}

exports.get = function(req, res) {

  var id = req.params.id;
  console.log('Get all assets of portfolio ' + id);

  Portfolio.findOne({_id: id}).exec(function(err, portfolio) {

    if(err || !portfolio) {
      res.statusCode = 500;
      console.log('Tried to query asset in undefined portfolio ' + id);
      return res.json({message: 'No such portfolio', data: err});
    }

    console.log('Portfolio found: ' + JSON.stringify(portfolio));



    res.statusCode = 201;
    Asset.find({
      '_id': { $in: portfolio.assets }
    }, function(err, assets) {

      if(err) {
        res.statusCode = 500;
        console.log('Some error ' + JSON.stringify(err));
        return res.json({message: 'ASsets not found', data: err})
      

      }

      res.statusCode = 201;
      return res.json({message: 'Succesfully retrieved portfolio assets', data: assets});
    });


 });


  /*Asset.find().exec(function(err, assets) {
    if(err) {
      res.statusCode = 500;
      return res.json({message: "Error getting assets"});
    }

    //console.log("assets: " + JSON.stringify(assets) + "\n\n");

    for(var i = 0; i < assets.length; i++) {

      var asset = assets[i];
      var value = asset.upvotes.length - asset.downvotes.length;
      console.log("value: " + value);
      assets[i]['value'] = value;

      console.log("asset: " + JSON.stringify(assets[i]));
    }

    return res.json({message: "Successfully got assets", data: assets});
  });*/
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