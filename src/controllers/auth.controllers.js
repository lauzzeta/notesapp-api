const controller = {};
const User = require("../models").user;
const jwt = require("jsonwebtoken");

controller.signUp = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "email already exists",
      });
    }
    await User.create({
      name,
      email,
    });
    const token = jwt.sign({ email }, process.env.key, {
      expiresIn: "365d",
    });
    res.status(200).json({
      status: "ok",
      message: "user signed up successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

controller.signIn = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "email doesn't exists",
      });
    }
    const token = jwt.sign({ email }, process.env.key, {
      expiresIn: "365d",
    });
    const name = user.dataValues.name;
    res.status(200).json({
      status: "ok",
      message: "user logged in successfully",
      name,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = controller;
