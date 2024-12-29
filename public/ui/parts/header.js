import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../public/css/index.module.css';
import {SearchComponent} from '../services/components';
 
// header_options, nav_left, nav_right
export default function Header({header_options, nav_left, nav_right}) {
     
    var sidebarRef = useRef();
    var sidebarContentRef = useRef();
    var maskRef = useRef();
    var closeSidebarRef = useRef();
    
    var site_url = header_options.site_url;
     
    var sidebar_toggle = (e) => {
 
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        sidebar.style.display = "block";

        if (mask.style.display === 'none' || mask.style.display == "") { 
            
            mask.style.display = "block";
            setTimeout(() => {
                
                mask.classList.toggle('fade');  
                closeToggler.style.display = "block"; 
                asideContent.classList.add("active--aside");

            }, 5);
        }

         // Prevent the default action of the event
         e.preventDefault(); 
    }

    var expand_collapse_item = (e, id) => {
        e.preventDefault();
        var doc_id = document.querySelector(`#collapsed-item-${id}`); 
        var anchor = document.querySelector(`#nav-anchor-${id}`); 
        
        if( doc_id.classList.contains('expanded') ) {
            anchor.classList.remove('expanded-a')
            doc_id.classList.remove('expanded'); 
        } else {
            doc_id.classList.add('expanded');
            anchor.classList.add('expanded-a')
        }
        
    }

    var close_sidebar = (e) => {
        e.preventDefault();
        
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        mask.classList.toggle('fade');  
        closeToggler.style.display = "none";
        asideContent.classList.remove("active--aside");

        setTimeout(() => {  
            mask.style.display = "none";
            sidebar.style.display = "none";
        }, 300);
    }
     
    var ItemElement = ({text}) => {
        
        var item = text;
        
        if(text.indexOf("[button]") != -1 ) {
            var arr = text.split(']');
            var item_text = arr[arr.length - 1].trim();
            item = <span className={`${styles["btn"]} ${styles["third-btn"]} ${styles["radius-5"]} ${styles["custom-header-btn"]}`}>{item_text}</span>
        } else if ( text.indexOf("[svg]") != -1) {
            var arr = text.split(']');
            var icon = arr[arr.length - 1];
            item = <span className={styles['flexbox']} dangerouslySetInnerHTML={{__html: icon}} />
        } else if ( text.indexOf("[burgericon]") != -1 ) {
            item = <span  className={`${styles["nav-toggler"]} ${styles["aside-toggler"]} ${styles["remove-anchor-paddings"]}`}><span></span><span></span><span></span></span>
        } 

        return item;

    }

    return(
        <> 
             <header className={styles["wrapper"] + " " + styles["white-bg"] + " " + styles["border-bottom"] + " " + styles["plr-0"] + " " + styles["sticky"]}>
                <nav className={`${styles["flexbox"]} ${styles["items-center"]} ${styles["offset-left"]} ${styles["offset-right"]} ${styles["plr-0"]} ${styles["max-1172"]} ${styles["default-height"]}`}>
                    
                    <aside ref={sidebarRef} className={`${styles["aside"]} ${styles["responsive-aside"]}`}> 

                    {/* Mask to fade in or out */}
                    <div ref={maskRef} className='mask fade' onClick={close_sidebar}></div> 

                    {/* Close Button */}
                    <Link ref={closeSidebarRef} className={`${styles["close-toggler"]} ${styles["close-btn"]}`} href='#' onClick={close_sidebar}></Link> 

                    <div ref={sidebarContentRef} className={styles["aside-content"] + " " + styles["white-bg"]} id="sidebar-content"> 
                        <div className={`${styles["flexbox"]} ${styles["items-center"]} ${styles["content-center"]} ${styles["site-logo-container"]}`}>
                        {
                            header_options != null && header_options.site_logo != "" ?
                            <Link className={styles["site-logo"]} href={site_url}><Image priority src={header_options.site_logo} alt="Logo Site" width="135" height="36" /></Link>
                            : ""
                        }
                        </div>
                        
                        <div className={styles["wrapper"] + " " + styles["side-wrapper"]}>
                        <SearchComponent searchType='sidebar'/> 
                        </div>

                        <div className={styles["wrapper"] + " " + styles["side-wrapper"]}>
                            <ul className={styles["block-list"] + " " + styles["no-padding"]}>
                                {
                                nav_left.map(x => { 
                                    var _return = <li key={x._id}><Link target={x.openInNewTab ? "_blank" : ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                    
                                    if(x.subitems.length) {
                                        _return = (
                                            <li className={'has-slideitem'} key={x._id}> 
                                                <Link id={`nav-anchor-${x._id}`} onClick={(e) => expand_collapse_item(e, x._id)} target={x.openInNewTab?"_blank": ""} href={x.link}><ItemElement text={x.title}/></Link>
                                                <ul className={`slideitem collapsible collapsed-item-${x._id}`} id={`collapsed-item-${x._id}`}>
                                                    {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab ? "_blank" : ""} href={y.link}>{y.title}</Link></li>)}
                                                </ul>
                                            </li>
                                        );
                                    }

                                    return _return;
                                })
                                }  
                            </ul>
                        </div>
                    </div>
                    </aside>

                    <header className={styles["wrapper"] + " " + styles["white-bg"] + " " + styles["border-bottom"] + " " + styles["plr-0"] + " " + styles["sticky"]}>
                        <nav className={`${styles["flexbox"]} ${styles["items-center"]} ${styles["offset-left"]} ${styles["offset-right"]} ${styles["plr-15"]} ${styles["max-1172"]} ${styles["default-height"]}`}>
                            
                            {
                            header_options != null && header_options?.site_logo != "" ?
                            <Link href={site_url} className={styles["site-logo"]}>
                                <Image 
                                alt={header_options.site_name}
                                width="135" 
                                height="36"
                                src={header_options?.site_logo}  
                                priority
                                /> 
                            </Link> : ""
                            }

                            <ul className={`${styles["inline-list"]} ${styles["left-p-30"]} ${styles["main-nav"]}`}>
                            {
                                nav_left?.map(x => { 
                                var _return = <li key={x._id}><Link target={x.openInNewTab ? "_blank" : ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                
                                if(x.subitems.length) {
                                    _return = (
                                    <li className={styles["has-subitem"]} key={x._id}> 
                                        <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                        <ItemElement text={x.title}/>
                                        </Link>
                                        <ul className={styles["subitem"]}>
                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab ? "_blank" : ""} href={y.link}>{y.title}</Link></li>)}
                                        </ul>
                                    </li>
                                    );
                                }

                                return _return;
                                })
                            }
                            </ul>

                            <ul className={`${styles["inline-list"]} ${styles["left-p-30"]} ${styles["offset-right"]} ${styles["mlr--15"]} ${styles["update-html"]}`}>
                            {
                                nav_right.map(x => { 
                                var _return = <li key={x._id}><Link target={x.openInNewTab ? "_blank" : ""} href={x.link}><ItemElement text={x.title}/></Link></li>;
                                
                                if(x.title.indexOf('[burgericon]') != -1) {
                                    _return = <li key={x._id}>
                                    <Link href='#' onClick={sidebar_toggle}>
                                        <ItemElement text={x.title}/>
                                    </Link>
                                    </li>;
                                }

                                if(x.subitems.length) {
                                    _return = (
                                    <li className={styles["has-subitem"]} key={x._id}> 
                                        <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                        <ItemElement text={x.title}/>
                                        </Link>
                                        <ul className={styles["subitem"]}>
                                        {x.subitems.map(y => <li key={y._id}><Link target={y.openInNewTab ? "_blank" : ""} href={y.link}>{y.title}</Link></li>)}
                                        </ul>
                                    </li>
                                    );
                                }

                                return _return;
                                })
                            }
                            </ul>
                        </nav>
                    </header>
                </nav>
                </header>

        </>
    )
    
}