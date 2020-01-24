const { User, AuthToken } = require('../models');

module.exports = async function (req, res, next) {
	const token = req.headers.authorization;
	if (token) {
		const authToken = await AuthToken.findAll({
			where: { token }, include: User
		});

		if (authToken) {
			req.user = authToken.User;
		}
	} else {
		return res.status(500).json({
			status: false,
			message: `Invalid authentication`,
			result: null
		});
	}
	next();
}