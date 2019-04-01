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
		user.belongsToMany(models.module, {
				through: 'userModule',
				as: 'modules',
				foreignKey: 'userId'
			}),
			user.hasMany(models.log, {
				as: 'logs',
				foreignKey: 'userId'
			}),
			user.hasMany(models.traineeStatus, {
				as: 'traineeStatuses',
				foreignKey: 'userId'
			});
	};
	return user;
};
