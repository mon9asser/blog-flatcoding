"use client"; 
import { useEffect, useRef } from "react"; 
export default function AdCompaignBox({ position, data, classes, settings }) {
 
  
  const adInitialized = useRef(false);

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';
  // if no ads in this section so return null 
  if( !data || !data.length ) {
    return null; 
  } 
    
  // Ad Position: searching for target ads according to section name
  const index = data.findIndex((x) => x.position === position );
   
  if (index === -1) {
    return null;
  }
  
  var adsbysite = data[index]; 
  
  // dont show ad if it is disabled 
  if( adsbysite.is_enabled == undefined || adsbysite.is_enabled === false ) {
    return null;
  }

  if(window == undefined ) {
    console.error("SSR is enabled, so client will not work!");
    return null; 
  }
  
  // allow data of code to be readable object 
  var sponsored = null; 
  try {
    sponsored = JSON.parse(adsbysite.code)
  } catch (error) {
    console.error(error)
    return null;
  }

  if( sponsored == null ) {
    console.error("No sponsor here!!")
    return null
  }

  // extract data from object 
  var {sponsor_data, sponsor_type} = sponsored;

  // sponor ads
  if( sponsor_type.toLowerCase() !== 'object' ) {
    return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: sponsor_data }} />;
  }

  // ===============> Working in Google AdSense Apps 

  // extract and convert css 
  var styles = {};
  if(sponsor_data.style) { 
    sponsor_data.style.split(';').forEach((item) => {
      const [property, value] = item.split(':');
      if (property && value) {
        const camelCaseProperty = property.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styles[camelCaseProperty] = value.trim();
      }
    });
  }

  delete sponsor_data.style; 

  // checking for data attribute start with slug 'data-'
  const dataAttributes = Object.keys(sponsor_data).reduce((acc, key) => {
    if (key.startsWith('data-')) {
      acc[key] = sponsor_data[key];
    }
    return acc;
  }, {});


  // ads by google 
  if( adsbygoogle == undefined ) {
    console.error("Google AdSense: Initialization Error")
    return null;
  }

  useEffect(() => {
    if (!adInitialized.current) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);
  


  // if current server is localhost so replace ids of adsense account to test 
  if( window.location.host.indexOf('localhost') != -1 ) {
    dataAttributes['data-ad-client'] = 'ca-pub-xxxxxxxxxxxxxxxx';
    dataAttributes['data-ad-slot'] = '123456';
  }
 
  // google ads
  return (
    <div className="">
      <ins
        className="adsbygoogle"
        style={styles}
        {...dataAttributes}
      ></ins>
    </div>
  );
    
 
}
 
