`use strict`;
const task = require('../models').task;
var Op = require('sequelize').Op;

async function nonDuplicateTask(id, name) {
  console.log(id);
  if(name != undefined && id != undefined) {
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
  } else if(id != undefined) {
    let tasks = await task.findAll({
      where : {
         id : id
      },
      attributes : ['id', 'name']
    })
    return typeof tasks !== 'undefined' && tasks.length > 0 ? tasks : "409";
  } else {
    let tasks = await task.findAll({
      where : {
         name : name
      },
      attributes : ['id', 'name']
    })
    return typeof tasks !== 'undefined' && tasks.length > 0 ? tasks : "409";
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