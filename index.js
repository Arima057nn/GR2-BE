const express = require("express");
const app = express();
const db = require("./configs/db");
const port = 3030;

db.connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
