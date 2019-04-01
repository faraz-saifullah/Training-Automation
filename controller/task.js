const task = require(`../models`).task;
const taskValidation = require(`../validations/tasks`);

function getTasks(req, res) {
	return task
		.findAll({
			attributes: [`id`, `name`, `description`, `duration`]
		})
		.then((tasks) => {
			res.status(200).send(tasks);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function specificTask(req, res) {
	return task
		.findByPk(req.params.id)
		.then((task) => {
			if (task) {
				res.status(200).send(task);
			} else {
				res.status(404).send(`Task Does Not Exist`);
			}
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function newTask(req, res) {
	taskValidation.nonDuplicateTask(req.params.id, req.body.name).then((status) => {
		if (status != `409`) {
			task
				.build({
					name: req.body.name,
					description: req.body.description,
					duration: req.body.duration
				})
				.save()
				.then((newTask) => res.status(201).send(newTask))
				.catch((error) => res.status(400).send(error));
		} else {
			res.status(409).send(`Task Already Exists`);
		}
	})
}

function updateTask(req, res) {
	taskValidation.nonDuplicateTask(req.params.id, req.body.name).then((status) => {
		if (status == `200`) {
			return task
				.findByPk(req.params.id)
				.then((taskid) => {
					return taskid
						.update({
							name: req.body.name || taskid.name,
							description: req.body.description || taskid.description,
							duration: req.body.duration || taskid.duration
						})
						.then(() => {
							res.status(200).send(taskid);
						})
						.catch((error) => {
							res.status(400).send(error);
						});
				})
		} else {
			res.status(409).send(`Task Already Exists`);
		}
	})
}

function deleteTask(req, res) {
	return task
		.findByPk(req.params.id)
		.then(taskid => {
			if (!taskid) {
				return res.status(400).send({
					message: `Task Does Not Exist`,
				});
			}
			return taskid
				.destroy()
				.then(() => res.status(204).send())
				.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
}

module.exports = {
	getTasks,
	newTask,
	specificTask,
	updateTask,
	deleteTask
}
