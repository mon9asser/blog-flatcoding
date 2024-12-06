import "./../public/css/all.css";
import { Poppins } from 'next/font/google'; 
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});


export function reportWebVitals(metric) {
    console.log(metric);
}
  
export default function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <link rel="manifest" href="/icons/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="apple-touch-icon" href="/icons/logo192.png" /> 
            </Head>
            <Component className={poppins.className} {...pageProps} />
        </>
    );
    
}
  