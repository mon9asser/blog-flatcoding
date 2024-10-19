const express = require('express'); 
var compilerRouter = express.Router();


var {phpCompiler} = require("./compilers/php");
var {pythonCompiler} = require("./compilers/python");


// compilers/php/run
compilerRouter.post("/php/run", phpCompiler);
compilerRouter.post("/python/run", pythonCompiler);


module.exports = { compilerRouter }