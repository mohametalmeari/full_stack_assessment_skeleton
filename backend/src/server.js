require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");

const app = express();

const router = require("./router");

app.use(cors({ credentials: true }));
app.use(compression());
app.use(express.json());
app.use("/api", router());

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
