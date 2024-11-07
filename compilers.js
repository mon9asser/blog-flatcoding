const express = require('express'); 
var compilerRouter = express.Router();


var {phpCompiler} = require("./compilers/php");
var {pythonCompiler} = require("./compilers/python");
var {javascriptCompiler} = require("./compilers/javascript");

// compilers/php/run
compilerRouter.post("/php/run", phpCompiler);
compilerRouter.post("/python/run", pythonCompiler);
compilerRouter.post("/javascript/run", javascriptCompiler);


module.exports = { compilerRouter }