const express = require("express");
const userData = require("./mock_data/index");
const app = express();

app.get("/api/users", (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  const slicedUsers = userData.users;

  res.json({
    users: slicedUsers,
    total: userData.total,
    skip: parseInt(skip),
    limit: parseInt(limit),
  });
});

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
