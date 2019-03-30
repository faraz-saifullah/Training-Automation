var express = require('express');
var User = require('../controller/user')
var Module = require('../controller/module')
var Task = require('../controller/task')
var Log = require('../controller/log')
var Status = require('../controller/status')


//users
router.get('/app/users', trainerRole, function (req, res) {
  User.getUsers(req, res);
});
router.post('/app/users', User.newUser);
router.get('/app/users/:id', User.specificUser);
router.put('/app/users/:id', User.updateUser);
router.delete('/app/users/:id', User.deleteUser);
router.put('/app/users/:id/updateTrainer', User.updateTrainer);
router.post('/app/users/:id/assignModule', User.assignModule);

//modules
router.get('/app/modules', Module.getModules);
router.post('/app/modules', Module.newModule);
router.get('/app/modules/:id', Module.specificModule);
router.put('/app/modules/:id', Module.updateModule);
router.delete('/app/modules/:id', Module.deleteModule);
router.get('/app/modules/:id/tasks', Module.getAllTasks);
router.post('/app/modules/:id/tasks', Module.newTask);

//tasks
router.get('/app/tasks', Task.getTasks);
router.post('/app/tasks', Task.newTask);
router.get('/app/tasks/:id', Task.specificTask);
router.put('/app/tasks/:id', Task.updateTask);
router.delete('/app/tasks/:id', Task.deleteTask);

//logs
router.get('/app/logs', Log.getLogs);
router.post('/app/logs', Log.newLog);
router.get('/app/logs/:id', Log.specificLog);
router.delete('/app/logs/:id', Log.deleteLog);

//traineeStatus
router.get('/app/status', Status.getStatus);
router.post('/app/status', Status.newStatus);

router.get('/signup', redirectHome, (req, res) => {
  res.render('signup');
});

router.get('/signin', redirectHome, (req, res) => {
  res.render('signin');
});

router.get('/home', redirectLogin, (req, res) => {
  console.log(req.session);
  res.render('home');
});

router.get('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

router.post('/signup', redirectHome, function (req, res, next) {
  User.newUser(req, res)
});
router.post('/signin', redirectHome, function (req, res) {
  User.login(req, res);
});

module.exports = router;
