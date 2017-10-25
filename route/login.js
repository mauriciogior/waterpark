const jade = require('jade')

/**
 * The login route
 */
module.exports = async function(ctx, next) {

	ctx.body = jade.renderFile('./view/login.jade')

}
