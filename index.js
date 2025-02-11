const express = require("express");
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3001;
app.listen(PORT);