const auth = require('./auth.js')

// Login router
const login = require('./login.js')

// System router
const admin = require('./admin.js')

// Park router
const park = require('./park.js')

module.exports = function build(router) {
	// Our login page
	router.get('/', auth.verify, login.get)
	router.post('/', auth.verify, login.post)

	// Exit route
	router.get('/sair', auth.verify, login.logout)

	// Our admin page
	router.get('/administracao', auth.required, admin.admin.get)
	router.post('/administracao', auth.required, admin.admin.post)

	router.get('/administracao/parques', auth.required, admin.parks.get)
	router.post('/administracao/parques', auth.required, admin.parks.post)

	router.get('/administracao/usuarios', auth.required, admin.users.get)
	router.post('/administracao/usuarios', auth.required, admin.users.post)

	// Our park page
	router.get('/administracao/parques/:id', auth.required, park.park.get)
	router.post('/administracao/parques/:id', auth.required, park.park.post)

	router.get('/administracao/parques/:id/consultores', auth.required, park.brokers.get)
	router.get('/administracao/parques/:id/titulos', auth.required, park.deeds.get)

	router.post('/administracao/parques/:id/consultores', auth.required, park.brokers.post)
	router.post('/administracao/parques/:id/titulos', auth.required, park.deeds.post)

}
