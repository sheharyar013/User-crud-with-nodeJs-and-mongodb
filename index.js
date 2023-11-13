const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = [];

app.get("/api/users", (_, res) => {
  res.json({
    users: users,
  });
});

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
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
