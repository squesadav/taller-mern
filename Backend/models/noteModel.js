const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    noteName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: isContentRequired
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

function isContentRequired() {
  return typeof this.content !== "string";
}

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
