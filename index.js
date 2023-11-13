const express = require("express");
// const userData = require("./mock_data/index");
const app = express();

const users = [];

app.get("/api/users", (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  //   const slicedUsers = userData.users;
  res.json({
    users: users,
    total: users.total,
    skip: parseInt(skip),
    limit: parseInt(limit),
  });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
