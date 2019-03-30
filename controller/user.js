const user = require('../models').user

function getUsers(req, res) {
  return user
    .findAll()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newUser(req, res) {
  user
    .build({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      joinDate: req.body.joiningDate
    })
    .save()
    .then((newUser) => {
      //res.status(201).send(newUser);
      req.session.userId = user.id;
      req.session.type = user.type;
      res.render('home')
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
      if(!user) {
        res.status(400).send('Invalid Credentials')
      } else {
      req.session.type = user.type;
      req.session.userId = user.id;
      console.log(req.session); 
      res.redirect('home'); 
      }
    })   
}

function specificUser(req, res) {
  return user
    .findByPk(req.params.id)
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function updateUser(req, res) {
  return user
    .findByPk(req.params.id)
    .then((userid) => {
      return userid
        .update({
          name: req.body.name || userid.name,
          email: req.body.email || userid.email,
          password: req.body.password || userid.password,
          type: req.body.type || userid.type,
        })
        .then(() => {
          res.status(200).send(userid)
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    })

}

function updateTrainer(req, res) {
  return user
    .findByPk(req.params.id)
    .then((userid) => {
      return userid
        .update({
          trainerId: req.body.trainerId || userid.trainerId
        })
        .then(() => {
          res.status(200).send(userid)
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    })
}

async function getRole(email) {
  let role = await user.findOne({
    raw: true,
    where: {
      email: email
    },
    attributes: ['type']
  })
  console.log(role);
  return role;
}

module.exports = {
  getUsers,
  newUser,
  specificUser,
  updateUser,
  updateTrainer,
  getRole,
  login
};