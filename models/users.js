var mongoose = require('mongoose');//mongoose lai require gareko yo file ma

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
	createdDate: {
		type: Date,
		default: Date.now
	}//date ko value pathayena vane default value rakhidinxa
});//user ko module banako

module.exports = mongoose.model('Users', UserSchema)