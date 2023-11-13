const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

var users = [];

//user listing

app.get("/api/users", (_, res) => {
  res.json({
    users: users,
  });
});

//create user

app.post("/api/users", (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ error: "Username and email are required." });
    }

    const newUser = {
      id: users.length + 1,
      username,
      email,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//delete user by id

app.delete("/api/user/:id", (req, res) => {
  try {
    let userId = parseInt(req.params.id, 10);

    let userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users = users.filter((user) => user.id !== userId);

    res.status(200).json({ message: "User is deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
