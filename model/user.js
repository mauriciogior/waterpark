const Sequelize = require('sequelize')
	, db   = require('../config/database.js')
	, Park = require('./park.js')

// Defines User table
const User = db.define('user', {
	name : {
		type : Sequelize.STRING
	},

	email : {
		type : Sequelize.STRING,
		unique : true
	},

	password : {
		type : Sequelize.STRING
	},

	admin : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	},

	parkId: {
		type : Sequelize.INTEGER,

		references: {
			model : Park,
			key : 'id'
		}
	}

})

// Synchronizes User table
User.belongsTo(Park)
User.sync()

module.exports = User
