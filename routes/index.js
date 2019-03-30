var express = require('express');
var User = require('../controller/user')
var Module = require('../controller/module')
var Task = require('../controller/task')
var Log = require('../controller/log')
var Status = require('../controller/status')

module.exports = (app, passport) => {

  const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/signin');
    } else {
      next();
    }
  }

  const trainerRole = (req, res, next) => {
    console.log(req.session);
    if(req.session.type == "trainer" && req.session.userId) {
      next();
    } else {
      res.status(401).send('Unauthorized access!');
    }
  }

  const redirectHome = (req, res, next) => {
    if (req.session.userId) {
      res.redirect('/home');
    } else {
      next();
    }
  }

  /* GET home page. */
  app.get('/', function (req, res, next) {
    console.log(req.session);
    res.send("Hello");
  });

  //users
  app.get('/app/users', trainerRole, function (req, res) {
    User.getUsers(req, res);
  });
  app.post('/app/users', User.newUser);
  app.get('/app/users/:id', User.specificUser);
  app.put('/app/users/:id', User.updateUser);
  app.put('/app/users/:id/updateTrainer', User.updateTrainer);

  //modules
  app.get('/app/modules', Module.getModules);
  app.post('/app/modules', Module.newModule);
  app.get('/app/modules/:id', Module.specificModule);
  app.put('/app/modules/:id', Module.updateModule);
  app.delete('/app/modules/:id', Module.deleteModule);
  app.get('/app/modules/:id/tasks', Module.getTasks);
  app.post('/app/modules/:id/tasks', Module.newTask);

  //tasks
  app.get('/app/tasks', Task.getTasks);
  app.post('/app/tasks', Task.newTask);
  app.get('/app/tasks/:id', Task.specificTask);
  app.put('/app/tasks/:id', Task.updateTask);
  app.delete('/app/tasks/:id', Task.deleteTask);

  //logs
  app.get('/app/logs', Log.getLogs);
  app.post('/app/logs', Log.newLog);
  app.get('/app/logs/:id', Log.specificLog);
  app.delete('/app/logs/:id', Log.deleteLog);

  //traineeStatus
  app.get('/app/status', Status.getStatus);
  app.post('/app/status', Status.newStatus);

  app.get('/signup', redirectHome, (req, res) => {
    res.render('signup');
  });

  app.get('/signin', redirectHome, (req, res) => {
    res.render('signin');
  });

  app.get('/home', redirectLogin, (req, res) => {
    console.log(req.session);
    res.render('home');
  });

  app.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post('/signup', redirectHome, function (req, res, next) {
    User.newUser(req, res)
  });

  app.post('/signin', redirectHome, function (req, res) {
    User.login(req, res);
  });

}
