"use client";

import styles from "../public/css/index.module.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from "react";
import parse from 'html-react-parser';

function ServerOffline() {

    // => send request to 
    useEffect(() => {

      const logIssue = async () => {
        try {
          // Fetch user's location data
          const locationResponse = await fetch("https://ipapi.co/json/");
          const locationData = await locationResponse.json();
  
          // Prepare log details
          const logDetails = {
            issue: "Server is offline",
            timestamp: new Date().toISOString(),
            country: locationData.country_name || "Unknown",
            region: locationData.region || "Unknown",
            ip: locationData.ip || "Unknown",
          };
  
          // Send log details to the server
          await fetch("/api/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logDetails),
          });
        } catch (error) {
          console.error("Error logging issue:", error);
        }
      };
  
      logIssue();
      
    }, []);

    return (
      <>
        <Head>
          <title>500: Server Offline</title>
        </Head>
        <div className={styles['error-500']}>
          <h1>500</h1>
          <h2>Server Offline</h2>
          <p>The server is currently unavailable. We are aware of the issue and working to resolve it as quickly as possible.</p>
          <p>Please try refreshing the page or check back later. We appreciate your understanding!</p>
        </div>
      </>
    );
}
 
function SearchComponent ({searchType}) {
    
  var [query, setQuery] = useState('');
  var [is_pressed, setIsPressed] = useState(false);

  const router = useRouter();

  var sendRequest = (e) => {
      e.preventDefault(); 
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
        router.push(`/search?q=${query}`)
      }, 3000)
      
  }

  // seach components 
  var render = (
    <form className={styles['search-form']} style={{marginTop: '25px'}}>
        <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="What are you looking for?" />
        <button onClick={sendRequest} className={`${styles["btn"]} ${styles["third-btn"]} ${styles["radius-5"]} ${styles["custom-header-btn"]}`}>
          {is_pressed?<span className={styles['loader']}></span>: 'Search'}
        </button>
    </form>
  );

  // sidebar seach components 
  if( searchType == 'sidebar' ) {
    render = (
      <form className={styles["form-group"] + " " + styles["form-1"]} action="/" method="get">
          <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="Search in our tutorials" />
          <button onClick={sendRequest} type="submit">
              {is_pressed?<span className='loader black-loader'></span>: <span className="flexbox">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="7" className="stroke-color" stroke="#33363F" strokeWidth="2" />
                      <path d="M20 20L17 17" className="stroke-color" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                  </svg>
              </span>}
              
          </button>
      </form>
    );
  }

  return render;

}

function AdCompaignBox({position, data, isReady, classes}) {
  
  var combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';
  var adInitialized = useRef(false);

  if( !data || !data.length ) {
    return null; 
  } 

  const index = data.findIndex((x) => x.position === position );
  if(index == -1 ) {
    return null;
  }

  var adsbysite = data[index];

  if( adsbysite.is_enabled == undefined || adsbysite.is_enabled === false ) {
    return null;
  }

  // ---------------------------------------------
  // working with google adsense units
  // ---------------------------------------------
  var isAdsByAdsense = (adsbysite.code.indexOf('adsbygoogle') !== -1 && adsbysite.code.indexOf('</ins>') !== -1);
  useEffect(() => {
    if(isReady) {
      
      // check if ad is google adsense and window object 
      if(window && isAdsByAdsense ) {
        if (!adInitialized.current) {
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            adInitialized.current = true;
          } catch (err) {
            console.error("AdSense error:", err);
          }
        }
      }
    }
    
  }, [isReady]) ;

  if( isAdsByAdsense ) {
    
    const insRegex = /<ins\s+([^>]+)>/g;
    let insMatch = insRegex.exec(adsbysite.code);

    if (insMatch) {
        const insTagContent = insMatch[0]; // Full <ins> element 

        // Step 2: Extract attributes from the <ins> element
        const attributes = {};
        const attributeRegex =/([a-zA-Z0-9_-]+)=['"]([^'"]+)['"]/g;
        let attributeMatch;

        while ((attributeMatch = attributeRegex.exec(insTagContent)) !== null) {
            const attributeName = attributeMatch[1];
            const attributeValue = attributeMatch[2]; 
            attributes[attributeName] = attributeValue;
        } 

        
        // convert style from string to be object 
        if (attributes.style) {
          const styleObject = attributes.style.split(';').reduce((acc, stylePair) => {
              const [key, value] = stylePair.split(':').map(s => s.trim());
              if (key && value) {
                  const camelCaseKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
                  acc[camelCaseKey] = value;
              }
              return acc;
          }, {});
          attributes.style = styleObject; // Replace the style string with the object
      } 

      // => dont forget to convert 'class' to 'className' 
      if( attributes.class ) {
        attributes.className = attributes.class 
        delete attributes.class;
      }
      
      return <div className={combinedClasses}>
        <ins {...attributes}></ins>
      </div>
    } else {
        console.log("No <ins> element found in the string.");
    }
 
  }

  // check for other sponors
  return <div className={combinedClasses} dangerouslySetInnerHTML={{__html: adsbysite.code }}/>
} 

export {
    ServerOffline,
    SearchComponent,
    AdCompaignBox
}
