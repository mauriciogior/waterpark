const jade = require('jade')
	, pass = require('../helper/password.js')
	, User = require('../model/user.js')
	, Park = require('../model/park.js')

const admin = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		ctx.body = jade.renderFile('./view/admin.jade')
	},

	post : async function(ctx, next) {

	}
}

const parks = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		let parks = await Park.findAll({
			raw : true
		}) || []

		ctx.body = jade.renderFile('./view/parks.jade', { parks })
	},

	post : async function(ctx, next) {
		let body = ctx.request.body

		// Removes a park
		if (body.delete) {
			let parkId = parseInt(body.delete)
			let park = await Park.findById(parkId)

			if (park) park.destroy()

		} else

		// Creates a park
		if (body.create) {
			let name = body.name
			await Park.create({ name })

		}

		await parks.get(ctx, next)
	}
}

const users = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		let users = await User.findAll({
			where : {
				email : {
					$ne : ctx.user.email
				}
			},
			include : [ Park ],
			raw : true
		}) || []

		let parks = await Park.findAll({
			raw : true
		}) || []

		ctx.body = jade.renderFile('./view/users.jade', { users , parks })
	},

	post : async function(ctx, next) {
		let body = ctx.request.body

		// Removes a user
		if (body.delete) {
			let userId = parseInt(body.delete)
			let user = await User.findById(userId)

			if (user) user.destroy()
		} else

		// Creates a park
		if (body.create) {
			let name     = body.name
			let email    = body.email
			let password = body.password
			let parkId   = body.parkId

			password = pass.encrypt(password)

			await User.create({
				name, email, password, parkId
			})
		}

		await users.get(ctx, next)
	}
}

/**
 * The login route
 */
module.exports = { admin , parks , users }
