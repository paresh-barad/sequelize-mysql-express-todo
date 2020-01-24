module.exports = app => {
	const user = require('../controllers/user.controller');
	let router = require('express').Router();
	router.post('/', user.create);
	router.post('/login', user.login);
	app.use('/api/user', router);
}