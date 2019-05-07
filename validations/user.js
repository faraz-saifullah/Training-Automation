`use strict`;
const user = require(`../models`).user;
var Op = require(`sequelize`).Op;

function validateEmail(email) {
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !(re.test(String(email).toLowerCase())) ? "405" : String(email).toLowerCase();
}

async function nonDuplicateUser(email) {
	let users = await user.findAll({
		raw: true,
		where: {
			email: email
		},
		attributes: [`email`]
	});
	return typeof users !== `undefined` && users.length > 0 ? `409` : `200`;
}

async function userExists(id, email) {
	if (email != undefined) {
		let users = await user.findAll({
			raw: true,
			where: {
				id: {
					[Op.ne]: id
				},
				email: email
			}
		})
		return typeof users !== `undefined` && users.length > 0 ? `409` : `200`;
	} else {
		let users = await user.findAll({
			where: {
				id: id
			},
			attributes: [`id`, `name`, `email`, `password`, `type`, `trainerId`, `joinDate`, `trainingDuration`]
		})
		return typeof users !== `undefined` && users.length > 0 ? users : `404`;
	}
}

async function trainerExists(id) {
	let users = await user.findAll({
		where: {
			id: id,
			type: `trainer`
		},
		attributes: [`id`, `email`]
	})
	return typeof users !== `undefined` && users.length > 0 ? users : `404`;
}

async function traineeExists(id) {
	let users = await user.findOne({
		where: {
			id: id,
			type: `trainee`
		},
		attributes: [`id`, `trainerId`, `email`, `joinDate`, 'trainingDuration']
	})
	return typeof users !== `undefined` ? users : `404`;
}

module.exports = {
	nonDuplicateUser,
	userExists,
	trainerExists,
	validateEmail,
	traineeExists
}
