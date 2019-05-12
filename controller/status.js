const status = require(`../models`).traineeStatus;

async function getStatus(req, res) {
	let status = await status
		.findAll()
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(status);
}

async function newStatus(req, res) {
	let newStatus = await status
		.build({
			userId: req.body.userId,
			moduleId: req.body.moduleId,
			taskId: req.body.taskId,
			status: req.body.status
		})
		.save()
		.catch((error) => res.status(400).send(error));
	res.status(201).send(newStatus);
}

module.exports = {
	getStatus,
	newStatus
}
