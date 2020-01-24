const db = require('../models');
const Todo = db.Todo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			status: false,
			message: "Todo name is required",
			result: null
		});
	}

	const todo = {
		name: req.body.name
	}

	Todo.create(todo).then(data => {
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: data
		});
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	});
}


exports.findAll = (req, res) => {
	Todo.findAll().then(data => {
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: data
		});
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id;
	Todo.findByPk(id).then(data => {
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: data
		});
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	});
}

exports.update = (req, res) => {
	const id = req.params.id;

	Todo.update(req.body, {
		where: { id }
	}).then(data => {
		return res.status(200).json({
			status: true,
			message: "Success!",
			result: data
		});
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	});
}

exports.delete = (req, res) => {
	const id = req.params.id;

	Todo.destroy({
		where: { id }
	}).then(num => {
		if (num == 1) {
			return res.status(200).json({
				status: true,
				message: "Success!",
				result: null
			});
		} else {
			return res.status(200).json({
				status: true,
				message: "Todo not exist!",
				result: null
			});
		}
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	});
}

exports.deleteAll = (req, res) => {
	Todo.destroy({
		where: {},
		truncate: false
	}).then(nums => {
		return res.status(200).json({
			status: true,
			message: `Success! ${nums} todo deleted.`,
			result: null
		});
	}).catch(err => {
		return res.status(500).json({
			status: false,
			message: `Somthing went wrong ${err.message}`,
			result: null
		});
	});
}