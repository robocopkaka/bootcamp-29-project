module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Centers', {
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
      capacity: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: '/template/img/ramsey.jpg'
      },
      chairs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      projector: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Centers');
  }
};
