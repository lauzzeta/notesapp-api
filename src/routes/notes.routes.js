const router = require("express").Router();
const controller = require("../controllers/notes.controllers");
const verifyToken = require("../middlewares/verifyToken");

router.get("/notes", verifyToken, controller.getNotes);

router.post("/notes", verifyToken, controller.createNote);

router.put("/notes/:id", verifyToken, controller.updateNote);

router.delete("/notes/:id", verifyToken, controller.deleteNote);

router.get("/notes/:id", verifyToken, controller.getSingleNote);

module.exports = router;
