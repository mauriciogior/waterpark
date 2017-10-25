
module.exports = function build(router) {

	// Our login page
	router.get('/', require('./login.js'))

}
