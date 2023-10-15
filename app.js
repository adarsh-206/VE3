const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect("mongodb://user:user@ac-9qzpedu-shard-00-00.s1peixs.mongodb.net:27017,ac-9qzpedu-shard-00-01.s1peixs.mongodb.net:27017,ac-9qzpedu-shard-00-02.s1peixs.mongodb.net:27017/?ssl=true&replicaSet=atlas-dpr11b-shard-0&authSource=admin&retryWrites=true&w=majority", err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// Static files
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
