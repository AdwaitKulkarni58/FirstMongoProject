const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;

//making the connection to the middleware software, Mongoose
mongoose.connect("mongodb://localhost:27017/todolist");

//create a new schema, a blueprint to show how data is going to be represented in our database
const listSchema = new mongoose.Schema({
  name: String,
});

//on the basis of the schema, we create a model, an instance of the schema, just like a constructor in OOP
const Item = mongoose.model("Item", listSchema);

//Here we are creating new objects to be added to the no-sql database
const itemOne = new Item({ name: "One" });
const itemTwo = new Item({ name: "Two" });
const itemThree = new Item({ name: "Three" });

//We add the recently created items to an array in order to use the insertMany method
const itemList = [itemOne, itemTwo, itemThree];

//Add all the items created to the db, can also add individually. Takes 2 arguments, the items to be added and a callback function to show that the items have been added.
Item.insertMany(itemList, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Items saved successfully!");
  }
});

//This is used to delete one item, can use the deleteMany method to delete multiple items at one time.
Item.deleteOne({ name: "One" });

//The find method, used to find one particular item. Giving a blank object as the first argument means that we want to find everything in the database. Otherwise we specify a condition there. Second argument is a callback function that will be called to show the status of the query made.
Item.find({}, function (err, item) {
  if (err) {
    return err;
  } else {
    console.log(item);
  }
});

app.listen(PORT || process.env.PORT, function () {
  console.log("Server started!");
});
