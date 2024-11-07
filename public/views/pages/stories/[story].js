
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


   const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "headline": `"${story?.meta_title}"`,
    "description": `"${story?.meta_description}"`,
    "image":  `"${story?.image_cover}"`,
    "author": {
      "@type": "Person",
      "name": "Montasser Mossallem"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlatCoding"
    },


    // ==> still here
    "datePublished": "2024-10-11",
    "mainEntityOfPage": "https://example.com/your-web-story",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://site.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Stories",
          "item": "https://site.com/stories"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Story",
          "item": "https://site.com/stories/story-slug-name"
        }
      ]
    }
  };

  return (
    <>
      <Head>

        <meta charset="utf-8"/> 
        <title>{story?.meta_title}</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={story?.meta_title}/>

        { story.amp_url != ""? <meta property="og:url" content={story.amp_url}/>:"" }
        { story.image_cover != ""? <meta property="og:image" content={story.image_cover}/>: "" }
        { story.site_name != ""? <meta property="og:site_name" content={story.site_name} />:""}
        { story.site_icon != ""? <link rel="icon" href={story.site_icon}/>: ""}

        <meta name="referrer" content="unsafe-url"/>
        <meta name="robots" content="max-image-preview:large"/>
        <meta property="og:description" content={story.meta_description} />
        <meta name="description" content={story.meta_description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
         
        <script async src="https://cdn.ampproject.org/v0.js"></script>  
        <script async="" custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
        <script async="" custom-element="amp-cache-url" src="https://cdn.ampproject.org/v0/amp-cache-url-0.1.js"></script>
        <script async="" custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <script async="" custom-element="amp-story-auto-ads" src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"></script>
        <script async="" custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
        <script async="" custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
        <script async="" custom-element="amp-story-auto-analytics" src="https://cdn.ampproject.org/v0/amp-story-auto-analytics-0.1.js"></script>
        <script async="" custom-element="amp-geo" src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"></script>
        <script async="" custom-element="amp-consent" src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Anton" />

        <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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

      var site_url = settings.site_address
      if(site_url) {
          var url_array = site_url.split('/');
          if( url_array[url_array.length - 1] != '' ) {
              site_url = site_url + '/';
          }
      } 

      // amp_url 
      story.amp_url = site_url == '' ? '': `${site_url}${story.slug}/`;
      story.site_name = settings.site_name;
      story.site_icon = settings.site_icon;
    }

    
  }

  console.log(story);

  // Fetching data server-side
  const upcoming = {
    story
  };

  return {
    props: { upcoming }, // Pass this data to the page component
  };
}