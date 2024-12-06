import "./../public/css/all.css";
import { Poppins } from 'next/font/google'; 
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
 

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});


export function reportWebVitals(metric) {
    console.log(metric);
}
  
export default function App({ Component, pageProps }) {
    
    var [adsReady, setAdsReady] = useState(false);

    return (
        <>
            {pageProps?.upcoming?.google_analytics?.enabled ? <GoogleAnalytics gaId={pageProps?.upcoming?.google_analytics?.field} /> : ''} 
            {pageProps?.upcoming?.google_ads?.enabled ? 
                <Script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pageProps?.upcoming?.google_ads?.field}`}
                    crossOrigin="anonymous" 
                    strategy="afterInteractive"
                    onLoad={() => {
                        console.log('Ads are ready');
                        setAdsReady(true);
                    }}
                />
            : ''}
            <Head>
                <link rel="manifest" href="/icons/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="apple-touch-icon" href="/icons/logo192.png" /> 
            </Head>
            <Component adsReady={adsReady} className={poppins.className} {...pageProps} />
        </>
    );
    
}
  