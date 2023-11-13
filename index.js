const express = require("express");
// const userData = require("./mock_data/index");
const app = express();

const users = [];

app.get("/api/users", (_, res) => {
  res.json({
    users: users,
  });
});

// app.post("/api/users", (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.json(newUser);
// });

app.post("/api/users", async (req, res) => {
  try {
    const { username, email } = req.body;

    console.log(username, email);

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const newUser = users.push({ username, email });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
