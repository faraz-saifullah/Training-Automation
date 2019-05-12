const log = require(`../models`).log;

async function getLogs(req, res) {
	let logs = await log
		.findAll()
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(logs);
}

async function newLog(req, res) {
	let newLog = await log
		.build({
			entity: req.body.entity,
			status: req.body.status,
			time: req.body.time,
			userId: req.body.userId,
			moduleId: req.body.moduleId,
			taskId: req.body.taskId
		})
		.save()
		.catch((error) => res.status(400).send(error));
	res.status(201).send(newLog);
}

async function specificLog(req, res) {
	let log = await log
		.findByPk(req.params.id)
		.catch((error) => {
			res.status(400).send(error);
		});
	res.status(200).send(log);
}

async function deleteLog(req, res) {
	let logId = await log
		.findByPk(req.params.id)
		.catch((error) => res.status(400).send(error));
	if (!logId) {
		return res.status(400).send({
			message: `Log Not Found`,
		});
	}
	await logId
		.destroy()
		.catch((error) => res.status(400).send(error));
	res.status(204).send();
}

module.exports = {
	getLogs,
	newLog,
	specificLog,
	deleteLog
}
