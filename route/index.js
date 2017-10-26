const auth = require('./auth.js')

// Login router
const login = require('./login.js')

// System router
const admin = require('./admin.js')

module.exports = function build(router) {
	// Our login page
	router.get('/', auth.verify, login.get)
	router.post('/', auth.verify, login.post)

	// Our admin page
	router.get('/administracao', auth.required, admin.admin.get)
	router.post('/administracao', auth.required, admin.admin.post)

	router.get('/administracao/parques', auth.required, admin.parks.get)
	router.post('/administracao/parques', auth.required, admin.parks.post)

	router.get('/administracao/usuarios', auth.required, admin.users.get)
	router.post('/administracao/usuarios', auth.required, admin.users.post)
}
