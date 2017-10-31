'use strict';

module.exports = {
  //function to run when (trying) to create the table (or make needed changes to it)
  up: function (queryInterface, Sequelize) {
    //define all columns in Tasks, including id, createdAt, and updatedAt as well as foreign keys (see ContextId)
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      done: {
        type: Sequelize.BOOLEAN
      },
      ContextId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Contexts',
          key: 'id'
        }
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
  //function to run when reverting the changes to the table
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  }
};
