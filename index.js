// implement your API here

// Libraries
const express = require("express");
// Misc Files
const db = require("./data/db.js");
// Global Objects
const server = express();
//Middleware
server.use(express.json());

//request handlers
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }

  db.insert({ name, bio })
    .then(({ id }) => {
      db.findById(id)
        .then(user => {
          res.status(201).json({
            user
          });
        })
        .catch(() => {
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

//should always be last
server.listen(1337, () => {
  console.log("Server is running on port 1337...");
});
