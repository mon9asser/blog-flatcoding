import style from "@/app/styles.module.css";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SearchComponent} from '../services/components';


export default function Header({settings, menus}) {
    
    var sidebarRef = useRef();
    var sidebarContentRef = useRef();
    var maskRef = useRef();
    var closeSidebarRef = useRef();

    var { nav_left, nav_right } = menus;
    var site_url = settings.site_address;
     
    var sidebar_toggle = (e) => {
 
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        sidebar.style.display = "block";

        if (mask.style.display === 'none' || mask.style.display == "") { 
            
            mask.style.display = "block";
            setTimeout(() => {
                
                mask.classList.toggle(style.fade);  
                closeToggler.style.display = "block"; 
                asideContent.classList.add(style['active--aside']);

            }, 5);
        }

         // Prevent the default action of the event
         e.preventDefault(); 
    }

    var expand_collapse_item = (e, id) => {
        e.preventDefault();
        var doc_id = document.querySelector(`#collapsed-item-${id}`); 
        var anchor = document.querySelector(`#nav-anchor-${id}`); 

        if( doc_id.classList.contains(style.expanded) ) {
            anchor.classList.remove(style['expanded-a'])
            doc_id.classList.remove(style.expanded); 
        } else {
            doc_id.classList.add(style.expanded);
            anchor.classList.add(style['expanded-a'])
        }
        
    }

    var close_sidebar = (e) => {
        e.preventDefault();
        
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        mask.classList.toggle(style.fade);  
        closeToggler.style.display = "none";
        asideContent.classList.remove(style["active--aside"]);

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
            item = <span className={`${style.btn} ${style['third-btn']} ${style['radius-5']} ${style['custom-header-btn']}`}>{item_text}</span>
        } else if ( text.indexOf("[svg]") != -1) {
            var arr = text.split(']');
            var icon = arr[arr.length - 1];
            item = <span className={style.flexbox} dangerouslySetInnerHTML={{__html: icon}} />
        } else if ( text.indexOf("[burgericon]") != -1 ) {
            item = <span className={`${style['nav-toggler']} ${style['aside-toggler']} ${style['remove-anchor-paddings']}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        } 

        return item;

    }

    return(
        <> 
            <header className={`${style.wrapper} ${style['white-bg']} ${style['border-bottom']} ${style['plr-0']} ${style.sticky}`}>
            <nav className={`${style.flexbox} ${style['items-center']} ${style['offset-left']} ${style['offset-right']} ${style['plr-0']} ${style['max-1172']} ${style['default-height']}`}>
                    
                <aside ref={sidebarRef} className={`${style.aside} ${style['responsive-aside']}`}>

                    {/* Maske to fade in or our */}
                    <div ref={maskRef} className={`${style.mask} ${style.fade}`} onClick={close_sidebar}></div> 

                    {/* Close Button */}
                    <Link aria-label='Close Sidebar' ref={closeSidebarRef} className={`${style['close-toggler']} ${style['close-btn']}`} href='#' onClick={close_sidebar}></Link>

                    <div ref={sidebarContentRef} className={`${style['aside-content']} ${style['white-bg']}`} id="sidebar-content">
                    <div className={`${style.flexbox} ${style['items-center']} ${style['content-center']} ${style['site-logo-container']}`}>
                            {
                                settings != null && settings.site_logo != ""?
                                <Link aria-label='FlatCoding.com' className={`${style['site-logo']}`} href={site_url}>
                                    <Image src={settings.site_logo} alt="Logo Site" width="384" height="95" style={{ objectFit: 'contain' }} />
                                </Link>                              
                                : ""
                            }
                        </div>
                        
                        <div className={`${style.wrapper} ${style['side-wrapper']}`}>

                            <SearchComponent searchType='sidebar'/> 
                        </div>

                        <div className={`${style.wrapper} ${style['side-wrapper']}`}>
                        <ul className={`${style['block-list']} ${style['no-padding']}`}>
                            {
                                nav_left.map(x => { 
                                let _return = (
                                    <li key={x._id}>
                                    <Link aria-label={x.title} target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                        <ItemElement text={x.title} />
                                    </Link>
                                    </li>
                                );

                                if (x.subitems.length) {
                                    _return = (
                                    <li className={`${style['has-slideitem']}`} key={x._id}>
                                        <Link 
                                        id={`nav-anchor-${x._id}`} 
                                        onClick={(e) => expand_collapse_item(e, x._id)} 
                                        target={x.openInNewTab ? "_blank" : ""} 
                                        href={x.link}>
                                        <ItemElement text={x.title} />
                                        </Link>
                                        <ul className={`${style.slideitem} ${style.collapsible}`} id={`collapsed-item-${x._id}`}>
                                        {x.subitems.map(y => (
                                            <li key={y._id}>
                                            <Link aria-label={y.title} target={y.openInNewTab ? "_blank" : ""} href={y.link}>
                                                {y.title}
                                            </Link>
                                            </li>
                                        ))}
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

                    <header className={`${style.wrapper} ${style['white-bg']} ${style['border-bottom']} ${style['plr-0']} ${style.sticky}`}>
                        <nav className={`${style.flexbox} ${style['items-center']} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1172']} ${style['default-height']}`}>
                            {settings != null && settings?.site_logo != "" ? (
                            <Link aria-label={settings.site_name} href={site_url} className={`${style['site-logo']}`}>
                                <Image
                                alt={settings.site_name}
                                width="135"
                                height="36"
                                src={settings?.site_logo}
                                decoding="async"
                                priority={true}
                                />
                            </Link>
                            ) : (
                            ""
                            )}

                            <ul className={`${style['inline-list']} ${style['left-p-30']} ${style['main-nav']}`}>
                            {nav_left?.map(x => {
                                let _return = (
                                <li key={x._id}>
                                    <Link aria-label={x.title} target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                    <ItemElement text={x.title} />
                                    </Link>
                                </li>
                                );

                                if (x.subitems.length) {
                                _return = (
                                    <li className={`${style['has-subitem']}`} key={x._id}>
                                    <Link aria-label={'has sub item'} target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                        <ItemElement text={x.title} />
                                    </Link>
                                    <ul className={`${style.subitem}`}>
                                        {x.subitems.map(y => (
                                        <li key={y._id}>
                                            <Link aria-label={y.title} target={y.openInNewTab ? "_blank" : ""} href={y.link}>
                                            {y.title}
                                            </Link>
                                        </li>
                                        ))}
                                    </ul>
                                    </li>
                                );
                                }

                                return _return;
                            })}
                            </ul>

                            <ul className={`${style['inline-list']} ${style['left-p-30']} ${style['offset-right']} ${style['mlr--15']} ${style['update-html']}`}>
                            {nav_right.map(x => {
                                let _return = (
                                <li key={x._id}>
                                    <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                    <ItemElement text={x.title} />
                                    </Link>
                                </li>
                                );

                                // handling sidebar event
                                if (x.title.indexOf('[burgericon]') != -1) {
                                _return = (
                                    <li key={x._id}>
                                    <Link aria-label={x.title} href="#" onClick={sidebar_toggle}>
                                        <ItemElement text={x.title} />
                                    </Link>
                                    </li>
                                );
                                }

                                if (x.subitems.length) {
                                _return = (
                                    <li className={`${style['has-subitem']}`} key={x._id}>
                                    <Link aria-label={x.title} target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                        <ItemElement text={x.title} />
                                    </Link>
                                    <ul className={`${style.subitem}`}>
                                        {x.subitems.map(y => (
                                        <li key={y._id}>
                                            <Link aria-label={y.title} target={y.openInNewTab ? "_blank" : ""} href={y.link}>
                                            {y.title}
                                            </Link>
                                        </li>
                                        ))}
                                    </ul>
                                    </li>
                                );
                                }

                                return _return;
                            })}
                            </ul>
                        </nav>
                        </header>

                     
                </nav>
            </header>
        </>
    )

    return <b>Header</b>
}