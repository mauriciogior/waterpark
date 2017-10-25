
module.exports = new (require('sequelize'))('waterpark', 'root', '', {
	host    : 'localhost',
	dialect : 'mysql'
})
