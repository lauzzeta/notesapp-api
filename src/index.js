const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 4000;

const app = express();
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

app.use(cors());
app.use(express.json());

app.use(require("./routes/notes.routes"));
app.use(require("./routes/folders.routes"));
app.use(require("./routes/auth.routes"));

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
