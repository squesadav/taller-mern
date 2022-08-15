const express = require("express");
const {
  getNotes,
  createNotes,
  getNoteByID,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(protect, getNoteByID)
  .put(protect, updateNote)
  .delete(protect, deleteNote);


module.exports = router;
