"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class folder extends Model {
    static associate(models) {
      folder.hasMany(models.note, {
        foreignKey: "folder_id",
      });
      folder.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  folder.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "folder",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return folder;
};
