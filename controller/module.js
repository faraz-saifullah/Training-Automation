const mod = require('../models').module
const task = require('../models').task

function getModules(req, res) {
  return mod

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
    .findAll({
      raw : true,
       where : {
      id : req.params.id
    },
      attributes : ['id', 'name', 'duration', 'tasksId']
    })
    .then((mod) => {
      res.status(200).send(mod)
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
          message: 'Module Not Found'
        });
      }
      return modid
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function getAllTasks(req, res) {
  return mod
  .findAll({
    raw : true,
    where : {
      id: req.params.id
    },
    attributes : ['tasksId'],
  })
  .then((mods) => {
    for(let i = 0; i < mods[0].tasksId.length; i++) {
    getTask(mods[0].tasksId[i], res, i, mods[0].tasksId.length); 
    }
  })
  .catch((error) => {
    res.status(400).send(error);
  });      
}

function getTask(id, res, index, length) {
  return task
  .findAll({
    raw : true,
    where : {
      id: id
    },
    attributes : ['id', 'name', 'description', 'duration']
  })
  .then((mods) => {
    res.status(200).write(JSON.stringify(mods));
    if(index == length - 1) {
      res.status(200).end();
    }
  })
  .catch((error) => {
    res.status(400).send(error);
  });      
}

function createNewTask(req, res, arr) {
  return mod
  .findByPk(req.params.id)
  .then((modid) => {
    return modid
      .update({
        tasksId: arr || modid.tasksId
      })
      .then(() => {
        res.status(200).send(modid)
      })
      .catch((error) => {
        res.status(400).send(modid);
      });
  })

}

function newTask(req, res) {
  return mod
  .findAll({
    raw : true,
    where : {
      id: req.params.id
    },
    attributes : ['tasksId'],
  })
  .then((mods) => {
    let arr = mods[0].tasksId;
    console.log(typeof(req.body.tasksId));
    if(typeof(req.body.tasksId) == "object") {
      for(let i = 0; i < req.body.tasksId.length; i++) {
        arr.push(Number(req.body.tasksId[i]));
      }
    } else {
      arr.push(Number(req.body.tasksId));
    }
    createNewTask(req, res, arr);
  })
  .catch((error) => {
    res.status(400).send(error);
  }); 
}

module.exports = {
  getModules,
  newModule,
  specificModule,
  updateModule,
  deleteModule,
  getAllTasks,
  newTask
}