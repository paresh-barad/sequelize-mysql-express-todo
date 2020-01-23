module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define('todo', {
		name: Sequelize.STRING
	});

	return Todo;
}