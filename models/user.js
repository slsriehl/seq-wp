'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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
      associate: function(models) {
				User.hasMany(models.Context)
        // associations can be defined here
      }
    }
  });
  return User;
};
