"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("task", {
    key: { type: DataTypes.STRING(50), field: "task_key" },
    value: { type: DataTypes.STRING(120), field: "task_value" }
  }, {
    timestamps: false
  });

  return Task;
};
