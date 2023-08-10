const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path")


app.use("*", cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser())

dotenv.config({ path: './config.env' })
require('./db/conn')
app.use(express.json());
app.use(require("./router/auth"))


app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
    res.status(500).send(err);
  })
})

const PORT = process.env.port || 5000;









app.listen(PORT, () => {
  console.log(` port is running on ${PORT}`)
})