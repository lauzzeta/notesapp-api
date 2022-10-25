const controller = {};
const Note = require("../models").note;
const User = require("../models").user;

controller.getNotes = async (req, res, next) => {
  try {
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    const result = await Note.findAll({
      where: { folder_id: null, user_id: userId },
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

controller.createNote = async (req, res, next) => {
  try {
    const values = req.body;
    const title = values.note.title;
    const description = values.note.description;
    const folder_id = values.selected;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    await Note.create({
      title,
      description,
      folder_id,
      user_id: userId,
    });
    res.send("creating");
  } catch (error) {
    next(error);
  }
};

controller.getSingleNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    const note = await Note.findOne({ where: { id, user_id: userId } });
    res.send(note);
  } catch (error) {
    next(error);
  }
};

controller.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    const note = await Note.destroy({ where: { id, user_id: userId } });
    res.send("deleted");
  } catch (error) {
    next(error);
  }
};

controller.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const values = req.body;
    const title = values.note.title;
    const description = values.note.description;
    const folder_id = values.selected;
    const email = req.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const userId = user.dataValues.id;
    await Note.update(
      {
        title,
        description,
        folder_id,
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
