const express = require("express");

const app = express();

const dbconfig = require('./db')

// create the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} :)`));