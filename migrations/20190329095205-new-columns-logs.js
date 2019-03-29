'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'logs','userId',{
        type: Sequelize.INTEGER
      }
    ).then(() => {
      queryInterface.addColumn(
        'logs','moduleId',{
          type: Sequelize.INTEGER
        }
      )
    }).then(() => {
      queryInterface.addColumn(
        'logs', 'taskId', {
          type: Sequelize.INTEGER
        }
      )
    })

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('logs','userId')
      .then(() => {
        queryInterface.removeColumn('logs', 'moduleId')
      })
      .then(() => {
        queryInterface.removeColumn('logs', 'taskId')
      })

  }
};
