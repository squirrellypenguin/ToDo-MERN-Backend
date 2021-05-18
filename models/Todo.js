// Import Mongoose
const mongoose = require("mongoose");

// Pull Schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Place Schema
const todoSchema = new Schema({
    name: String,
    body: String,
    done: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Create our Model Object
const Todo = model("Todo", todoSchema);

// Export our Model Object
module.exports = Todo;