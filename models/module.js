'use strict';
module.exports = (sequelize, DataTypes) => {
  const module = sequelize.define('module', {
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    tasksId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  module.associate = function(models) {
    module.belongsToMany(models.user, {
      through: 'userModule',
      as: { singular: 'module', plural: 'modules' },
      foreignKey: 'modulesId'
    }),
    module.belongsToMany(models.log, {
      through: 'moduleLog',
      as: { singular: 'log', plural: 'logs' },
      foreignKey: 'moduleId'
    }),
    module.belongsToMany(models.task, {
      through: 'moduleTask',
      as: { singular: 'module', plural: 'modules' },
      foreignKey: 'moduleId'
    })
  };
  return module;
};