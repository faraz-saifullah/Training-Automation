const mod = require('../models').module

function getModules(req, res) {
  return mod
    .findAll()
    .then((mods) => {
      res.status(200).send(mods)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newModule(req, res) {
  mod
  .build({
    name : req.body.name,
    duration: req.body.duration,
    tasksId: req.body.tasksId
  })
  .save()
  .then((newMod) => res.status(201).send(newMod))
  .catch((error) => res.status(400).send(error));

}

function specificModule(req, res) {
  return mod
    .findByPk(req.params.id)
    .then((mod) => {
      res.status(mod).send(mod)
    }) 
    .catch((error) => {
      res.status(400).send(error);
    });
}

function updateModule(req, res) {
  return mod
    .findByPk(req.params.id)
    .then((modid) => {
      return modid
        .update({
          name: req.body.name || modid.name,
          duration: req.body.duration || modid.duration,
          tasksId: req.body.tasksId || modid.tasksId
        })
        .then(() => {
          res.status(200).send(modid)
        })
        .catch((error) => {
          res.status(400).send(modid);
        });
    })

}

function deleteModule(req, res) {
  return mod
    .findByPk(req.params.id)
    .then(modid => {
      if (!modid) {
        return res.status(400).send({
          message: 'Module Not Found',
        });
      }
      return modid
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function getTasks(req, res) {
  return 
    mod
      
}

function newTask(req, res) {
  return mod
}

module.exports = {
  getModules,
  newModule,
  specificModule,
  updateModule,
  deleteModule,
  getTasks,
  newTask
}