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
 


export default function tutorial ({upcoming, adsReady}) {
    
    console.log(upcoming, adsReady);

    return <b>Hello World !!</b>
}