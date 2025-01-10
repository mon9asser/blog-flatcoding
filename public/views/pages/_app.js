import { Poppins } from 'next/font/google';
//import "@/app/theme.css"; // Import your global styles
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps  }) {
   
  
 
 
  var settings = (pageProps.upcoming == undefined || pageProps == undefined) ? null: pageProps.upcoming.settings; 
  var [adsReady, setAdsReady] = useState(false);
  var [analyticsRead, setAnalyticsRead] = useState(false);
  var [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  
  var adsense_account = (settings != null && settings.google_ads.enabled) ? settings.google_ads.field: '';
  

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleLoad = () => {
      console.log('>>> Window loaded');
      setAnalyticsRead(true);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      handleLoad(); // Trigger immediately if already loaded
    } else {
      // Otherwise, listen for the load event
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }
}, []);



  return (
    <div className={poppins.className}>
          
        { 
          ( settings != null && settings.google_ads.enabled ) && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense_account}`}
              crossOrigin="anonymous" 
              strategy="afterInteractive"
              onLoad={() => {
                console.log('Ads are ready');
                setAdsReady(true);
              }}
            />
          )  
        }
        {
          ( settings != null && settings.google_analytics.enabled ) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`}
                strategy="afterInteractive"
                crossOrigin="anonymous" 
                onLoad={() => { 
                  setAnalyticsLoaded(true);
                }}
              />
            </>
          )
        }
        {
          // Google Analytics 
          (analyticsLoaded && analyticsRead && settings != null && settings.google_analytics.enabled) && (
            <> 
              <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${settings.google_analytics.field}');
                  `,
                }}
              />
            </>
          )
        }
        
        <Component {...pageProps} adsReady={adsReady} />
        <Head>
            <link rel="manifest" href="/assets/new/icons/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/assets/new/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/assets/new/icons/logo192.png" /> 
        </Head>
    </div>
  );
}



 