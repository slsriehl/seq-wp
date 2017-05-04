'use strict';
module.exports = function(sequelize, DataTypes) {
  var Context = sequelize.define('Context', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Context;
};