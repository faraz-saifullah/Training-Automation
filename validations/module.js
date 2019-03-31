`use strict`;
const mod = require('../models').module;

async function moduleExists(id) {
  let modules = await mod.findAll({
    raw: true,
    where : {
       id : id,
    },
    attributes : ['id', 'name', 'duration', 'tasksId']
  })
  return typeof modules !== 'undefined' && modules.length > 0 ? modules : "404";
}

module.exports = {
  moduleExists
}