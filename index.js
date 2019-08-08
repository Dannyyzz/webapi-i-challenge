// implement your API here

// Libraries
const express = require("express");
// Misc Files
const db = require("./data/db.js");
// Global Objects
const server = express();
//Middleware
server.use(express.json());

//should always be last
server.listen(1337, () => {
  console.log("Server is running on port 1337...");
});
