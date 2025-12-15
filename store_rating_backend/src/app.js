const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/owner", require("./routes/owner.routes"));

module.exports = app;