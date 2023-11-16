const express = require("express");
const app = express();
const db = require("./configs/db");
const userRouter = require("./routers/userRouter");
const roleRouter = require("./routers/roleRouter");
const departmentRouter = require("./routers/departmentRouter");
const categoryRouter = require("./routers/categoryRouter");
const requestRouter = require("./routers/requestRouter");
const bodyParser = require("body-parser");

db.connectDB();
const port = 3030;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/department", departmentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/request", requestRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
