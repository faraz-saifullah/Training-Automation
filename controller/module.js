const mod = require(`../models`).module;
const task = require(`../models`).task;
const taskValidation = require(`../validations/tasks`);
const moduleValidation = require(`../validations/module`);

async function getModules(req, res) {
	let modules = await mod
		.findAll({
			attributes: [`id`, `name`, `duration`, `tasksId`]
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(modules);
}

async function newModule(req, res) {
	let tasks = await taskValidation
		.taskExists(req.body.tasksId);
	if (tasks != `404`) {
		let newModule = await mod
			.build({
				name: req.body.name,
				duration: req.body.duration,
				tasksId: [...new Set(req.body.tasksId)]
			})
			.save()
			.catch((error) => res.status(400).send(error));
		res.status(201).send(newModule)
	} else {
		res.status(404).send(`Some Tasks Does Not Eist`);
	}
}

async function specificModule(req, res) {
	let modules = await moduleValidation
		.moduleExists(req.params.id)
		.catch((error) => {
			res.status(400).send(error);
		});
	if (modules != `404`) {
		res.status(200).send(modules);
	} else {
		res.status(404).send(`Module Does Not Exist`);
	}
}

async function updateModule(req, res) {
	let arr = [];
	typeof req.body.tasksId == `object` ? arr = req.body.tasksId : arr.push(req.body.tasksId);
	let tasks = await taskValidation
		.taskExists(req.body.tasksId);
	if (tasks != `404`) {
		let moduleId = await mod
			.findByPk(req.params.id);
		if (moduleId) {
			moduleId
				.update({
					name: req.body.name || moduleId.name,
					duration: req.body.duration || moduleId.duration,
					tasksId: arr || moduleId.tasksId
				})
				.then(() => {
					res.status(200).send(moduleId);
				})
				.catch((error) => {
					res.status(400).send(error);
				});
		} else {
			res.status(404).send(`Module Does Not Exist`);
		}
	} else {
		res.status(404).send(`Some Tasks Does Not Eist`);
	}
}

async function deleteModule(req, res) {
	let moduleId = await mod
		.findByPk(req.params.id)
		.catch((error) => res.status(400).send(error));
	if (!moduleId) {
		return res.status(400).send(`Module Does Not Exist`);
	}
	await momoduleIddid
		.destroy()
		.catch((error) => res.status(400).send(error));
	res.status(204).send();
}

async function getAllTasks(req, res) {
	let modules = await mod
		.findAll({
			raw: true,
			where: {
				id: req.params.id
			},
			attributes: [`tasksId`],
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	if (modules.length > 0) {
		for (let i = 0; i < modules[0].tasksId.length; i++) {
			getTask(modules[0].tasksId[i], res, i, modules[0].tasksId.length);
		}
	} else {
		res.status(404).send(`Module Dose Not Exist`);
	}
}

function getTask(id, res, index, length) {
	return task
		.findAll({
			raw: true,
			where: {
				id: id
			},
			attributes: [`id`, `name`, `description`, `duration`]
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

async function createNewTask(req, res, arr) {
	let moduleId = await mod
		.findByPk(req.params.id)
	await moduleId
		.update({
			tasksId: [...new Set(arr)] || moduleId.tasksId
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(moduleId);

}

async function newTask(req, res) {
	let modules = await mod
		.findAll({
			raw: true,
			where: {
				id: req.params.id
			},
			attributes: [`tasksId`],
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	let tasks = await taskValidation
		.taskExists(req.body.tasksId);
	if (tasks != `404`) {
		let arr = modules[0].tasksId;
		if (typeof(req.body.tasksId) == `object`) {
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
