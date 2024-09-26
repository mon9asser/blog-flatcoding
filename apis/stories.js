const express = require('express');
const { WebStories } = require('./../models/stories');
const {middlewareTokens} = require("./secure/middlewares")
var storiesRouter = express.Router();
const fs = require('fs');
const path = require('path');
const { Config } = require('../config/options');
storiesRouter.get("/story/templates", async (req, res) => {

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


module.exports = { storiesRouter };