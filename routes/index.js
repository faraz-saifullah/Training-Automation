const express = require(`express`);
const router = express.Router();
const User = require(`../controller/user`)
const Module = require(`../controller/module`)
const Task = require(`../controller/task`)
const Log = require(`../controller/log`)
const Status = require(`../controller/status`)
const role = require(`../controller/auth`);
var cors = require('cors');

router.use(cors());
router.get(`/`, function (req, res, next) {
  res.redirect(`/signin`);
});
var whitelist = ['http://localhost:3001', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.use(cors(corsOptions));


//users
router.get(`/app/users`, User.getUsers);
router.get(`/app/profile`, User.profile);
router.get(`/app/users/:id`, User.specificUser);
router.put(`/app/users/:id`, role.traineeTrainerRole, User.updateUser);
router.delete(`/app/users/:id`, role.adminRole, User.deleteUser);
router.put(`/app/users/:id/updateTrainer`, role.adminRole, User.updateTrainer);
router.post(`/app/users/:id/taskDone`, role.traineeRole, User.taskDone);
router.post(`/app/users/:id/assignModule`, role.trainerRole, User.assignModule);

//modules
router.get(`/app/modules`, role.redirectLogin, Module.getModules);
router.post(`/app/modules`, role.trainerRole,Module.newModule);  //
router.get(`/app/modules/:id`, role.traineeTrainerRole, Module.specificModule);
router.put(`/app/modules/:id`, role.trainerRole, Module.updateModule);
router.delete(`/app/modules/:id`, role.trainerRole, Module.deleteModule);
router.get(`/app/modules/:id/tasks`, role.traineeTrainerRole, Module.getAllTasks);
router.post(`/app/modules/:id/tasks`, role.trainerRole, Module.newTask);

//tasks
router.get(`/app/tasks`, Task.getTasks);
router.post(`/app/tasks`, role.trainerRole, Task.newTask);
router.get(`/app/tasks/:id`, role.traineeTrainerRole, Task.specificTask);
router.put(`/app/tasks/:id`, role.trainerRole, Task.updateTask);
router.delete(`/app/tasks/:id`, role.trainerRole, Task.deleteTask);

//logs
router.get(`/app/logs`, Log.getLogs);
router.post(`/app/logs`, role.traineeTrainerRole, Log.newLog);
router.get(`/app/logs/:id`, role.trainerRole, Log.specificLog);

//add new router for trainee specific log
router.delete(`/app/logs/:id`, role.trainerRole,Log.deleteLog);

//traineeStatus
router.get(`/app/status`, role.adminTrainerRole, Status.getStatus);
router.post(`/app/status`, role.traineeTrainerRole, Status.newStatus);
router.get(`/signup`, role.adminRole, (req, res) => {
  res.render(`signup`);
});
router.get(`/signin`, role.redirectHome, (req, res) => {
  res.render(`signin`);
}); 
router.get(`/home`, role.redirectLogin, (req, res) => {
  res.render(`home`);
});
router.get(`/logout`, role.redirectLogin, (req, res) => {
  req.session.destroy(err => {
    res.redirect(`/`);
  });
});
router.get(`/trainerDash`, (req, res) => {
  res.render(`trainerDash`);
})
router.post(`/signup`, function (req, res, next) {
  User.newUser(req, res)
});
router.post(`/signin`, role.redirectHome, function (req, res) {
  User.login(req, res);
});

module.exports = router;
