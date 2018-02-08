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
      defaultValue: './template/img/ramsey.jpg'
    },
    chairs: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    projector: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
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
