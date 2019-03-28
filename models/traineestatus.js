'use strict';
module.exports = (sequelize, DataTypes) => {
  const traineeStatus = sequelize.define('traineeStatus', {
    userId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  traineeStatus.associate = function(models) {
    // associations can be defined here
  };
  return traineeStatus;
};