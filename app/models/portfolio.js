
var mongoose = require('mongoose');

var Asset = require('../models/user');
var User = require('../models/asset');

var PortfolioSchema = new mongoose.Schema({
  assets: {type: [String], default: []},
  name: {type: String, required: true, unique: true},
  capital: {type: Number, required: true}
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);