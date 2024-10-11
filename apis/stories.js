const express = require('express');
const { WebStories } = require('./../models/stories');
const {middlewareTokens} = require("./secure/middlewares")
var storiesRouter = express.Router();
const fs = require('fs');
const path = require('path');
const { Config } = require('../config/options');
const { Sets } = require('./../models/settings-model');
 
storiesRouter.get("/story/templates", middlewareTokens, async (req, res) => {

    try {
        const filePath = path.join(__dirname, '../story-img/options.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
        
            if (err) {
              console.error('Error reading the file:', err);
              return;
            }
            
            // Parse the JSON data
            const jsonData = JSON.parse(data);
            
            var templates = jsonData.layouts.map( x => {
                x.thumbnail = Config.site_api + '/story-img' + x.thumbnail;
                return x;
            });

            return res.send({
                data: templates,
                is_error: false,
                message: ''
            })
        });

    } catch (error) {
        return res.send({
            data: 'Can not read files',
            is_error: true,
            message: ''
        })
    }
    
      

    
})


storiesRouter.post("/story/create", middlewareTokens, async (req, res) => {
   
   try {
    const { id, title, description, meta_description, is_published, enable_search_engine, enable_besside_title, canonical, image_cover, meta_title, screens } = req.body;
    
    // Check if an id is provided
    if (id) {
      // Try to find the story by id
      let existingStory = await WebStories.findById(id);

      if (existingStory) {
        // If found, update the story
        existingStory.title = title || existingStory.title;
        existingStory.description = description || existingStory.description;
        existingStory.meta_description = meta_description || existingStory.meta_description;
        existingStory.is_published = typeof is_published === 'boolean' ? is_published : existingStory.is_published;
        existingStory.enable_search_engine = typeof enable_search_engine === 'boolean' ? enable_search_engine : existingStory.enable_search_engine;
        existingStory.enable_besside_title = typeof enable_besside_title === 'boolean' ? enable_besside_title : existingStory.enable_besside_title;
        existingStory.canonical = canonical || existingStory.canonical;
        existingStory.image_cover = image_cover || existingStory.image_cover;
        existingStory.meta_title = meta_title || existingStory.meta_title;
        existingStory.screens = screens || existingStory.screens;
        existingStory.date_updated = Date.now();

        // Save the updated story
        await existingStory.save();
        return res.status(200).json({
          is_error: false,
          message: "Story updated successfully",
          data: existingStory
        });
      }
    }

    // If no id is provided or the story doesn't exist, create a new one
    let newStory = new WebStories({
      title,
      description,
      meta_description,
      is_published,
      enable_search_engine,
      enable_besside_title,
      canonical,
      image_cover,
      meta_title,
      screens,
    });

    
    // Save the new story
    await newStory.save();
    return res.status(201).json({
      is_error: false,
      message: "Story created successfully",
      data: newStory
    });

  } catch (error) {
    console.error("Error creating/updating story:", error);
    return res.status(500).json({
      is_error: true,
      message: "Internal server error: " + error.message,
      data: []
    });
  }

})


storiesRouter.get("/story/get", async (req, res) => {

  try {
  
    const { slug } = req.query;
    var param = {};

    if (slug) {
      param = {
        slug
      }
    }  

    const story = await WebStories.find(param);
    let settings = await Sets.find({})
    if( settings && settings.length ) {
      settings = settings[0];
    }

    if (!story) {
      return res.send({
        is_error: true,
        message: "Story not found",
        data: []
      });
    }

    return res.send({
      is_error: false,
      message: "Story fetched successfully",
      data: {story, settings}
    });

  } catch (error) {

    return res.send({
      is_error: true,
      message: error.message || "Something went error!" ,
      data: []
    });

  }

});




module.exports = { storiesRouter };