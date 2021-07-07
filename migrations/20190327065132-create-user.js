'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.STRING
			},
			trainerId: {
				type: Sequelize.INTEGER
			},
			joinDate: {
				type: Sequelize.DATE
			},
			trainingDuration: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
