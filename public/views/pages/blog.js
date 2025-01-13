

import "@/app/theme.css";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer"; 
import { ServerOffline } from "./../services/components";
import Script from "next/script";
import { 
    TutorialsContent
} from "./../services/components"; 


export default function Blog({upcoming}) {
    console.log(upcoming);
    return <b>Blog Page</b>;
}


export async function getServerSideProps(context) {
    try {
        // Define the requests
        const requests = [
            Helper.sendRequest({
                api: "tutorials-page/get?post_type=1&page_template=blog",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wordpress-popular-posts/v1/popular-posts?range=last7days",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wp/v2/tags",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wp/v2/posts?per_page=6",
                method: "get",
                data: {}
            })
        ];

        // Wait for all requests to resolve
        const responses = await Promise.all(requests);

        // Parse JSON from each response
        const data = await Promise.all(responses.map(response => response.json()));

        // site url 
        var settings = data[0].settings.length?data[0].settings[0]: {};
        if(settings.site_address) {
            var convertToArray = settings.site_address.split('/');
            if(convertToArray[convertToArray.length - 1 ] !== '/') {
                settings.site_address = `${settings.site_address}/`;
            }
        }
        
        var meta_title = settings.meta_title + ' ' + settings.beside_post_title;
        
        // prepare lists from menu  data:data[0].menus
       // var nav_left = json.menus?.filter( x=> x.menu_name === "main_menu")
        //var nav_right = json.menus?.filter( x=> x.menu_name === 'main_nav_right');
       // var company_links = json.menus?.filter( x=> x.menu_name === "company_nav_links")
        //var follow_links = json.menus?.filter( x=> x.menu_name === 'follow_nav_links');
        //var nav_links = json.menus?.filter( x=> x.menu_name === 'tags_nav_links');
         

        return {
            props: { upcoming: {data: settings}} 
        };

    } catch (error) {
        console.error("Error fetching data:", error);
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}
