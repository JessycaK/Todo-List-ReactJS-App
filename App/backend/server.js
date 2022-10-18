const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.send({ message: "Connected to Backend server!" });
});

//add new item to json file
app.post("/add/item", addItem);

function addItem(request, response) {
  // Converting Javascript object (Task Item) to a JSON string
  let id = request.body.jsonObject.id;
  let task = request.body.jsonObject.task;
  let curDate = request.body.jsonObject.currentDate;
  let dueDate = request.body.jsonObject.dueDate;
  var newTask = {
    ID: id,
    Task: task,
    Current_date: curDate,
    Due_date: dueDate,
  };
  const jsonString = JSON.stringify(newTask);

  var data = fs.readFileSync("database.json");
  var json = JSON.parse(data);
  json.push(newTask);
  fs.writeFile("database.json", JSON.stringify(json), function (err, result) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("Successfully wrote to file");
    }
  });
  response.send(200);
}

app.get("/get/items", getItems);
//** week5, get all items from the json database*/
function getItems(request, response) {
  var data = fs.readFileSync("database.json");
  response.json(JSON.parse(data));
}

app.get("/get/searchitem", searchItems);
//**week 5, search items service */
function searchItems(request, response) {
  var searchField = request.query.taskname;
  var json = JSON.parse(fs.readFileSync("database.json"));
  var returnData = json.filter((jsondata) => jsondata.Task === searchField);
  response.json(returnData);
}
