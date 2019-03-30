const user = require('../models').user;
const userValidate = require(`../validations/user`);

function getUsers(req, res) {
  return user
    .findAll({
      attributes : ['id', 'name', 'email', 'password', 'type', 'trainerId', 'joinDate', 'trainingDuration']
    })
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newUser(req, res) {
  let email = userValidate.validateEmail(req.body.email);
  userValidate.nonDuplicateUser(email)
  .then((status) => {
    if(status == "409") {
      res.status(409).send("User Already Exists");
      return status;
    }
  })
  .then((status) =>{
    if(email == "405") {
      res.status(405).send("Invalid Email");
    } else if (status != "409") {
      user
      .build({
        name : req.body.name,
        email: email,
        password: req.body.password,
        type: req.body.type
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
  userValidate.userExists(req.params.id).then((user) => {
      if(user != `404`) {
        res.status(200).send(user);  
        } else {
        res.status(404).send("User does not Exist");
        }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function updateUser(req, res) {
  let email = userValidate.validateEmail(req.body.email);
  if(email != "405") {
    userValidate.userExists(req.params.id).then((users) => {
      if(users != `404`) {
        userValidate.userExists(req.params.id, email).then((users) => {
          if(users != `409`) {
            return user
            .findByPk(req.params.id)
            .then((userid) => {
              return userid
                .update({
                  name : req.body.name || userid.name,
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
            } else {
            res.status(409).send("Email Already Exists");
            }
        })  
        } else {
        res.status(404).send("User Does Not Exist");
        }
    })
  } else {
    res.status(405).send("Invalid Email");
  }
}

function updateTrainer(req, res) {
  return user
  .findByPk(req.params.id)
  .then((userid) => {
    if (!userid) {
      return res.status(400).send("User Does Not Exist");
    }
    userValidate.trainerExists(req.body.trainerId).then((users) => {
      if(users != `404`) {
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
      } else {
        res.status(400).send("Trainer Does Not Exist");
      }
    })
  })
}

function deleteUser(req, res) {
  return user
    .findByPk(req.params.id)
    .then(users => {
      if (!users) {
        return res.status(400).send("User Does Not Exist");
      }
      return users
        .destroy()
        .then(() => res.status(204).send("Successful!!"))
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
  deleteUser,
  getRole,
  login
};