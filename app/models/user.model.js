const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	});

	User.associate = function ({ AuthToken }) {
		User.hasMany(AuthToken);
	};

	User.prototype.authorize = async function () {
		const { AuthToken } = sequelize.models;
		const user = this;
		const authToken = await AuthToken.generate(this.id);
		await user.addAuthToken(authToken);
		return { user, authToken };
	}

	User.authenticate = async function (username, password) {
		const user = await User.findOne({
			where: { username }
		});

		let isSame = bcrypt.compareSync(password, user.password);

		if (bcrypt.compareSync(password, user.password)) {
			let userData = await user.authorize();
			return userData;
		}
		throw new Error('Invalid Password');
	}

	User.prototype.logout = async function (token) {
		AuthToken.destroy({ where: { token } });
	}

	return User;
}