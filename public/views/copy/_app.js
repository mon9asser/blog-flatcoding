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
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLocalhost(window.location.hostname === 'localhost');
    }
  }, []);
 
  var adsense_account = (settings != null && settings.google_ads.enabled) ? settings.google_ads.field: '';
  
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
          // Google Analytics 
          (settings != null && settings.google_analytics.enabled) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`}
                strategy="afterInteractive"
                crossOrigin="anonymous" 
                
              />

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
            <link rel="manifest" href="/icons/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/logo192.png" /> 
        </Head>
    </div>
  );
}



 