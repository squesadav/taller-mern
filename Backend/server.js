const express = require("express");
//Esto es para pruebas, eliminar después
const notes = require("./data/notes");
///
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
