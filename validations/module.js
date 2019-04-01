`use strict`;
const mod = require(`../models`).module;
const traineeStatus = require(`../models`).traineeStatus;

async function moduleExists(id) {
	let modules = await mod.findAll({
		raw: true,
		where: {
			id: id,
		},
		attributes: [`id`, `name`, `duration`, `tasksId`]
	})
	return typeof modules !== `undefined` && modules.length > 0 ? modules : "404";
}

async function notAlreadyAssigned(userId, moduleId) {
	let duplicateModule = await traineeStatus.findOne({
		raw: true,
		where: {
			moduleId: moduleId,
			userId: userId
		}
	})
	return duplicateModule == null ? "200" : "409";
}

module.exports = {
	moduleExists,
	notAlreadyAssigned
}
