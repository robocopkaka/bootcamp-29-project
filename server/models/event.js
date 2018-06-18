module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed'],
      defaultValue: 'open'
    },
    guests: {
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId'
    });
    Event.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  };
  return Event;
};
