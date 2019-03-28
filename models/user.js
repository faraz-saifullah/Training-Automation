'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    trainerId: DataTypes.INTEGER,
    joinDate: DataTypes.DATE,
    trainingDuration: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
      // user.hasOne(models.module, {
      //   as: 'modules',
      //   foreignKey: 'moduleId'
      // }),
      // user.hasOne(models.task, {
      //   as: 'tasks',
      //   foreignKey: 'taskId'
      // });
      user.belongsToMany(models.log, {
        through: 'userLog',
        as: { singular: 'user', plural: 'users' },
        foreignKey: 'userId'
      });
  };
  return user;
};