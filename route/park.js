const jade = require('jade')
	, pass = require('../helper/password.js')
	, User = require('../model/user.js')
	, Park = require('../model/park.js')

const park = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		let park = await Park.findById(ctx.params.id)

		if (park == null) {
			ctx.redirect(`/administracao/parques`)
			return
		}

		ctx.body = jade.renderFile('./view/park.jade', { park , user : ctx.user , err : ctx.err })
	},

	post : async function(ctx, next) {

	}
}

const brokers = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		let brokers = await Park.findAll({
			raw : true
		}) || []

		ctx.body = jade.renderFile('./view/parks.jade', { parks , err : ctx.err })
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
			let name = body.name || ''

			if (name.length < 2) {
				ctx.err = 'Nome do parque muito curto!'
				await parks.get(ctx, next)
				return
			}

			await Park.create({ name })

		}

		await parks.get(ctx, next)
	}
}

const deeds = {
	get : async function(ctx, next) {
		if (!ctx.user.admin) {
			ctx.redirect(`/administracao/parques/${ctx.user.park_id}`)
			return
		}

		let users = await User.findAll({
			include : [ Park ],
			raw : true
		}) || []

		let parks = await Park.findAll({
			raw : true
		}) || []

		ctx.body = jade.renderFile('./view/users.jade', {
			users , parks , email : ctx.user.email , err : ctx.err
		})
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

			let user = await User.findOne({
				where : {
					email : email
				},
				raw : true
			})

			if (user != null) {
				ctx.err = 'Email já cadastrado!'
				await users.get(ctx, next)
				return
			}

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
module.exports = { park , brokers , deeds }
