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
				as: {
					singular: 'user',
					plural: 'users'
				},
				foreignKey: 'moduleId'
			}),
			module.belongsToMany(models.task, {
				through: 'moduleTask',
				as: {
					singular: 'task',
					plural: 'tasks'
				},
				foreignKey: 'moduleId'
			}),
			module.hasMany(models.log, {
				as: 'logs',
				foreignKey: 'moduleId'
			}),
			module.hasMany(models.traineeStatus, {
				as: 'traineeStatuses',
				foreignKey: 'moduleId'
			})
	};
	return module;
};
