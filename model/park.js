const Sequelize = require('sequelize')
	, db = require('../config/database.js')

// Defines Park table
const Park = db.define('park', {
	name : {
		type : Sequelize.STRING
	}
})

// Synchronizes Park table
Park.sync()

module.exports = Park
