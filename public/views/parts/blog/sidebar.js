
import style from "@/app/styles.module.css";
import StickyBox from "react-sticky-box";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../../services/helper";
import Header from "./../../parts/header";
import Footer from "./../../parts/footer"; 
import { ServerOffline } from "./../../services/components";
import Script from "next/script"; 
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from "./../../services/config"; 
import { SubscribeComponents } from "./../../services/components";
 /*
    enable.become_contributor;
    enable.follow_us;
    enable.popular_posts;
    enable.categories;
    enable.tags;
*/

var BlogSidebarComponents = ({menus, popular_posts, categories, tags, ads, enable}) => {
    
    var contributer_page_array = menus.company_links.filter( x => x.link.indexOf('write-for-us') !== -1 );
    var contributer_request_page = contributer_page_array.length?contributer_page_array[0]: {}

    var follow_us = menus.follow_links;
    

    return <>

        {
            (enable?.become_contributor && contributer_request_page?.link) ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Become a Contributor</h3>
                </div>
                <div className={style['widget-content']}>
                    <Link className={`${style.load_more} ${style.write_for_us}`} href={contributer_request_page?.link}>Submit an Article</Link>
                </div>
            </div>
            :''
        }
        
        {
            enable?.follow_us ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Follow Us</h3>
                </div>
                <div className={style['widget-content']}>
                    <ul className={`${style['social-icons']} ${style['social-bg']}`}>
                        {
                            follow_us?.map( (x, ind) => {
                                
                                var slug = Helper.generateSlugName(x.title);

                                return (
                                    <li key={ind} className={style[slug]}>
                                        <Link href={x.link}>
                                            <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons[slug]} />
                                            <span>{x.title}</span>
                                        </Link>
                                    </li> 
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
            :''
        }

        {
            (enable?.popular_posts && popular_posts.length) ?
                <div className={style.widget}>
                    <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                        <h3 className={style.title}>Popular Posts</h3>
                    </div>
                    <div className={style['widget-content']}>
                        {
                            popular_posts.map((x, k) =><div key={k} className={`${style['default-items']} ${style.ds} ${style['item-0']}`}>
                                <a
                                    className={`${style['entry-image-wrap']} ${style['is-image']}`}
                                    href={x.link}
                                    title={x.title}
                                >
                                    <span
                                        className={`${style['entry-image']} ${style['pbt-lazy']}`}
                                        style={{backgroundImage:`url(${x.thumbnail})`}}
                                    ></span>
                                </a>
                                <div className={style['entry-header']}>
                                    <h2 className={style['entry-title']}>
                                        <a
                                            href={x.link}
                                            title={x.title}
                                        >
                                            {x.title}
                                        </a>
                                    </h2>
                                    <div className={style['entry-meta']}>
                                        <span className={style['entry-time']}>
                                            <time className={style.published} dateTime={x.last_modified}>
                                                {Helper.formatDate(x.last_modified)}
                                            </time>
                                        </span>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            :''
        }
        
        {
            (enable?.categories && categories.length) ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Categories</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['cloud-label']} ${style.ds} ${style['item-0']}`}>
                        <ul className={`${style['cloud-categories']}`}>
                            {
                                categories.map(x => <li key={x.id}><Link className={`${style['label-name']}`} href={x.link}>{x.name}</Link></li>)
                            }
                        </ul>
                    </div> 
                </div>
            </div>
            :''
        }

            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Subscribe</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['cloud-label']} ${style.ds} ${style['item-0']}`}>
                        <SubscribeComponents isSmallBtn={true}/>
                    </div> 
                </div>
            </div>

        {
            (enable?.tags && tags.length) ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Tags</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['cloud-label']} ${style.ds} ${style['item-0']}`}>
                        <ul className={`${style['cloud-style']}`}>
                            {
                                tags.map(x => <li key={x.id}><Link className={`${style['label-name']}`} href={x.link}>{x.name}</Link></li>)
                            }
                        </ul>
                    </div> 
                </div>
            </div>
            :''
        }
         
    </>;
}


export default BlogSidebarComponents;