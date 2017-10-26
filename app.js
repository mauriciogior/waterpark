const koa        = new (require('koa'))
	, session    = require('koa-session')
	, static     = require('koa-static')('public')
	, router     = new (require('koa-router'))
	, bodyParser = require('koa-bodyparser')

const routes  = require('./route/index.js')
	, User    = require('./model/user.js')

// Builds all routes
routes(router)

// Serve static files
koa.use(static)
koa.use(session(koa))
koa.use(bodyParser())

// Sets router for app
koa.use(router.routes())
koa.listen(9000)
