const express = require('express'); 
var compilerRouter = express.Router();


var {phpCompiler} = require("./compilers/php")


// compilers/php/run
compilerRouter.post("/php/run", phpCompiler);


module.exports = { compilerRouter }