const status = require('../models').traineeStatus

function getStatus(req, res) {
  //console.log(status);
  return status
    .findAll()
    .then((status) => {
      res.status(200).send(status)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newStatus(req, res) {
  status
    .build({
      userId: req.body.userId,
      moduleId: req.body.moduleId,
      taskId: req.body.taskId,
      status: req.body.status 
    })
    .save()
    .then((newStatus) => res.status(201).send(newStatus))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  getStatus,
  newStatus
}