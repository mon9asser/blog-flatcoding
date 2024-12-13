import { Helper } from "@/services/helper.js";
import Config from "@/services/config.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser'; 
import Image from "next/image.js";
import Header from "./../../parts/header.js";
import Footer from "./../../parts/footer.js"; 
import { useState, Fragment, createElement } from "react";
import Link from "next/link";
import Highlight from 'react-highlight'
import { AdCompaignBox } from "@/services/components.js";
 

export async function getServerSideProps(context) {
    
    
    try {
  
      var request = await Helper.sendRequest({
          api: `front/tutorial/get?tut_name=${context.params.tutorial}`,
          method: "get",
          data: {} 
      });
      
      if (!request.ok) {
        throw new Error('Server is offline');
      }
       
  
      if( request.status != 200) {
        throw new Error('Server is offline');
      }
  
      var json = await request.json(); 
      
      // page 404
      if( json.status && json.status == 404 ) {
        return {
            notFound: true,  
        };
      }
      

      return {
        props: {
          upcoming: json.data ? json.data: undefined
        }
      }
  
    } catch(error) {
      return { props: { error: 'Server is offline, please try again later.' } };
    }
  
  
}

export default function tutorial ({upcoming, adsReady}) {
     
      
    // server offline
    if( !upcoming || upcoming === undefined ) {
        return <ServerOffline/>
    }

    console.log(upcoming);
    
    return <b>Hello World !!</b>
}