// REQUIREMENTS //
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    _ = require("underscore");

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));
// use ejs for view engine
app.set('view engine', 'ejs');

// DATA //
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
];

// ROUTES //
app.get("/", function (req, res){
  // render an index html page with ejs (it will look in the views folder)
  // pass in the foods
  res.render('index', {foodItems: foods});
});

// foods index path
app.get("/foods", function (req, res){
  // render foods index as JSON
  console.log("FOODS", foods)
  res.json(foods);
});

app.post("/foods", function (req, res){
  var newFood = req.body;
  // add a unique id
  newFood.id = foods[foods.length - 1].id + 1;
  // add new food to DB (array, really...)
  foods.push(newFood);
  // send a response with newly created object
  res.json(newFood);
});

app.delete("/foods/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id, 10);
  // find item in the array matching the id
  var targetItem = _.findWhere(foods, {id: targetId});
  // get the index of the found item
  var index = foods.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  // render deleted object
  res.json(targetItem);
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});