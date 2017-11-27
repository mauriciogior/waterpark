const koa        = new (require('koa'))
	, session    = require('koa-session')
	, static     = require('koa-static')
	, router     = new (require('koa-router'))
	, bodyParser = require('koa-bodyparser')

const routes  = require('./route/index.js')
	, User    = require('./model/user.js')

// Verifies if main user exists
async function verify() {
	let user = await User.findOne({
		where : {
			email : 'mauricio.c.giordano@gmail.com'
		},
		raw : true
	})

	if (user == null) {
		await User.create({
			name : 'Mauricio Giordano',
			email : 'mauricio.c.giordano@gmail.com',
			password : '3b55f356c3a028eca254962faac9020d04340eb45d8498aeeda882bf8d11914d',
			parkId : null,
			admin : true
		})
	}
}

verify()

// Builds all routes
routes(router)

// Serve static files
koa.use(static('public'))
koa.use(static('semantic'))
koa.use(session(koa))
koa.use(bodyParser())

// Sets router for app
koa.use(router.routes())
koa.listen(9000)
