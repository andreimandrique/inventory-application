const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/indexRouter");
const addRounter = require("./routes/addRouter");
const viewRouter = require("./routes/viewRouter");
const updateRouter = require("./routes/updateRouter");
const deleteRouter = require("./routes/deleteRouter");

app.use("/", indexRouter);
app.use("/add", addRounter);
app.use("/view", viewRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
