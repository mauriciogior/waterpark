const Sequelize = require('sequelize')
	, db   = require('../config/database.js')
	, Park = require('./park.js')

// Defines Broker table
const Broker = db.define('broker', {
	code : {
		type : Sequelize.STRING,
		unique : true
	},

	name : {
		type : Sequelize.STRING
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

// Synchronizes Broker table
Broker.belongsTo(Park)
Broker.sync()

module.exports = Broker
