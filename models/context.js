'use strict';
module.exports = function(sequelize, DataTypes) {
  var Context = sequelize.define('Context', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
				Context.hasMany(models.Task)
        Context.belongsTo(models.User, {
					foreignKey: 'UserId',
					onDelete: 'CASCADE'
				});
        // associations can be defined here
      }
    }
  });
  return Context;
};
