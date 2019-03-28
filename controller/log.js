const log = require('../models').log

function getLogs(req, res) {
  return log
    .findAll()
    .then((logs) => {
      res.status(200).send(logs)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function newLog(req, res) {
  log
    .build({
      entity: req.body.entity,
      status: req.body.status,
      time: req.body.time
    })
    .save()
    .then((newLog) => res.status(201).send(newLog))
    .catch((error) => res.status(400).send(error));
}

function specificLog(req, res) {
  return log
    .findByPk(req.params.id)
    .then((log) => {
      res.status(200).send(log)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function deleteLog(req, res) {
  return log
    .findByPk(req.params.id)
    .then(logid => {
      if (!logid) {
        return res.status(400).send({
          message: 'Log Not Found',
        });
      }
      return logid
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

module.exports = {
  getLogs,
  newLog,
  specificLog,
  deleteLog
}