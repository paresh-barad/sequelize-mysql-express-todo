module.exports = app => {
	const customAuthMiddleware = require('../middleware/customauth.middleware');

	const todo = require('../controllers/todo.controller');

	var router = require('express').Router();

	router.post('/', todo.create);

	router.get('/', customAuthMiddleware, todo.findAll);

	router.get('/:id', todo.findOne);

	router.put('/:id', todo.update);

	router.delete('/:id', todo.delete);

	router.delete('/', todo.deleteAll);

	app.use('/api/todo', router);
}