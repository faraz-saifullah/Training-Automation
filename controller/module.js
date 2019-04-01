const mod = require('../models').module;
const task = require('../models').task;
const taskValidation = require('../validations/tasks');
const moduleValidation = require('../validations/module');

function getModules(req, res) {
	return mod
		.findAll({
			attributes: ['id', 'name', 'duration', 'tasksId']
		})
		.then((mods) => {
			res.status(200).send(mods)
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function newModule(req, res) {
	taskValidation.taskExists(req.body.tasksId).then((tasks) => {
		if (tasks != "404") {
			mod
				.build({
					name: req.body.name,
					duration: req.body.duration,
					tasksId: [...new Set(req.body.tasksId)]
				})
				.save()
				.then((newMod) => res.status(201).send(newMod))
				.catch((error) => res.status(400).send(error));
		} else {
			res.status(404).send("Some Tasks Does Not Eist");
		}
	})
}

function specificModule(req, res) {
	moduleValidation.moduleExists(req.params.id).then((modules) => {
			if (modules != "404") {
				res.status(200).send(modules);
			} else {
				res.status(404).send("Module Does Not Exist");
			}
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function updateModule(req, res) {
	let arr = [];
	typeof req.body.tasksId == 'object' ? arr = req.body.tasksId : arr.push(req.body.tasksId);
	taskValidation.taskExists(req.body.tasksId).then((tasks) => {
		if (tasks != "404") {
			return mod
				.findByPk(req.params.id)
				.then((modid) => {
					if (modid) {
						modid
							.update({
								name: req.body.name || modid.name,
								duration: req.body.duration || modid.duration,
								tasksId: arr || modid.tasksId
							})
							.then(() => {
								res.status(200).send(modid)
							})
							.catch((error) => {
								res.status(400).send(error);
							});
					} else {
						res.status(404).send("Module Does Not Exist");
					}
				})
		} else {
			res.status(404).send("Some Tasks Does Not Eist");
		}
	})
}

function deleteModule(req, res) {
	return mod
		.findByPk(req.params.id)
		.then(modid => {
			if (!modid) {
				return res.status(400).send('Module Does Not Exist');
			}
			return modid
				.destroy()
				.then(() => res.status(204).send())
				.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
}

function getAllTasks(req, res) {
	return mod
		.findAll({
			raw: true,
			where: {
				id: req.params.id
			},
			attributes: ['tasksId'],
		})
		.then((mods) => {
			if (mods.length > 0) {
				for (let i = 0; i < mods[0].tasksId.length; i++) {
					getTask(mods[0].tasksId[i], res, i, mods[0].tasksId.length);
				}
			} else {
				res.status(404).send(`Module Dose Not Exist`);
			}
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function getTask(id, res, index, length) {
	return task
		.findAll({
			raw: true,
			where: {
				id: id
			},
			attributes: ['id', 'name', 'description', 'duration']
		})
		.then((mods) => {
			res.status(200).write(JSON.stringify(mods));
			if (index == length - 1) {
				res.status(200).end();
			}
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function createNewTask(req, res, arr) {
	return mod
		.findByPk(req.params.id)
		.then((modid) => {
			return modid
				.update({
					tasksId: [...new Set(arr)] || modid.tasksId
				})
				.then(() => {
					res.status(200).send(modid)
				})
				.catch((error) => {
					res.status(400).send(modid);
				});
		})

}

function newTask(req, res) {
	return mod
		.findAll({
			raw: true,
			where: {
				id: req.params.id
			},
			attributes: ['tasksId'],
		})
		.then((mods) => {
			taskValidation.taskExists(req.body.tasksId).then((tasks) => {
				if (tasks != `404`) {
					let arr = mods[0].tasksId;
					if (typeof(req.body.tasksId) == "object") {
						for (let i = 0; i < req.body.tasksId.length; i++) {
							arr.push(Number(req.body.tasksId[i]));
						}
					} else {
						arr.push(Number(req.body.tasksId));
					}
					createNewTask(req, res, arr);
				} else {
					res.status(404).send(`Some Tasks Does Not Exist`);
				}
			})
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

module.exports = {
	getModules,
	newModule,
	specificModule,
	updateModule,
	deleteModule,
	getAllTasks,
	newTask
}
