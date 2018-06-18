module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Category.associate = (models) => {
    Category.hasMany(models.Event, {
      foreignKey: 'categoryId',
      as: 'events'
    });
  };
  return Category;
};
