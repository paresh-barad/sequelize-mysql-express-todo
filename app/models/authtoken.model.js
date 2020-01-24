module.exports = (sequelize, Sequelize) => {
	const User = require('./user.model')(sequelize, Sequelize);
	const AuthToken = sequelize.define('AuthToken', {
		token: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	});

	AuthToken.associate = function ({ User }) {
		AuthToken.belongsTo(User);
	};

	AuthToken.generate = async function (UserId) {
		if (!UserId) {
			throw new Error('AuthToken requires a user ID')
		}

		let token = '';
		const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
			'abcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0;i < 15;i++) {
			token += possibleCharacters.charAt(
				Math.floor(Math.random() * possibleCharacters.length)
			);
		}
		await AuthToken.create({ token, UserId })
		return token;
	}

	return AuthToken;
}