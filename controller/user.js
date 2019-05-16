const user = require(`../models`).user;
const mod = require(`../models`).module;
const log = require(`../models`).log;
const task = require(`../models`).task;
const traineeStatus = require(`../models`).traineeStatus;
const userValidate = require(`../validations/user`);
const moduleValidate = require(`../validations/module`);
const taskValidate = require(`../validations/tasks`);
const trello = require(`../utils/trello`);
const sequelize = require(`sequelize`);
const mail = require(`../utils/email`);

async function getUsers(req, res) {
	let users = await user
		.findAll({
			attributes: [`id`, `name`, `email`, `password`, `type`, `trainerId`, `joinDate`, `trainingDuration`]
		})
	if (users) {
		res.status(200).send(users);
	} else {
		res.status(404).send(`No users found!`);
	}
}

async function newUser(req, res) {
	let email = await userValidate.validateEmail(req.body.email);
	let status = await userValidate.nonDuplicateUser(email)
	if (status == `409`) {
		res.status(409).send(`User Already Exists`);
		return status;
	} else if (email == `405`) {
		res.status(405).send(`Invalid Email`);
	} else if (status != `409`) {
		let boardDetails = ``;
		if(req.body.type == `trainee`) {
			boardDetails = await trello.createBoard(req.body.email, req.body.name);
		}
		let newUser = await user
			.build({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				type: req.body.type,
				trelloBoardId: boardDetails.id
			})
			.save()
			.catch((error) => res.status(400).send(error));
		let HelperOptions = {
			from: `Deqode <saifullahf2608@gmail.com>`,
			to: newUser.email,
			subject: `Welcome to Deqode!`,
			text: `Email id: ${newUser.email}\nPassword: ${newUser.password}\nTrello Board Link: ${boardDetails.url}`
		};
		mail.sendMail(HelperOptions);
		res.render(`home`);
	}
}

async function login(req, res) {
	let existingUser = await user
		.findOne({
			where: {
				email: req.body.email,
				password: req.body.password
			}
		})
	if (!existingUser) {
		res.status(400).send(`Invalid Credentials`);
	} else {
		req.session.type = existingUser.type;
		req.session.userId = existingUser.id;
		console.log(req.session);
		res.redirect(`home`);
	}
}


async function profile(req, res) {
	let usr = await user
		.findByPk(req.session.userId)
	res.status(200).send(usr);
}

async function specificUser(req, res) {
	let user = await userValidate
		.userExists(req.params.id)
	if (user != `404`) {
		res.status(200).send(user);
	} else {
		res.status(404).send(`User does not Exist`);
	}
}

async function updateUser(req, res) {
	let email = await userValidate.validateEmail(req.body.email);
	if (email != `405`) {
		let existingUser = await userValidate.userExists(req.params.id)
		if (existingUser != `404`) {
			let userEmail = await userValidate.userExists(req.params.id, email)
			if (userEmail != `409`) {
				if (req.params.id != req.session.userId) {
					res.status(401).send(`Unauthorized access`);
				} else {
					let userId = await user
						.findByPk(req.params.id)
					userId
						.update({
							name: req.body.name || userId.name,
							email: req.body.email || userId.email,
							password: req.body.password || userId.password
						})
						.catch((error) => {
							res.status(400).send(error);
						});
					res.status(200).send(userId);
				}
			} else {
				res.status(409).send(`Email Already Exists`);
			}
		} else {
			res.status(404).send(`User Does Not Exist`);
		}
	} else {
		res.status(405).send(`Invalid Email`);
	}
}

async function updateTrainer(req, res) {
	let trainee = await userValidate.traineeExists(req.params.id);
	if (!trainee) {
		res.status(400).send(`Trainee Does Not Exist`);
	} else {
		// let existingTrainer = await userValidate.trainerExists(trainee.trainerId);
		//the below commented part is an ongoing issue in trello api
		// if(existingTrainer != `404`) {
		// 	trello.deleteTrainer(trainee.trelloBoardId, existingTrainer.email);
		// }
		let trainer = await userValidate.trainerExists(req.body.trainerId);
		if (trainer != `404`) {
			trello.addTtrainer(trainee.trelloBoardId, trainer.email, trainer.name);
			trainee
				.update({
					trainerId: req.body.trainerId || trainee.trainerId
				})
			res.status(200).send(trainee);
		} else {
			res.status(400).send(`Trainer Does Not Exist`);
		}
	}
}

async function deleteUser(req, res) {
	let usr = await user
		.findByPk(req.params.id)
	if (!usr) {
		return res.status(400).send(`User Does Not Exist`);
	}
	return usr
		.destroy()
		.then(() => res.status(204).send(`Successful!!`))
		.catch((error) => res.status(400).send(error));
}

async function getRole(email) {
	let role = await user.findOne({
		raw: true,
		where: {
			email: email
		},
		attributes: [`type`]
	})
	console.log(role);
	return role;
}

async function assignModule(req, res) {
	let trainee = await userValidate
		.traineeExists(req.params.id)
	if (trainee != `404`) {
		let module = await moduleValidate
			.moduleExists(req.body.moduleId)
		if (module != `404`) {
			let duplicateModule = await moduleValidate
				.notAlreadyAssigned(req.params.id, req.body.moduleId)
			if (duplicateModule != `409`) {
				traineeStatus
					.build({
						userId: req.params.id,
						moduleId: req.body.moduleId,
						status: `assigned`
					})
					.save();
				// let tasks = await mod
				// 	.findOne({
				// 		raw: true,
				// 		where: {
				// 			id: req.body.moduleId
				// 		},
				// 		attributes: [`tasksId`, `name`]
				// 	})
				let HelperOptions = {
					from: `Deqode <saifullahf2608@gmail.com>`,
					to: trainee.email,
					subject: `New Module Assigned`,
					text: `You have been assigned a new module : ${module.name}`
				};
				mail.sendMail(HelperOptions);
				for (let i = 0; i < module.tasksId.length; i++) {
					let duplicateTask = await taskValidate
						.notAlreadyAssigned(req.params.id, module.tasksId[i])
					if (duplicateTask != `409`) {
						traineeStatus
							.build({
								userId: req.params.id,
								taskId: module.tasksId[i],
								status: `assigned`
							})
							.save()
					} else {
						module.tasksId = module.tasksId.splice(i);
						i--;
					}
				}
				log
					.build({
						entity: `module`,
						status: `assigned`,
						time: sequelize.fn(`NOW`),
						userId: req.params.id,
						moduleId: req.body.moduleId,
						trainerId: trainee.trainerId
					})
					.save();
				log
					.build({
						entity: `task`,
						status: `assigned`,
						time: sequelize.fn(`NOW`),
						userId: req.params.id,
						taskId: module.tasksId[0],
						trainerId: trainee.trainerId
					})
					.save();
				res.status(200).send(`Module Assigned`);
			} else {
				res.status(409).send(`Module Already Assigned`);
			}
		} else {
			res.status(404).send(`Module Does Not Exist`);
		}
	} else {
		res.status(404).send(`Trainee Does Not Exist`);
	}
}

async function taskDone(req, res) {
	let trainee = await userValidate
		.traineeExists(req.params.id)
	if (trainee != `404`) {
		let checkTaskPresent = await traineeStatus
			.findOne({
				where: {
					userId: req.params.id,
					taskId: req.body.tasksId,
					status: `assigned`
				}
			})
		if (checkTaskPresent) {
			await checkTaskPresent
				.update({
					status: `done`
				})
			log
				.build({
					entity: `task`,
					status: `done`,
					time: sequelize.fn(`NOW`),
					userId: req.params.id,
					taskId: req.body.tasksId,
					trainerId: trainee.trainerId
				})
				.save()
			let unfinishedTask = await traineeStatus
				.findOne({
					where: {
						userId: req.params.id,
						status: `assigned`,
						moduleId: null
					}
				})
			if (!unfinishedTask) {
				let currentModule = await traineeStatus
					.findOne({
						where: {
							userId: req.params.id,
							status: `assigned`,
							taskId: null
						}
					})
				await log
					.build({
						entity: `module`,
						status: `done`,
						time: sequelize.fn(`NOW`),
						userId: req.params.id,
						moduleId: currentModule.moduleId,
						trainerId: trainee.trainerId
					})
					.save()
				let trainerEmail = await user
					.findOne({
						raw: true,
						where: {
							id: trainee.trainerId
						},
						attributes: [`email`]
					})
				let startTime = await log.findOne({
					raw: true,
					where: {
						userId: req.params.id,
						moduleId: currentModule.moduleId,
						status: `done`
					},
					attributes: [`time`]
				})
				let endTime = await log.findOne({
					raw: true,
					where: {
						userId: req.params.id,
						moduleId: currentModule.moduleId,
						status: `assigned`
					},
					attributes: [`time`]
				});
				let moduleInfo = await mod
					.findOne({
						raw: true,
						where: {
							id: currentModule.moduleId
						},
						attributes: ['name', 'duration', 'tasksId']
					})
				let HelperOptions = {
					from: `Deqode <saifullahf2608@gmail.com>`,
					to: trainerEmail.email,
					subject: `${trainee.name} Completed ${moduleInfo.name} Module Completion Report`,
					text: `${trainee.name} finished module : ${moduleInfo.name}\nAssigned on ${startTime.time}\nCompleted om ${endTime.time}\nExpected duration ${moduleInfo.duration} days\nTasks Completed are : ${moduleInfo.tasksId}`
				};
				mail.sendMail(HelperOptions);
				currentModule
					.update({
						status: `done`
					})
			} else {
				log
					.build({
						entity: `task`,
						status: `assigned`,
						time: sequelize.fn(`NOW`),
						userId: req.params.id,
						taskId: unfinishedTask.taskId,
						trainerId: trainee.trainerId
					})
					.save()
				let taskInfo = await task
					.findOne({
						raw: true,
						where: {
							id: unfinishedTask.taskId
						}
					});
				let HelperOptions = {
					from: `Deqode <saifullahf2608@gmail.com>`,
					to: trainee.email,
					subject: `New Task Assigned`,
					text: `You have been assigned a new task\nName: ${taskInfo.name}\nDescription:${taskInfo.description}\nDuration:${taskInfo.duration}`
				};
				mail.sendMail(HelperOptions);
			}
			res.status(200).send(`Success`);
		} else {
			res.status(404).send(`Task Not Present`);
		}
	} else {
		res.status(404).send(`Trainee Does Not Exist`);
	}
}

module.exports = {
	getUsers,
	newUser,
	profile,
	specificUser,
	updateUser,
	updateTrainer,
	deleteUser,
	getRole,
	login,
	assignModule,
	taskDone,
};
