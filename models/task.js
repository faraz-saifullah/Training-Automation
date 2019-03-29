'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {});
  task.associate = function (models) {
    task.belongsToMany(models.module, {
      through: 'moduleTask',
      as: {
        singular: 'task',
        plural: 'tasks'
      },
      foreignKey: 'taskId'
    }),
    task.hasMany(models.log, {
      as: { singular: 'log', plural: 'logs' },
      foreignKey: 'taskId'
    }),
    task.hasMany(models.traineeStatus, {
      as: 'traineeStatuses',
      foreignKey: 'taskId'
    })
  };
  return task;
};