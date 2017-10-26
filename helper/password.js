const crypto = require('crypto')
const secret = '*)OHQNFLAKFI)@!'

const encrypt = function(password) {
	return crypto
		.createHmac('sha256', secret)
		.update(password)
		.digest('hex')
}

const verify = function(password, encrypted) {
	return encrypt(password) == encrypted
}

module.exports = { encrypt , verify }
