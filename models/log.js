'use strict';
module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('log', {
    entity: DataTypes.STRING,
    status: DataTypes.STRING,
    time: DataTypes.DATE,
    trainerId: DataTypes.INTEGER
  }, {});
  log.associate = function(models) {
    log.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId'
    }),
    log.belongsTo(models.task, {
      as: 'task',
      foreignKey: 'taskId'
    }),
    log.belongsTo(models.module, {
      as: 'module',
      foreignKey: 'moduleId'
    })
  };
  return log;
};