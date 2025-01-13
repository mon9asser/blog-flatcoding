

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
        // wp-json/wordpress-popular-posts/v1/popular-posts?range=last7days
        // wp-json/wp/v2/tags
        // wp-json/wp/v2/posts?per_page=6
        // => followers
        // => Header and Footer
        // => Head Tags
        // => JSON LD Tags
        var request = await Helper.sendWPRequest({
            api: "wp-json/wp/v2/tags",
            method: "get",
            data: {} 
        });
        
        if (!request.ok) {
            throw new Error('Server is offline');
        }
          
        var json = await request.json(); 
      
        return {
            props: {upcoming: json}
        }

    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}