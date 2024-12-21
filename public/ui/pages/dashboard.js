
import { useEffect } from "react";
import Link from 'next/link';
import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";
  
import { Helper } from "../services/helper";
import Cookies from "js-cookie";
import Image from "next/image";
import siteLogo from "./../public/img/logo-white.webp";
import { Sidebar } from "@/parts/sidebar";
export default function () {

    useEffect(() => {
        console.log(Cookies.get(Helper.user_cookie));
       // Cookies.get(Helper.user_cookie);
       // Cookies.remove(Helper.user_cookie);

    }, [])

    return (
        <>

           <Sidebar/>

           <header className={`${styles['header']}`}>
                <nav className={`${styles['wrapper']} ${styles['flexbox']}`}>
                    Hello this is
                </nav>
           </header>

           <section className={styles['wrapper']}>
                Section !!
           </section>
        </>
    );

}



/* 
    
*/