'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('logs', 'trainerId', {
			type: Sequelize.INTEGER
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('logs', 'trainerId')
	}
};
