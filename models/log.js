'use strict';
module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('log', {
    entity: DataTypes.STRING,
    status: DataTypes.STRING,
    time: DataTypes.DATE
  }, {});
  log.associate = function(models) {
    // log.hasOne(models.user, {
    //   as: 'user',
    //   foreignKey: 'userId'
    // }),
    // log.hasOne(models.task, {
    //   as: 'task',
    //   foreignKey: 'taskId'
    // }),
    // log.hasOne(models.module, {
    //   as: 'module',
    //   foreignKey: 'moduleId'
    // })
  };
  return log;
};