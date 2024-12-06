const mongoose = require('mongoose');
const express = require("express"); 
const  {Tutorial} = require("./../models/tutorial-model")
const  {Chapters} = require("./../models/chapter-model")
const  {Posts} = require("./../models/posts-model")
const {Sets} = require("./../models/settings-model");
const {Menus} = require("./../models/menus-model");
const {Usr} = require("./../models/user-model");
const {AdCampaign} = require("./../models/ad_campaign-model");
const {middlewareTokens} = require("./secure/middlewares")

var frontendRouter = express.Router(); 
var path = require("path");
var fs = require("fs");
 

function getValueFromObject(obj, path) {

    if (!obj || typeof obj !== 'object') {
        throw new Error("First argument must be an object.");
    }
    if (typeof path !== 'string') {
        throw new Error("Second argument must be a string.");
    }

    if(path!= '' && path.indexOf( '.' ) == -1 ) {
        return obj[path]?obj[path]: '';
    }

    return path.split('.').reduce((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return acc[key];
        }
        return ''; // Return undefined if the path cannot be resolved
    }, obj);
}


// Homepage Data 
frontendRouter.get("/front/home/get", middlewareTokens, async (req, res) => {
    
    try {
        
        var tutorials = await Tutorial.find({ "options.publish": true }).select('tutorial_title slug date_updated tutorial_svg_icon duration selected_category').sort({ _id: -1 }).limit(6).lean(); 
        // var posts = await Posts.find({is_published: true });
        var settings = await Sets.find({})
        var menus = await Menus.find({});
        var user = await Usr.find({email: 'moun2030@gmail.com'});
        var ads = await AdCampaign.find({page:"homepage", is_enabled: true});

    

        /* 
        -----------------------------------------------------------
        1. settings
        -----------------------------------------------------------*/

        var options = settings ? (settings.length ? settings[settings.length - 1]: {} ) : {}
        
        var slinks = user[0].social_links.map( x => `"${x.social_link}"`);

        // enable beside title 
        var beside_title = getValueFromObject(options, 'beside_post_title')
        var site_meta_title = getValueFromObject(options, 'site_meta_title');
        if( beside_title != '' ) {
            site_meta_title =site_meta_title + " "+ beside_title;
        }
        
        var site_options = {
            site_meta_title: site_meta_title,
            site_meta_description: getValueFromObject(options, 'site_meta_description'),
            site_url : getValueFromObject(options, 'site_address'), 
            site_name: getValueFromObject(options, 'site_name'),
            site_thumbnail_url: getValueFromObject(options, 'site_thumbnail_url'),
            social_links: slinks, 
            site_logo : getValueFromObject(options, 'site_logo'),
            beside_post_title: getValueFromObject(options, 'beside_post_title'),
            google_ads: getValueFromObject(options, 'google_ads'),
            google_analytics: getValueFromObject(options, 'google_analytics'),
            header: getValueFromObject(options, 'header'),
            footer: getValueFromObject(options, 'footer'),
            subscribe_title:getValueFromObject(options, 'subscribe_title'),
            subscribe_description:getValueFromObject(options, 'subscribe_description'),
            banner_image_url: getValueFromObject(options, 'banner_image_url'),
            banner_title: getValueFromObject(options, 'site_meta_title')
        }; 

        if( site_options.site_url ) {
            site_options.site_url = site_options.site_url[site_options.site_url.length - 1] == '/' ? site_options.site_url: `${site_options.site_url}/`
        } 

        /* 
        -----------------------------------------------------------
        2. Menus (  company_nav_links - follow_nav_links - tags_nav_links - main_nav_rightt - main_menu - )
        -----------------------------------------------------------*/
        var company_nav_links= menus.filter(x => x.menu_name === 'company_nav_links');
        var follow_nav_links= menus.filter(x => x.menu_name === 'follow_nav_links');
        var tags_nav_links= menus.filter(x => x.menu_name === 'tags_nav_links');
        var main_nav_right= menus.filter(x => x.menu_name === 'main_nav_right');
        var main_menu = menus.filter(x => x.menu_name === 'main_menu');

        /* 
        -----------------------------------------------------------
        3. Latest Tutorials Section
        -----------------------------------------------------------*/
        var latest_tuts = tutorials.map(x => {
            x.url = `${site_options.site_url}tutorials/${x.slug}/`;
            delete x.slug
            return x;
        });

        var latest_tutorials = {
            homepage_section_title: getValueFromObject(options, 'homepage_section_title'),
            homepage_section_description: getValueFromObject(options, 'homepage_section_description'),
            tutorials: latest_tuts
        };
        
        var responseData = {
            ...site_options,

            company_nav_links,
            follow_nav_links,
            tags_nav_links,
            main_nav_right,
            main_menu, 

            latest_tutorials,

            sponsers: ads,

            // not compelted yet
            blog_latest_articles: []
        }

        return res.send({
            is_error: false, 
            data: responseData, 
            message: "Fetched successfully!",
        });

    } catch (error) {

        return res.send({
            is_error: true, 
            data: responseData, 
            message: error.message || "Something went wrong",
        });

    }

    
     
})



 
module.exports = { frontendRouter }