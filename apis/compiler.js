//chapters/bulk_insert_update

const {middlewareTokens} = require("./secure/middlewares")

const mongoose = require('mongoose');
const express = require("express"); 
const  {Compiler} = require("./../models/compilers-model"); 

var compilerRouter = express.Router(); 
var path = require("path");
var fs = require("fs");



/**
 * Update + Insert to db
 */
compilerRouter.post('/compilers/update', async (req, res) => {

    try {

        const { id, title, meta_title, meta_description, description, slug, thumbnail_url, language, keyphrase, allow_search_engine, canonical, prevent_codes } = req.body;

        // Check if ID exists in the request
        let compiler;

        if (id) {
            // If ID exists, update the existing document
            compiler = await Compiler.findByIdAndUpdate(
                id,
                {
                    title,
                    meta_title,
                    meta_description,
                    description,
                    slug,
                    thumbnail_url,
                    language,
                    keyphrase,
                    allow_search_engine,
                    canonical,
                    prevent_codes
                },
                { new: true, runValidators: true } // Options to return the updated doc and run validation
            );
        } else {
            // If no ID, create a new document
            compiler = new Compiler({
                title,
                meta_title,
                meta_description,
                description,
                slug,
                thumbnail_url,
                language,
                keyphrase,
                allow_search_engine,
                canonical,
                prevent_codes
            });
            await compiler.save(); // Save the new document to the database
        }

        // Send response back to client
        res.status(200).json({
            data: compiler,
            is_error: false,
            message: 'Updated successfully',
        });

    } catch (error) {
        // In case of error, send an error response
        res.status(500).json({
            data: [],
            is_error: true,
            message: `Error: ${error.message}`,
        });
    }


})


/**
 * get all or get by slug  
 */
compilerRouter.get('/compilers/get', async (req, res) => {
    try {
        const { slug } = req.query; // Get the slug from the query string

        let compilers;

        if (slug) {
            // If slug is provided, find one compiler by slug
            const compiler = await Compiler.findOne({ slug: slug.trim() });

            if (compiler) {
                compilers = [compiler]; // Put the single compiler in an array
            } else {
                compilers = []; // Return an empty array if no compiler is found
            }
        } else {
            // If no slug is provided, return all compilers
            compilers = await Compiler.find({});
        }

        // Send response back to client with the compilers in an array
        res.status(200).json({
            data: compilers,
            is_error: false,
            message: 'Retrieved successfully',
        });

    } catch (error) {
        // In case of error, send an error response
        res.status(500).json({
            data: [],
            is_error: true,
            message: `Error: ${error.message}`,
        });
    }
});
 
/**
 * delete by id 
 */
compilerRouter.delete('/compilers/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters

        // Attempt to find and delete the document by ID
        const compiler = await Compiler.findByIdAndDelete(id);

        if (compiler) {
            // If the document is found and deleted, respond with success
            res.status(200).json({
                data: [],
                is_error: false,
                message: 'Deleted successfully'
            });
        } else {
            // If the document with the given ID is not found, respond with an error message
            res.status(404).json({
                data: [],
                is_error: true,
                message: 'Compiler not found'
            });
        }

    } catch (error) {
        // In case of error (like invalid ID format or server error), respond with an error message
        res.status(500).json({
            data: [],
            is_error: true,
            message: `Error: ${error.message}`
        });
    }
});
 


module.exports = { compilerRouter }

