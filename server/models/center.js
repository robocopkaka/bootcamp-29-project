module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      default: '/template/img/ramsey.jpg'
    },
    chairs: {
      type: DataTypes.INTEGER,
      default: 0
    },
    projector: {
      type: DataTypes.INTEGER,
      default: 0
    },
  });

  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      as: 'events'
    });
    Center.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Center;
};
