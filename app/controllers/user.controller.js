const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.User;

exports.create = async (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, 10);
	let userObj = { ...req.body, ...{ password: hash } };
	try {
		let user = await User.create(userObj);
		let data = await user.authorize();
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: data
		});
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	}
}

exports.login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			status: false,
			message: `Username and password is required fields`,
			result: null
		});
	}

	try {
		let user = await User.authenticate(username, password);
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: user
		});
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: `Invalid username and password`,
			result: null
		});
	}
}