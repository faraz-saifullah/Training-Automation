<<<<<<< fcdd90e7b95aa19f18ae3798d592d58ffce6b928
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
=======
<<<<<<< 1a34aa7d79b74ff9002b36a895e6190dc2c9369c
>>>>>>> Drift Handling Complete plus proper code formatting plus other  validations which came into picture
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
<<<<<<< fcdd90e7b95aa19f18ae3798d592d58ffce6b928
>>>>>>> Unfinished changes
=======
=======
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
>>>>>>> Drift Handling Complete plus proper code formatting plus other  validations which came into picture
>>>>>>> Drift Handling Complete plus proper code formatting plus other  validations which came into picture
