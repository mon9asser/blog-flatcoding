import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";
import Image from "next/image";
import siteLogo from "@/public/img/logo-white.webp";

var Sidebar = () => {
    return (
        <>
            <div className={styles['sidebar-mask']}></div>
            <sidebar className={styles['sidebar']}>
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