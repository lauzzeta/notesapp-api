const router = require("express").Router();
const controller = require("../controllers/folders.controllers");
const verifyToken = require("../middlewares/verifyToken");

router.get("/folders", verifyToken, controller.getFolders);

router.post("/folder", verifyToken, controller.createFolder);

router.get("/folder/:id", verifyToken, controller.getFolderNotes);

router.put("/folder/:id", verifyToken, controller.updateFolder);

router.delete("/folder/:id", verifyToken, controller.deleteFolder);

module.exports = router;
