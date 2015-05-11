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

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);