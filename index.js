const express = require("express");
const cors = require("cors")

require('dotenv').config();
const router = require("./src/router");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router)

const PORT = 3001;
app.listen(PORT);