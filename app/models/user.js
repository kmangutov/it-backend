// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  	local: {
		email		: String,
		password	: String
	},
	facebook: {
		id 			: String,
		token 		: String,
		email		: String,
		name 		: String
	}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);