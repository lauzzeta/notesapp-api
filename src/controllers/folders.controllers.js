const controller = {};
const Folder = require("../models").folder;
const Note = require("../models").note;
const User = require("../models").user;

controller.getFolders = async (req, res, next) => {
  try {
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    const result = await Folder.findAll({ where: { user_id: userId } });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

controller.getFolderNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    const folder = await Folder.findOne({ where: { id, user_id: userId } });
    const name = folder.dataValues.name;
    const result = await Note.findAll({
      where: {
        folder_id: id,
        user_id: userId,
      },
    });
    res.send({ result, name });
  } catch (error) {
    next(error);
  }
};

controller.createFolder = async (req, res, next) => {
  try {
    const { name } = req.body;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    await Folder.create({
      name,
      user_id: userId,
    });
    res.send("creating");
  } catch (error) {
    next(error);
  }
};

controller.deleteFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    await Folder.destroy({ where: { id, user_id: userId } });
    res.send("deleted");
  } catch (error) {
    next(error);
  }
};

controller.updateFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    await Folder.update(
      {
        name,
      },
      {
        where: {
          id,
          user_id: userId,
        },
      }
    );
    res.send("updated");
  } catch (error) {
    next(error);
  }
};

module.exports = controller;
