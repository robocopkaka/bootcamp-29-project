module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['open', 'closed'],
      },
      guests: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      centerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Events');
  }
};
