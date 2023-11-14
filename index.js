const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoURI = "mongodb://localhost:27017/Usersdb";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const User = mongoose.model("users", userSchema);

//get user from db
app.get("/api/users", async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post user to db
app.post("/api/users", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ error: "Username and email are required." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete user from db
app.delete("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, delete them from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update user from db
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Id is not defined" });
  }

  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Username and email are required!" });
  }

  let user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "User is not defined" });
  }

  user.username = username;
  user.email = email;

  user = await user.save();

  res.status(200).json({ message: "User updated successfully", user });
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
