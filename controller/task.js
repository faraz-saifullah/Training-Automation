const task = require(`../models`).task;
const taskValidation = require(`../validations/tasks`);

async function getTasks(req, res) {
	let tasks = await task
		.findAll({
			attributes: [`id`, `name`, `description`, `duration`]
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(tasks);
}

async function specificTask(req, res) {
	let task = await task
		.findByPk(req.params.id)
		.catch((error) => {
			res.status(400).send(error);
		});
	if (task) {
		res.status(200).send(task);
	} else {
		res.status(404).send(`Task Does Not Exist`);
	}
}

async function newTask(req, res) {
	let status = await taskValidation
		.nonDuplicateTask(req.params.id, req.body.name);
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
}

async function updateTask(req, res) {
	let status = await taskValidation
		.nonDuplicateTask(req.params.id, req.body.name);
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
}

async function deleteTask(req, res) {
	let taskId = await task
		.findByPk(req.params.id)
		.catch((error) => res.status(400).send(error));
	if (!taskId) {
		return res.status(400).send({
			message: `Task Does Not Exist`,
		});
	}
	await taskId
		.destroy()
		.catch((error) => res.status(400).send(error));
	res.status(204).send("Success!")
}

module.exports = {
	getTasks,
	newTask,
	specificTask,
	updateTask,
	deleteTask
}
