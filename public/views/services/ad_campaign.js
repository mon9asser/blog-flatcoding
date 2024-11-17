"use client"; 
import { useEffect, useState } from "react"; 
export default function AdCompaignBox({ position, data, classes, settings }) {
 




  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';
    
  // if no ads in this section so return null 
  if( !data || !data.length ) {
    return null; 
  } 
   
  // Ad Position: searching for target ads according to section name
  const index = data.findIndex((x) => x.position === position);
  if (index === -1) {
    return null;
  }
  var adsbysite = data[index]; 

 
 
  
  adsbysite.is_requested = true; 
  
  if(window == undefined ) {
    console.error("SSR is enabled, so client will not work!");
    return null; 
  }
 
  // allow data of code to be readable object
  var campaignBox = adsbysite.code; 
  try {
    adsbysite.code = JSON.parse(campaignBox)
  } catch (error) {
    console.error(error)
    return null;
  }

  
  // dont show ad if it is disabled 
  if( adsbysite.is_enabled == undefined || adsbysite.is_enabled === false ) {
    return null;
  }
  
  

  // extract sponsers 
  var {sponsor_type, sponsor_data } = adsbysite.code;
  console.log(sponsor_data);

 
  console.log("Nooooooooooo++++");
  if( sponsor_type == undefined || sponsor_data == undefined ) {
    console.error("sponsor_type and sponsor_data are required to setup ad.")
    return null; 
  }
 
  console.log(sponsor_type, sponsor_data);
  
  // for ads by sponser sponsor_data

  


  // for google adsense
  if(adsbygoogle == undefined && adsbysite) {
    console.error("Google AdSense Error: Ads issue it will not appear");
    return null; 
  }
 

 
}
 
