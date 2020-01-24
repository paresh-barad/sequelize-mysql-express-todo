module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define('Todo', {
		name: Sequelize.STRING
	});

	return Todo;
}