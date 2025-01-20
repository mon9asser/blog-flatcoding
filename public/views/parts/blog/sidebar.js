
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
                        <li className={style['facebook']}>
                            <Link href={'#'}>
                                <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons['facebook']} />
                                <span>Facebook</span>
                            </Link>
                        </li>
                        <li className={style['email']}>
                            <Link href={'#'}>
                                <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons['email']} />
                                <span>Contact</span>
                            </Link>
                        </li> 
                    </ul>
                </div>
            </div>
            :''
        }

        {
            enable?.popular_posts ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Popular Posts</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['default-items']} ${style.ds} ${style['item-0']}`}>
                        <a
                            className={`${style['entry-image-wrap']} ${style['is-image']}`}
                            href="https://starter-pbt.blogspot.com/2021/07/google-correlate-best-seo-research-tool.html"
                            title="Google Correlate: The Best SEO Research Tool You Aren’t Using"
                        >
                            <span
                                className={`${style['entry-image']} ${style['pbt-lazy']}`}
                                data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                style={{
                                    backgroundImage:
                                        "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu)",
                                }}
                            ></span>
                        </a>
                        <div className={style['entry-header']}>
                            <h2 className={style['entry-title']}>
                                <a
                                    href="https://starter-pbt.blogspot.com/2021/07/google-correlate-best-seo-research-tool.html"
                                    title="Google Correlate: The Best SEO Research Tool You Aren’t Using"
                                >
                                    Google Correlate: The Best SEO Research Tool You Aren’t Using
                                </a>
                            </h2>
                            <div className={style['entry-meta']}>
                                <span className={style['entry-time']}>
                                    <time className={style.published} dateTime="2021-07-12T18:44:00Z">
                                        July 12, 2021
                                    </time>
                                </span>
                            </div>
                        </div>
                    </div> 
                </div>

            </div>
            :''
        }
        

        {
            enable?.categories ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Categories</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['cloud-label']} ${style.ds} ${style['item-0']}`}>
                        <ul className={`${style['cloud-categories']}`}>
                            <li><Link className={`${style['label-name']}`} href="#">JavaScript</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">Fushion</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">PHP</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">C++</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">C Sharp</Link></li> 
                        </ul>
                    </div> 
                </div>
            </div>
            :''
        }

        {
            enable?.tags ?
            <div className={style.widget}>
                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                    <h3 className={style.title}>Tags</h3>
                </div>
                <div className={style['widget-content']}>
                    <div className={`${style['cloud-label']} ${style.ds} ${style['item-0']}`}>
                        <ul className={`${style['cloud-style']}`}>
                            <li><Link className={`${style['label-name']}`} href="#">JavaScript</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">Fushion</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">PHP</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">C++</Link></li>
                            <li><Link className={`${style['label-name']}`} href="#">C Sharp</Link></li> 
                        </ul>
                    </div> 
                </div>
            </div>
            :''
        }
         
    </>;
}


export default BlogSidebarComponents;