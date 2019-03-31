var express = require('express');
var router = express.Router();
var User = require('../controller/user')
var Module = require('../controller/module')
var Task = require('../controller/task')
var Log = require('../controller/log')
var Status = require('../controller/status')
var role = require('../controller/auth');
  var mail = require('../utils/email');

// let HelperOptions = {
//   from: '"Shreyas" <schoudhari@techracers.io>',
//   to: 'shreyas@mailinator.com',
//   subject: 'dd',
//   text: 'Aai zawali'
// };
/* GET home page. */
router.get('/', function (req, res, next) {
  // mail.sendMail(HelperOptions);
  res.send("Hello");
});

//users
router.get('/app/users', role.traineeRole, User.getUsers);
router.get('/app/users/:id', User.specificUser);
router.put('/app/users/:id', role.traineeTrainerRole, User.updateUser);
router.delete('/app/users/:id', role.trainerRole, User.deleteUser);
router.put('/app/users/:id/updateTrainer', role.traineeTrainerRole, User.updateTrainer);

//modules
router.get('/app/modules', role.adminTrainerRole, Module.getModules);
router.post('/app/modules', role.trainerRole,Module.newModule);
router.get('/app/modules/:id', role.traineeTrainerRole, Module.specificModule);
router.put('/app/modules/:id', role.trainerRole, Module.updateModule);
router.delete('/app/modules/:id', role.trainerRole, Module.deleteModule);
router.get('/app/modules/:id/tasks', role.traineeTrainerRole, Module.getAllTasks);
router.post('/app/modules/:id/tasks', role.trainerRole, Module.newTask);

//tasks
router.get('/app/tasks', role.traineeTrainerRole, Task.getTasks);
router.post('/app/tasks', role.trainerRole, Task.newTask);
router.get('/app/tasks/:id', role.traineeTrainerRole, Task.specificTask);
router.put('/app/tasks/:id', role.trainerRole, Task.updateTask);
router.delete('/app/tasks/:id', role.trainerRole, Task.deleteTask);

//logs
router.get('/app/logs', role.adminTrainerRole, Log.getLogs);
router.post('/app/logs', role.traineeTrainerRole, Log.newLog);
router.get('/app/logs/:id', role.trainerRole, Log.specificLog);
//add new router for trainee specific log
router.delete('/app/logs/:id', role.trainerRole,Log.deleteLog);

//traineeStatus
router.get('/app/status', role.trainerRole, Status.getStatus);
router.post('/app/status', role.traineeTrainerRole, Status.newStatus);

router.get('/signup', role.adminRole, (req, res) => {
  res.render('signup');
});

router.get('/signin', role.redirectHome, (req, res) => {
  res.render('signin');
});

router.get('/home', role.redirectLogin, (req, res) => {
  console.log(req.session);
  res.render('home');
});

router.get('/logout', role.redirectLogin, (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

router.post('/signup', function (req, res, next) {
  User.newUser(req, res)
});

router.post('/signin', role.redirectHome, function (req, res) {
  User.login(req, res);
});

module.exports = router;