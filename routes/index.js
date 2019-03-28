var express = require('express');
var router = express.Router();
var User = require('../controller/user')
var Module = require('../controller/module')
var Task = require('../controller/task')
var Log = require('../controller/log')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello");
});

//users
router.get('/app/users', User.getUsers);
router.post('/app/users', User.newUser);
router.get('/app/users/:id', User.specificUser);
router.put('/app/users/:id', User.updateUser);
router.put('/app/users/:id/updateTrainer', User.updateTrainer);

//modules
router.get('/app/modules', Module.getModules);
router.post('/app/modules', Module.newModule);
router.get('/app/modules/:id', Module.specificModule);
router.put('/app/modules/:id', Module.updateModule);
router.delete('/app/modules/:id', Module.deleteModule);
router.get('/app/modules/:id/tasks', Module.getTasks);
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

module.exports = router;
