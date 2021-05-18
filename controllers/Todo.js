// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Todo = require("../models/Todo");

// SEED DATA FOR SEED ROUTE
const todoSeed = [
  {
  name: "First Todo 1",
  body: "This is where text is stored",
  done: false }
];

// ROUTES (async, since database actions are asynchronous)

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Todo.remove({});
    // add the seed data to the database
    await Todo.create(todoSeed);
    // get full list of places to confirm seeding worked
    const todos = await Todo.find({});
    // return full list of places as JSON
    res.json(todos);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

//GET Route for ALL 
router.get("/", async (req, res) => {
  try {
  res.json(await Todo.find({}));
}
catch (error) {
  // return error as JSON with an error status
  res.status(400).json(error);
}
});

// CREATE Route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new place in the database
    const newTodo = await Todo.create(req.body);
    // send newly created place back as JSON
    res.json(newTodo);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing place in the database
    const updatedPlace = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated place back as JSON
    res.json(updatedPlace);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.delete("/:id", async (req, res) => {
  try {
    // delete existing place in the database
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    // send delete place back as JSON
    res.json(deletedTodo);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// export the router which has all our routes registered to it
module.exports = router;