<<<<<<< 04ebb50c24841fcea5085e302925f85a1b49bb55
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
=======
<<<<<<< f2c9c936df2327a0d40e0cc9de129fa030ee0011
>>>>>>> Unfinished changes
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
<<<<<<< 04ebb50c24841fcea5085e302925f85a1b49bb55
>>>>>>> send email to new users, new column in logs, authorized api
=======
=======
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
>>>>>>> Unfinished changes
>>>>>>> Unfinished changes
