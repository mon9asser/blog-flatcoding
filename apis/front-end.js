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
const { escape } = require('validator');
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


// Homepage Data in Route: /
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
            data: [], 
            message: error.message || "Something went wrong",
        });

    }

    
     
});


// Tutorials Data in Route: /tutorials
frontendRouter.get("/front/tutorials/get", middlewareTokens, async (req, res) => {
    
    try {

        var tuts = await Tutorial.find({ "options.publish": true }).select('tutorial_title slug date_updated tutorial_svg_icon duration selected_category _id').sort({ _id: -1 }).lean(); 
        var ads = await AdCampaign.find({page:"all_tutorials_page", is_enabled: true});
        var settings = await Sets.find({}).sort({ _id: -1 }).limit(1);
        var menus = await Menus.find({});
        var user = await Usr.find({email: 'moun2030@gmail.com'});
        var post =  await Posts.find({ post_type: 1, slug: 'tutorials', is_published:true });
        if(post.length) {
            post = post[post.length - 1];
        }

        /* 
        -----------------------------------------------------------
        1. settings
        -----------------------------------------------------------*/

        var options = settings ? (settings.length ? settings[settings.length - 1]: {} ) : {}
        
        var slinks = user[0].social_links.map( x => `"${x.social_link}"`);

        // enable beside title 
        var beside_title = getValueFromObject(options, 'beside_post_title')
        var site_meta_title = getValueFromObject(post, 'meta_title');
        if( beside_title != '' ) {
            site_meta_title =site_meta_title + " "+ beside_title;
        }
         
        var site_options = {
            site_meta_title: site_meta_title,
            site_meta_description: getValueFromObject(post, 'meta_description'),
            site_url : getValueFromObject(options, 'site_address'), 
            site_name: getValueFromObject(options, 'site_name'),
            site_thumbnail_url: getValueFromObject(options, 'site_thumbnail_url'),
            social_links: slinks, 
            site_logo : getValueFromObject(options, 'site_logo'),
            beside_post_title: getValueFromObject(post, 'enable_beside_title'),
            google_ads: getValueFromObject(options, 'google_ads'),
            google_analytics: getValueFromObject(options, 'google_analytics'),
            header: getValueFromObject(options, 'header'),
            footer: getValueFromObject(options, 'footer'), 
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
        3. All Tutorials
        -----------------------------------------------------------*/
        var tutorials = tuts.map(x => {
            x.url = `${site_options.site_url}tutorials/${x.slug}/`;
            delete x.slug 

            return x;
        });

        
        post.blocks = [...post.blocks].map(x => {

            if( x.type == 'tutorialsList' ) {
                x.data.tutorials = tutorials.filter(y => y.selected_category.id == x.data.selectedValue)
            }

            return x;
        });

        var responseData = {
            ...site_options,

            company_nav_links,
            follow_nav_links,
            tags_nav_links,
            main_nav_right,
            main_menu, 
             
            sponsers: ads,
            post,
            // not compelted yet
            blog_latest_articles: []
        }
        
        res.send({
            is_error: false, 
            data: responseData, 
            message: 'fetched successfully!'
        });

    } catch(error) {
       
        return res.send({
            is_error: true, 
            data: [], 
            message: error.message || "Something went wrong",
        });
 
    }
    
});


// Tutorial Data in Route: /tutorials/:tutorial-slug 
frontendRouter.get("/front/tutorial/get", middlewareTokens, async (req, res) => {
    try {

        if( !req.query.tut_name ) {
            return res.send({
                is_error: true, 
                data: [],   
                message: "parameter required!",
            });
        }

        // secure user data 
        if (!/^[a-zA-Z0-9-_]+$/.test(req.query.tut_name)) {
            return res.send({
                is_error: true, 
                data: [], 
                status: 404,  
                message: "Invalid tutorial name!",
            });
        } 
        var tutorial_slug = escape(req.query.tut_name);

        // target tutorial
        var tutorial = await Tutorial.findOne({slug: tutorial_slug, "options.publish": true});
        var ads = await AdCampaign.find({ is_enabled: true, page: 'tutorial_page' });
        var settings = await Sets.find({}).sort({ _id: -1 }).limit(1);
        var menus = await Menus.find({});
        var user = await Usr.find({email: 'moun2030@gmail.com'});

        
        
        // menus 
        var company_nav_links= menus.filter(x => x.menu_name === 'company_nav_links');
        var follow_nav_links= menus.filter(x => x.menu_name === 'follow_nav_links');
        var tags_nav_links= menus.filter(x => x.menu_name === 'tags_nav_links');
        var main_nav_right= menus.filter(x => x.menu_name === 'main_nav_right');
        var main_menu = menus.filter(x => x.menu_name === 'main_menu');

        var response_data = {
            company_nav_links,
            follow_nav_links,
            tags_nav_links,
            main_nav_right,
            main_menu,  
            sponsers: ads,
            blog_latest_articles: []
        }

        if( tutorial == null ) {

            return res.send({
                is_error: true, 
                data: response_data, 
                status: 404,
                message: "Fetched Successfully!!",
            });

        }
        

        
        

        /* 
        -----------------------------------------------------------
        1. settings
        -----------------------------------------------------------*/

        var options = settings ? (settings.length ? settings[settings.length - 1]: {} ) : {}

        var slinks = user[0].social_links.map( x => `"${x.social_link}"`);

        // enable beside title 
        var beside_title = getValueFromObject(options, 'beside_post_title')
        var site_meta_title = getValueFromObject(tutorial, 'meta_title');
         
        if( beside_title != '' ) {
            site_meta_title =site_meta_title + " "+ beside_title;
        }

        var site_options = {
            site_meta_title: site_meta_title,
            site_meta_description: getValueFromObject(tutorial, 'meta_description'),
            site_url : getValueFromObject(options, 'site_address'), 
            site_name: getValueFromObject(options, 'site_name'),
            site_thumbnail_url: getValueFromObject(options, 'site_thumbnail_url'),
            social_links: slinks, 
            site_logo : getValueFromObject(options, 'site_logo'),
            beside_post_title: getValueFromObject(tutorial, 'enable_beside_title'),
            google_ads: getValueFromObject(options, 'google_ads'),
            google_analytics: getValueFromObject(options, 'google_analytics'),
            header: getValueFromObject(options, 'header'),
            footer: getValueFromObject(options, 'footer') 
        }; 

        if( site_options.site_url ) {
            site_options.site_url = site_options.site_url[site_options.site_url.length - 1] == '/' ? site_options.site_url: `${site_options.site_url}/`
        }
        
        
        
        
        var pst = await Posts.find({'tutorial.id': tutorial._id.toString(), "selected_tab._id": 'root', post_type: 0, is_published: true}).select('slug post_title');
        var posts = pst.map(post => {
            var p = {
                url: `${site_options.site_url}tutorials/${tutorial.slug}/${post.slug}/`,
                post_title: post.post_title 
            };

            return p;
        });

        var tabs_updated = [];
        if (tutorial.tabs && tutorial.tabs.length) {
            // tutorials/php-programming/t/
            tabs_updated = tutorial.tabs.map(x => {
                return {
                    title: x.title,
                    url: tutorial.slug.indexOf( 'https://' ) != -1? tutorial.slug :`${site_options.site_url}tutorials/${tutorial.slug}/t/${x.slug}/`  
                };
            }); 
        }
 

        tabs_updated = [
            {
                title: tutorial.tutorial_title,
                url: `${site_options.site_url}tutorials/${tutorial.slug}/` 
            }, 
            ...tabs_updated
        ]
        

        response_data = {
           tabs: tabs_updated, 
           posts , 
           tutorial,
            ...response_data, ...site_options}
        
        // get posts 
        return res.send({
            is_error: false, 
            data: response_data,
            message:  "Fetched Successfully!",
        })  

        
       
    } catch(error) {

        return res.send({
            is_error: true, 
            data:error.message, 
            message: error.message || "Something went wrong",
        });

    }
});
 
module.exports = { frontendRouter }