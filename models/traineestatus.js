'use strict';
module.exports = (sequelize, DataTypes) => {
	const traineeStatus = sequelize.define('traineeStatus', {
		userId: DataTypes.INTEGER,
		moduleId: DataTypes.INTEGER,
		taskId: DataTypes.INTEGER,
		status: DataTypes.STRING
	}, {
		timestamps: false
	});
	traineeStatus.associate = function(models) {
		traineeStatus.belongsTo(models.user, {
				as: 'user',
				foreignKey: 'userId'
			}),
			traineeStatus.belongsTo(models.task, {
				as: 'task',
				foreignKey: 'taskId'
			}),
			traineeStatus.belongsTo(models.module, {
				as: 'module',
				foreignKey: 'moduleId'
			})
	};
	return traineeStatus;
};
