const status = require('../models').traineestatus

function getStatus(req, res) {
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
  task
    .build({
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration
    })
    .save()
    .then((newTask) => res.status(201).send(newTask))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  getStatus,
  newStatus
}