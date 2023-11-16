const express = require("express");
const app = express();
const db = require("./configs/db");
const userRouter = require("./routers/userRouter");
const roleRouter = require("./routers/roleRouter");

const port = 3030;

db.connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
