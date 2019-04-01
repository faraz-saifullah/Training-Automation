const user = require(`../models`).user;
const sequelize = require(`sequelize`);
const mod = require(`../models`).module;
const log = require(`../models`).log;
const task = require(`../models`).task;
const mail = require(`../utils/email`);
const traineeStatus = require(`../models`).traineeStatus;
const userValidate = require(`../validations/user`);
const moduleValidate = require(`../validations/module`);
const taskValidate = require(`../validations/tasks`);

function getUsers(req, res) {
	return user
		.findAll({
			attributes: [`id`, `name`, `email`, `password`, `type`, `trainerId`, `joinDate`, `trainingDuration`]
		})
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function newUser(req, res) {
	let email = userValidate.validateEmail(req.body.email);
	userValidate.nonDuplicateUser(email)
		.then((status) => {
			if (status == `409`) {
				res.status(409).send(`User Already Exists`);
				return status;
			}
		})
		.then((status) => {
			if (email == `405`) {
				res.status(405).send(`Invalid Email`);
			} else if (status != `409`) {
				user
					.build({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password,
						type: req.body.type
					})
					.save()
					.then((user) => {
						console.log(user.email);
						let usermail = user.email;
						let pwd = user.password;
						let HelperOptions = {
							from: `Shreyas <schoudhari@techracers.io>`,
							to: usermail,
							subject: `Welcome to Deqode!`,
							text: `Email id: ${usermail} Password:` + pwd
						};
						mail.sendMail(HelperOptions);
						res.render(`home`)
					})
					.catch((error) => res.status(400).send(error));
			}
		})
		.catch((error) => res.status(400).send(error));
}

function login(req, res) {
	user.findOne({
			where: {
				email: req.body.email,
				password: req.body.password
			}
		})
		.then(user => {
			if (!user) {
				res.status(400).send(`Invalid Credentials`);
			} else {
				req.session.type = user.type;
				req.session.userId = user.id;
				console.log(req.session);
				res.redirect(`home`);
			}
		})
}


function profile(req, res) {
	user
		.findByPk(req.session.userId)
		.then(user => {
			res.status(200).send(user);
		})
}

function login(req, res) {
	user.findOne({
			where: {
				email: req.body.email,
				password: req.body.password
			}
		})
		.then(user => {
			if (!user) {
				res.status(400).send(`Invalid Credentials`);
			} else {
				req.session.type = user.type;
				req.session.userId = user.id;
				console.log(req.session);
				res.redirect(`home`);
			}
		})
}

function profile(req, res) {
	user
		.findByPk(req.session.userId)
		.then(user => {
			res.status(200).send(user);
		})
}

function specificUser(req, res) {
	userValidate.userExists(req.params.id).then((user) => {
			if (user != `404`) {
				res.status(200).send(user);
			} else {
				res.status(404).send(`User does not Exist`);
			}
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

function updateUser(req, res) {
	let email = userValidate.validateEmail(req.body.email);
	if (email != `405`) {
		userValidate.userExists(req.params.id).then((users) => {
			if (users != `404`) {
				userValidate.userExists(req.params.id, email).then((users) => {
					if (users != `409`) {
						if (req.params.id != req.session.userId) {
							res.status(401).send(`Unauthorized access`);
						}
						return user
							.findByPk(req.params.id)
							.then((userid) => {
								return userid
									.update({
										name: req.body.name || userid.name,
										email: req.body.email || userid.email,
										password: req.body.password || userid.password
									})
									.then(() => {
										res.status(200).send(userid);
									})
									.catch((error) => {
										res.status(400).send(error);
									});
							})
					} else {
						res.status(409).send(`Email Already Exists`);
					}
				})
			} else {
				res.status(404).send(`User Does Not Exist`);
			}
		})
	} else {
		res.status(405).send(`Invalid Email`);
	}
}

function updateTrainer(req, res) {
	return user
		.findOne({
			where: {
				id: req.params.id,
				type: `trainee`
			}
		})
		.then((userid) => {
			console.log(userid);
			if (!userid) {
				return res.status(400).send(`Trainee Does Not Exist`);
			}
			userValidate.trainerExists(req.body.trainerId).then((users) => {
				if (users != `404`) {
					return userid
						.update({
							trainerId: req.body.trainerId || userid.trainerId
						})
						.then(() => {
							res.status(200).send(userid);
						})
						.catch((error) => {
							res.status(400).send(error);
						});
				} else {
					res.status(400).send(`Trainer Does Not Exist`);
				}
			})
		})
}

function deleteUser(req, res) {
	return user
		.findByPk(req.params.id)
		.then(users => {
			if (!users) {
				return res.status(400).send(`User Does Not Exist`);
			}
			return users
				.destroy()
				.then(() => res.status(204).send(`Successful!!`))
				.catch((error) => res.status(400).send(error));
		})
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

function assignModule(req, res) {
	userValidate.traineeExists(req.params.id).then((users) => {
		if (users != `404`) {
			moduleValidate.moduleExists(req.body.moduleId).then((modules) => {
				if (modules != `404`) {
					moduleValidate.notAlreadyAssigned(req.params.id, req.body.moduleId).then((duplicateModule) => {
						if (duplicateModule != `409`) {
							traineeStatus
								.build({
									userId: req.params.id,
									moduleId: req.body.moduleId,
									status: `assigned`
								})
								.save()
								.then(() => {
									mod
										.findOne({
											raw: true,
											where: {
												id: req.body.moduleId
											},
											attributes: [`tasksId`, `name`]
										})
										.then((tasks) => {
											let HelperOptions = {
												from: `Shreyas <schoudhari@techracers.io>`,
												to: users.email,
												subject: `New Module Assigned`,
												text: `You have been assigned a new module : ${tasks.name}`
											};
											mail.sendMail(HelperOptions);
											for (let i = 0; i < tasks.tasksId.length; i++) {
												console.log(i);
												taskValidate.notAlreadyAssigned(req.params.id, tasks.tasksId[i]).then((duplicateTask) => {
													if (duplicateTask != `409`) {
														traineeStatus
															.build({
																userId: req.params.id,
																taskId: tasks.tasksId[i],
																status: `assigned`
															})
															.save()
													} else {
														tasks.tasksId = tasks.tasksId.splice(i);
														i--;
													}
												})
												//duplicate task entry for a user in logs must be handled
											}
											return tasks;
										}).then((tasks) => {
											log
												.build({
													entity: `module`,
													status: `assigned`,
													time: sequelize.fn(`NOW`),
													userId: req.params.id,
													moduleId: req.body.moduleId,
													trainerId: users[0].trainerId
												})
												.save();
											return tasks;
										}).then((tasks) => {
											log
												.build({
													entity: `task`,
													status: `assigned`,
													time: sequelize.fn(`NOW`),
													userId: req.params.id,
													taskId: tasks.tasksId[0],
													trainerId: users[0].trainerId
												})
												.save();
										})
									res.status(200).send(`Module Assigned`);
								})
								.catch((error) => res.status(400).send(error));
						} else {
							res.status(409).send(`Module Already Assigned`);
						}
					})
				} else {
					res.status(404).send(`Module Does Not Exist`);
				}
			})
		} else {
			res.status(404).send(`Trainee Does Not Exist`);
		}
	})
}

function taskDone(req, res) {
	userValidate.traineeExists(req.params.id).then((users) => {
		if (users != `404`) {
			return traineeStatus
				.findOne({
					where: {
						userId: req.params.id,
						taskId: req.body.tasksId,
						status: `assigned`
					}
				})
				.then((traineeStat) => {
					if (traineeStat) {
						traineeStat
							.update({
								status: `done`
							})
							.then(() => {
								log
									.build({
										entity: `task`,
										status: `done`,
										time: sequelize.fn(`NOW`),
										userId: req.params.id,
										taskId: req.body.tasksId,
										trainerId: users[0].trainerId
									})
									.save()
									.then(() => {
										traineeStatus
											.findOne({
												where: {
													userId: req.params.id,
													status: `assigned`,
													moduleId: null
												}
											})
											.then((unfinishedTask) => {
												if (!unfinishedTask) {
													log
														.findOne({
															where: {
																userId: req.params.id,
																entity: `module`,
																status: `assigned`
															}
														})
														.then((module) => {
															log
																.build({
																	entity: `module`,
																	status: `done`,
																	time: sequelize.fn(`NOW`),
																	userId: req.params.id,
																	moduleId: module.moduleId,
																	trainerId: module.trainerId
																})
																.save()
															traineeStatus
																.findOne({
																	where: {
																		userId: req.params.id,
																		status: `assigned`,
																		taskId: null
																	}
																})
																.then((record) => {
																	record
																		.update({
																			status: `done`
																		})
																})
														})
												} else {
													log
														.build({
															entity: `task`,
															status: `assigned`,
															time: sequelize.fn(`NOW`),
															userId: req.params.id,
															taskId: unfinishedTask.taskId,
															trainerId: users[0].trainerId
														})
														.save()
														.then(() => {
															task
																.findOne({
																	raw: true,
																	where: {
																		id: unfinishedTask.taskId
																	}
																})
																.then((task) => {
																	let HelperOptions = {
																		from: `Shreyas <schoudhari@techracers.io>`,
																		to: users.email,
																		subject: `New Task Assigned`,
																		text: `You have been assigned a new task\n Name: ${task.name}\nDescription:${task.description}\nDuration:${task.duration}`
																	};
																	mail.sendMail(HelperOptions);
																})
														})
												}
											});
									});
							});
					}
					res.status(200).send(`Success`);
				});
		} else {
			res.status(404).send(`Trainee Does Not Exist`);
		}
	})
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
