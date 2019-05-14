'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn (
      'users', 'trelloId', {
        type: Sequelize.STRING
      }
    ).then(() => {
      queryInterface.addColumn(
        'users', 'trelloBoardId', {
          type: Sequelize.STRING
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
  }
};
