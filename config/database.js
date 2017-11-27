
let host = process.env.DATABASE_HOST || 'localhost'
let user = process.env.DATABASE_USER || 'root'
let pass = process.env.DATABASE_PASS || ''
let dbas = process.env.DATABASE_DBAS || 'waterpark'

module.exports = new (require('sequelize'))(dbas, user, pass, {
	host    : host,
	dialect : 'mysql'
})
