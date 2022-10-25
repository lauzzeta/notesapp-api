const router = require("express").Router();
const controller = require("../controllers/auth.controllers");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signUp", controller.signUp);

router.post("/signIn", controller.signIn);

module.exports = router;
