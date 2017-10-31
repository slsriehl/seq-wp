'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    //define all columns except the automatically included ones (id, createdAt, updatedAt), and the foreign keys/associations.  We HAVE included id here because we've strayed from the default by making id DataType UUID
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      //define associations
      associate: function(models) {
        User.hasMany(models.Context, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};
