const task = require('../models').task
const log = require('../models').log

function getTasks(req, res) {
  return task
  .findAll()
  .then((tasks) => {
    res.status(200).send(tasks)
  })
  .catch((error) => {
    res.status(400).send(error);
  });
}

function specificTask(req, res) {
  return task
    .findByPk(req.params.id)
    .then((task) => {
      res.status(200).send(task)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newTask(req, res) {
  //console.log(req.body.name);
  task
    .build({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration
    })
    .save()
    .then((newTask) => res.status(201).send(newTask))
    .catch((error) => res.status(400).send(error));
}

function updateTask(req, res) {
  return task
    .findByPk(req.params.id)
    .then((taskid) => {
      return taskid
        .update({
          name: req.body.name || taskid.name,
          description: req.body.description || taskid.description,
          duration: req.body.duration || taskid.duration
        })
        .then(() => {
          res.status(200).send(taskid)
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    })


}

function deleteTask(req, res) {
  return task
    .findByPk(req.params.id)
    .then(taskid => {
      if (!taskid) {
        return res.status(400).send({
          message: 'Task Not Found',
        });
      }
      return taskid
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

// function durationDetails(req, res) {
//     task
//     .findByPk(req.params.id1)
//     .then(task => {
//       console.log(task.dataValues.duration)
//       log
//       .findAll({
//         attributes: 
//       })
//     })
// }

module.exports = {
  getTasks,
  newTask,
  specificTask,
  updateTask,
  deleteTask
  // durationDetails
}
