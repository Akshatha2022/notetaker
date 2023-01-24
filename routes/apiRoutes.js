var db = require("../db.json");
var fs = require("fs");

// ROUTING

module.exports = function (app) {
  // API GET Request
  app.get("/api/notes", function (req, res) {
    console.log("I am here")
    // Read the db.json file and return all saved notes as JSON
    fs.readFile("../db.json", JSON.stringify(db), function () {
      res.json(db);
    });
    console.log(db);
    //fs.readFile()
    //res.json(db);
  });

  // API POST Request
  app.post("/api/notes", function (req, res) {
    // Receive a new note to save on the request body, add it to the db.json file
    db.push(req.body);
    // Add unique id to each note
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the new note to the client
    fs.writeFile("../db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });

  // // API DELETE Request
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    // Use splice to delete the selected note from the db array
    db.splice(id - 1, 1);
    // Reassign id for each note object
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the remaining notes to the client
    fs.writeFile("../db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });
};
