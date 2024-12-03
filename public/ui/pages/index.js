
import { Helper } from "../services/helper.js";
import styles from "../public/css/index.module.css";

export default function Home({data}) {
    console.log(data);
    return (
      <div>
        <h1 className={styles['hljs-comment']}>Welcome to the Home Page</h1>
        <p>This is a simple Next.js app using the pages folder for routing.</p>
      </div>
    );
}

export async function getServerSideProps(context) {
  
  var request = await Helper.sendRequest({
      api: "home-page/get",
      method: "get",
      data: {} 
  });

  var json = await request.json(); 

 
   
  return {
    props: {
      data: json
    }
  }
}

 

/*

===============================
===> Head data
===============================
settings
  site_meta_title
  site_meta_description
  site_url 
  site_name
  site_thumbnail_url
  social_links
  site_logo

===============================
===> Header data
===============================
nav_left
nav_right

===============================
===> Ads Section Data 
===============================
homepage ads if any

===============================
===> Hero Section Data 
===============================
banner_image_url
title
description

===============================
===> Latest Tutorials Section ( just 6 tutorials and button for see more )
===============================
Title of latest tutorial 
subtitle of latest tutorial 
Link of tutorial
Name of tutorial 
Category of tutorial
svg of tutorial

===============================
===> Footer Data
===============================
company_links
follow_links
nav_links
*/