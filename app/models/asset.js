
var mongoose = require('mongoose');

var Asset = require('../models/user');
var User = require('../models/asset');

var AssetSchema = new mongoose.Schema({
  symbol: {type: String, required: true},
  upvotes: [User],
  downvotes: [User]
});

module.exports = mongoose.model('Asset', AssetSchema);