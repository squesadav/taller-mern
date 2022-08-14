const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user_id });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { noteName, content } = req.body;

  if (!noteName || !content) {
    res.status(400);
    throw new Error("All fields needs to be filled");
  } else {
    const note = new Note({ user: req.user._id, noteName, content });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteByID = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteName, content } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("This note does not belong to the logged user");
  }

  if (note) {
    note.noteName = noteName;
    note.content = content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("This note does not belong to the logged user");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNotes, getNoteByID, updateNote, deleteNote };
