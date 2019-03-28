'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {});
  task.associate = function (models) {
    task.belongsToMany(models.user, {
      through: 'userTask',
      as: { singular: 'task', plural: 'tasks' },
      foreignKey: 'taskId'
    }),
    task.belongsToMany(models.log, {
      through: 'taskLog',
      as: { singular: 'task', plural: 'tasks' },
      foreignKey: 'taskId'
    }),
    task.belongsToMany(models.module, {
      through: 'moduleTask',
      as: { singular: 'task', plural: 'tasks' },
      foreignKey: 'taskId'
    })
  };
  return task;
};