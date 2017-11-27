const jade = require('jade')
	, User = require('../model/user.js')
	, pass = require('../helper/password.js')

const ERR_EMAIL_PASSWORD_INVALID = 0x1

const get = async function(ctx, next) {
	if (ctx.user) {
		ctx.redirect('/administracao')
	} else {
		ctx.body = jade.renderFile('./view/login.jade', { err : ctx.err })
	}
}

const post = async function(ctx, next) {
	let body = ctx.request.body
	let user = await User.findOne({
		where : {
			email : body.email
		},
		raw : true
	})

	// Email not found
	if (user == null) {
		ctx.err = ERR_EMAIL_PASSWORD_INVALID
		await get(ctx, next)
		return
	}

	// Password incorrect
	if (!pass.verify(body.password, user.password)) {
		ctx.err = ERR_EMAIL_PASSWORD_INVALID
		await get(ctx, next)
		return
	}

	ctx.cookies.set('user', user.password)
	ctx.redirect('/administracao')
}

const logout = async function(ctx, next) {
	ctx.cookies.set('user', null)
	ctx.redirect('/')
}

/**
 * The login route
 */
module.exports = { get , post , logout }
