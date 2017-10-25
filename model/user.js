const Sequelize = require('sequelize')
	, db = require('../config/database.js')

// Defines User table
const User = db.define('user', {
	name : {
		type : Sequelize.STRING
	},

	email : {
		type : Sequelize.STRING,
		unique : true
	},

	admin : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
})

// Synchronizes User table
User.sync()

module.exports = User
