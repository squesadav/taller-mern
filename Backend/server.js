const express = require("express");
//Esto es para pruebas, eliminar después
const notes = require("./Data/notes");
///
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running...");
});

//Esto es para pruebas, eliminar después
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//Esto es para pruebas, eliminar después
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);

  res.send(note);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
