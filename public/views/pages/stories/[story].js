
import "@/app/globals.css";
import { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../../services/helper";
import Header from "./../../parts/header";
import Footer from "./../../parts/footer"; 
import { ServerOffline } from "./../../services/components";
import { useRouter } from 'next/router';
import Link from "next/link";


import Layout_1 from './../../components/layout-1';
import Layout_2 from "./../../components/layout-2";
import Layout_3 from "./../../components/layout-3";
import Layout_4 from "./../../components/layout-4";
import Layout_5 from "./../../components/layout-5";
import Layout_6 from './../../components/layout-6';
import Layout_7 from './../../components/layout-7';
import AdSense from './../../components/layout-8';

export const config = { amp: true }

export default function Story({ upcoming }) {
  console.log(upcoming);

  var {story} = upcoming;


  return (
    <>
      <Head>

        <meta charset="utf-8"/> 
        <title>{story?.meta_title}</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        
        
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
        <script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Anton" />
      </Head>

      {/* Only render AMP story after client-side hydration */}
      <amp-story
        standalone
        publisher="Example Publisher"
        publisher-logo-src="https://example.com/logo.png"
        poster-portrait-src="https://example.com/poster.jpg"
      >
        <Layout_1 />
      </amp-story>
    </>
  );
}

export async function getServerSideProps(context) {

  // getting data from database from here => story/get/:slug
  var {story} = context.params;
 

  var request = await Helper.sendRequest({  
      api: `story/get?slug=${story}`,
      method: "get",
      data: {}
  });

  if( request.status == 200) {
    
    var json = await request.json();  

 
    if( json.is_error || !json.data.story.length ) {
        return {
          notFound: true
        }
    } 
    
    var story = {};
    // working with story 
    if( json.data.story.length ) {
      story = json.data.story[0];
      var settings = json.data.settings;
       
      // attach beside title beside_post_title
      if( story.enable_besside_title && settings.beside_post_title != "" ) {
        story.meta_title = story.meta_title + " " + settings.beside_post_title; 
      }

    }

    
  }

  // Fetching data server-side
  const upcoming = {
    story
  };

  return {
    props: { upcoming }, // Pass this data to the page component
  };
}