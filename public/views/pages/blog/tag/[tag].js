import style from "@/app/styles.module.css";
import Link from "next/link";
import Head from "next/head";
import StickyBox from "react-sticky-box";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../../../services/helper";
import Header from "./../../../parts/header";
import Footer from "./../../../parts/footer"; 
import { ServerOffline } from "./../../../services/components";
import Script from "next/script";
import { 
    TutorialsContent
} from "./../../../services/components"; 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from "../../../services/config";

export default function Tag({upcoming}) {
    
    console.log(upcoming);

    var header_content = parse(upcoming.header);
    var footer_content = parse(upcoming.footer);
    var jsonLdContent =  '';

    var color = [
        '#d63031', '#6c5ce7', '#00b894', '#2d3436', '#182C61',
        '#182C61', '#82589F', '#6D214F', '#6ab04c', '#e056fd',
        '#30336b', '#0fb9b1', '#eb3b5a', '#778ca3', '#8854d0' 
    ];
    
    const getRandomColor = () => {
        var bg = color[Math.floor(Math.random() * color.length)];
        return {
            background: `${bg}`
        };
    };

    return <>
        <Head>
             
        </Head>

        <Header 
            settings={{
                site_address: upcoming.site_url,
                site_logo: upcoming.site_logo,
                site_name: upcoming.title
            }}
            menus={{
                nav_left: upcoming.menus.nav_left, 
                nav_right: upcoming.menus.nav_right
            }}
        />
        
        <div className={`${style.wrapper} ${style['smken-bg']} ${style['plr-0']}`}>
            
            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['pb-space-10']}`}>
                <header className={`${style.widget} ${style.remove_spaces}`}>
                    <div className={`${style["row"]}`} style={{ marginLeft: '-15px', marginRight: '-15px' }}>
                            <div
                                className={`${style["md-9"]} ${style["text-center"]} ${style["offset-left"]} ${style["offset-right"]} ${style["p-all-15"]} ${style["flexbox"]} ${style["content-center"]} ${style["column-direction"]} ${style["tutorial-header-block"]}`}
                            >
                                <h1 className={`${style["tutorial-headline"]}`}>JavaScript</h1>    
                            </div>
                    </div>
                </header> 
            </div>

            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['pt-space-10']}`}>
                <div className={`${style.row} ${style['mlr--15']}`}>
                    <div className={`${style['lg-8']} ${style['md-8']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                        <div id='posts-wrap'>
                            
                            <div className={style.blog_post_wrap}>
                                <div className={style['entry-header']}>
                                    <h2 className={style['entry-title']}>
                                        <Link href={'#'}>Google Correlate: The Best SEO Research Tool You Aren’t Using</Link>
                                    </h2>
                                    <div className={style['entry-meta']}>
                                        <ul className={`${style['entry-author']} ${style['category-label-meta']} ${style.mi}`}>
                                            <li>
                                                <Link style={getRandomColor()} href='#'>
                                                    JavaScript
                                                </Link>
                                            </li>
                                            <li>
                                                <Link style={getRandomColor()} href='#'>
                                                    PHP
                                                </Link>
                                            </li>
                                        </ul>

                                        <span className={`${style['entry-author']} ${style.mi}`}>
                                            <span className={`${style['by']} ${style['sp']}`}>by</span>
                                            <a className={`${style['author-name']}`}>John Doe</a>
                                        </span>
                                        <span className={style["entry-time mi"]}>
                                            <span className={style["sp"]}>•</span>
                                            <time className={style["published"]} dateTime="2021-07-12T18:44:00Z">July 12, 2021</time>
                                        </span>
                                        
                                    </div>
                                </div>
                                <div className={style['entry-content']}>
                                    <Link href={'#'} className={style['entry-image-wrap']}> 
                                        <span
                                            className={`${style['entry-thumbnail']} ${style['pbt-lazy']}`}
                                            data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                            style={{
                                                backgroundImage:
                                                    "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu)",
                                            }}
                                        ></span>
                                    </Link>
                                    <p className={`${style['entry-excerpt']}`}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                                    </p>
                                </div>
                            </div>

 
                        </div>

                        <div className={`${style.widget} ${style.remove_spaces}`}>
                            <a className={style.load_more}>Load More</a>
                        </div> 
                    </div>
                    <div className={`${style['lg-4']} ${style['md-4']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                        <StickyBox offsetTop={85} offsetBottom={20}>
                            <div className={style.widget}>
                                <div className={`${style['widget-title']} ${style['title-wrap']}`}>
                                    <h3 className={style.title}>Become a Contributor</h3>
                                </div>
                                <div className={style['widget-content']}>
                                    <Link className={`${style.load_more} ${style.write_for_us}`} href={'#'}>Submit an Article</Link>
                                </div>
                            </div>

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
                        </StickyBox>
                    </div>
                </div>
            </div>
        </div>

        <Footer 
            settings={{
                site_address: upcoming.site_url,
                site_logo: upcoming.site_logo,
                site_name: upcoming.title,

                subscribe_title: upcoming.subscribe_title,
                subscribe_description: upcoming.subscribe_description,

            }}
            menus={{
                company_links: upcoming.menus.company_links,
                follow_links: upcoming.menus.follow_links,
                nav_links: upcoming.menus.nav_links, 
            }}
        />

        {footer_content}
    </>
}

export async function getServerSideProps(context) {
    try {
        // Define the requests
        const requests = [
            Helper.sendRequest({
                api: "tutorials-page/get?post_type=1&page_template=blog",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/custom/v1/popular-posts", // "wp-json/wordpress-popular-posts/v1/popular-posts?range=last7days",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wp/v2/tags",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/custom/v1/latest-posts?tag=javascript&page_number=1",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wp/v2/settings",
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: "wp-json/wp/v2/categories",
                method: "get",
                data: {}
            }),
        ];

        // Wait for all requests to resolve
        const responses = await Promise.all(requests);

        // Parse JSON from each response
        const data = await Promise.all(responses.map(response => response.json()));

        // 1- Site Settings  
        var settings = data[0].settings.length?data[0].settings[0]: {};
        if(settings.site_address) {
            var convertToArray = settings.site_address.split('/');
            if(convertToArray[convertToArray.length - 1 ] !== '/') {
                settings.site_address = `${settings.site_address}/`;
            }
        }

        // 2- Blog Settings
        var blogsettings = data[4];
        var { 
            url,
            use_smilies,
            timezone,
            time_format,
            start_of_week,
            site_icon,
            site_logo,
            show_on_front,
            page_on_front,
            page_for_posts,
            description,
            language,email,default_post_format, default_ping_status,default_category,date_format,
            ...blog_settings} = blogsettings;


        var meta_title = blog_settings.title + ': ' + blog_settings.homepage_title;
        
        
        // prepare lists from menu  data:data[0].menus
        var nav_left = data[0].menus?.filter( x=> x.menu_name === "main_menu")
        var nav_right = data[0].menus?.filter( x=> x.menu_name === 'main_nav_right');
        var company_links = data[0].menus?.filter( x=> x.menu_name === "company_nav_links")
        var follow_links = data[0].menus?.filter( x=> x.menu_name === 'follow_nav_links');
        var nav_links = data[0].menus?.filter( x=> x.menu_name === 'tags_nav_links');
        
        // popular posts
        var popular_posts = data[1];
        
        // latest posts 
        var latest_posts = data[3];

        // tags 
        var tags = data[2].map(x => {
            x.link = `${settings.site_address}blog/tag/${x.slug}/`;
            return {
                id: x.id, 
                name: x.name, 
                link: x.link 
            };
        });

        // categories
        var categories = data[5].map(x => {
            x.link = `${settings.site_address}blog/category/${x.slug}/`;
            return {
                id: x.id, 
                name: x.name, 
                link: x.link 
            };
        });

        var upcoming = {
            
            // Settings
            meta_title,
            meta_description: description,
            default_comment_status: blog_settings.default_comment_status,
            posts_per_page: blog_settings.posts_per_page,
            title: blog_settings.title,
            site_logo: settings.site_logo,
            site_url: settings.site_address,
            google_analytics: settings.google_analytics,
            share_social_buttons: settings.share_social_buttons,
            subscribe_description:settings.subscribe_description,
            subscribe_title:settings.subscribe_title,

            footer: settings.footer,
            header: settings.header,
            google_ads: settings.google_ads,

            // Menus 
            menus: {
                nav_left,
                nav_right,
                company_links,
                follow_links,
                nav_links
            }, 

            // Popular Posts
            popular_posts,
            
            // Tags 
            tags, 

            // Categories
            categories, 

            // Latest posts 
            latest_posts
        };


        return {
            props: { upcoming } 
        };

    } catch (error) {
        console.error("Error fetching data:", error);
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}
