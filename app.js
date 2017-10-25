const koa    = new (require('koa'))
	, static = require('koa-static')('public')
	, router = new (require('koa-router'))
	, routes = require('./route/index.js')

// Builds all routes
routes(router)

// Serve static files
koa.use(static)

// Sets router for app
koa.use(router.routes())
koa.listen(9000)
