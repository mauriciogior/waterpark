const User = require('../model/user.js')

const verify = async function(ctx, next) {
	ctx.user = ctx.cookies.get('user')
	if (ctx.user) {
		ctx.user = await User.findOne({
			where : {
				password : ctx.user
			},
			raw : true
		})
	}

	await next()
}

const required = async function(ctx, next) {
	await verify(ctx, next)

	if (!ctx.user) {
		ctx.redirect('/')
	}
}

/**
 * The authentication route
 */
module.exports = { verify , required }
