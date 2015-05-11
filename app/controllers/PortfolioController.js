
var User = require('../models/user');
var Asset = require('../models/asset');
var Portfolio = require('../models/portfolio')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

exports.post = function(req, res) {

  var portfolio = new Portfolio();
  
  portfolio.user = req.body.user;
  portfolio.name = req.body.name;
  portfolio.capital = req.body.capital;

  console.log('proposed portfolio: ' + JSON.stringify(portfolio));

  portfolio.save(function(err) {

    if(err) {
      res.statusCode = 500;
      if(err.code === 11000)
        return res.json({message: 'Duplicate asset!'});
      console.log('Error: ' + JSON.stringify(err));
      return res.json({message: 'some error ' + JSON.stringify(err)});
    }
    else {
      res.statusCode = 201;
      res.json({message: 'Successfully created portfolio', data: portfolio});
    }
  });
}

exports.getOne = function(req, res) {

  
  Portfolio.findOne({_id: req.params.id}).exec(function(err, portfolios) {
    if(err) {
      res.statusCode = 500;
      return res.json({message: 'Error getting portfolios'});
    }

    res.statusCode = 201;
    return res.json({message: 'Successfully got portfolios', data: portfolios});
  });  
}

exports.get = function(req, res) {

  Portfolio.find().exec(function(err, portfolios) {
    if(err) {
      res.statusCode = 500;
      return res.json({message: 'Error getting portfolios'});
    }

    res.statusCode = 201;
    return res.json({message: 'Successfully got portfolios', data: portfolios});
  });
}


exports.delete = function(req, res) {

  console.log('in delete func');
  Portfolio.remove({_id: req.params.id}, function(err, asset){

    console.log('delete err: ' + JSON.stringify(err));
    if(!asset) {
      res.statusCode = 404;
      return res.json({message: 'Error deleting asset'});
    }

    return res.json({message: 'Success delete', data:[]});
  });
}