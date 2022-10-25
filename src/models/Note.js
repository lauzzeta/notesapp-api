"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    static associate(models) {
      note.belongsTo(models.folder, {
        foreignKey: "folder_id",
        targetKey: "id",
      });
      note.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  note.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      folder_id: DataTypes.UUID,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "note",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return note;
};
