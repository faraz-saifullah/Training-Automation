`use strict`;
const task = require('../models').task;
var Op = require('sequelize').Op;

async function nonDuplicateTask(id, name) {
  if(name != undefined) {
    let tasks = await task.findAll({
      raw : true,
      where : {
         id : {
          [Op.ne]: id
        },
         name : name
      }
    })
    return typeof tasks !== 'undefined' && tasks.length > 0 ? "409" : "200";
  } else {
    let tasks = await task.findAll({
      where : {
         id : id
      },
      attributes : ['id', 'name']
    })
    return typeof tasks !== 'undefined' && tasks.length > 0 ? user : "404";
  }
}

async function taskExists(id) {
  if(typeof id == `object`) {
    id = [...new Set(id)]
    let tasks = await task.findAll({
      raw: true,
      where : {
         id : {[Op.in] : id},
      },
      attributes : ['id', 'name', 'description', 'duration']
    })
    return typeof tasks !== 'undefined' && tasks.length == id.length ? tasks : "404";
  } else {
    let tasks = await task.findAll({
      raw: true,
      where : {
         id : id,
      },
      attributes : ['id', 'name', 'description', 'duration']
    })
    return typeof tasks !== 'undefined' && tasks.length > 0 ? tasks : "404";
  }
}

module.exports = {
  nonDuplicateTask,
  taskExists
}