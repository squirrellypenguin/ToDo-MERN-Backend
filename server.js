// GET ENVIRONMENTAL VARIABLES
require("dotenv").config();

//GET PORT FROM ENV VARIABLES
const PORT = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./configs/cors.js");
// IMPORT DEPENDENCIES
//MONGO CONNECTION
const mongoose = require("./db/connection");

//CORS
// const corsOptions = require("./configs/cors.js");

//Bringing in Express
const express = require("express");
const app = express();

//OTHER IMPORTS
const morgan = require("morgan");
const todoRouter = require("./controllers/Todo");

////////////
//MIDDLEWARE
////////////
const NODE_ENV = "production" 
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); //logging
// app.use(cors())
///////////////
//Routes and Routers
//////////////

//Route for testing server is working
app.get("/", (req, res) => {
  res.json({ hello: "Servering" });
});

// Dog Routes send to dog router
app.use("/todo", todoRouter);

//LISTENER
app.listen(PORT, () => {
  console.log(`Your are listening on port ${PORT}`);
});