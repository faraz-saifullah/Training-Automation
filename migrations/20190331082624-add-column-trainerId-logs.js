<<<<<<< d6072fa589abaae0bf1271c1626399e347b2f551
'use strict'; 
module.exports = { 
	up: (queryInterface, Sequelize) => { 
		return queryInterface.addColumn( 'logs', 'trainerId', {
		 type: Sequelize.INTEGER 
		})}, 
	down: (queryInterface, Sequelize) => { 
		return queryInterface.removeColumn('logs','trainerId') 
	} 
};
=======
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'logs', 'trainerId', {
        type: Sequelize.INTEGER
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('logs','trainerId')
  }
};
>>>>>>> send email to new users, new column in logs, authorized api
