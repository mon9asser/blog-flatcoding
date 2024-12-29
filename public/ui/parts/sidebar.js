import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";
import Image from "next/image";
import siteLogo from "@/public/img/logo-white.webp";
import { useEffect, useRef, useState } from "react";

var Sidebar = () => {

    var [isOpen, setOpen] = useState(false);
    var [icon, setIcon] = useState('ti-menu-alt');

    var sidebarRef = useRef(null);
    var maskRef = useRef(null); 
    

    var closeSidebar = (e) => {
        e.preventDefault();
        setOpen(false);
        collapse_expand_sidebar(e);
    }

    var collapse_expand_sidebar = (e) => {
        e.preventDefault();
        
        // close open toggle 
        setOpen(!isOpen);

        // work with mask => ti-close
        if (maskRef.current) {
            if (isOpen) {
                maskRef.current.classList.remove(styles['open-mask']);
                sidebarRef.current.classList.remove(styles['open-sidebar']);
                setIcon('ti-menu-alt');
            } else {
                maskRef.current.classList.add(styles['open-mask']);
                sidebarRef.current.classList.add(styles['open-sidebar']);
                setIcon('ti-close');
            }
        }    
      
    }

   


    return (
        <>
            <div ref={maskRef} onClick={closeSidebar} className={`${styles['sidebar-mask']}`}></div>
            <sidebar ref={sidebarRef} className={styles['sidebar']}>
                
                <div className={styles['expand-sidebar']}>
                    <a onClick={collapse_expand_sidebar} href="">
                        <span className={`${icons[icon]}`}></span>
                    </a>
                </div>

                <a className={styles['dashboard-icon']}>
                    <Image 
                        alt={'FlatCoding'}
                        width="250" 
                        height="35" 
                        src={siteLogo}  
                        priority
                    /> 
                </a> 
                <ul>
                    <li>
                        <a> 
                            <i className={icons['ti-home']}></i>
                            <span>Dashboard</span>
                        </a>
                        <a> 
                            <i className={icons['ti-layout-list-post']}></i>
                            <span>Tutorials</span>
                        </a>
                        <a> 
                            <i className={icons['ti-layers']}></i>
                            <span>Articles</span>
                        </a>
                    </li>
                </ul>
            </sidebar>
        </>
    );
}

export {Sidebar}