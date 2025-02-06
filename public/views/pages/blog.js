


// import style from "@/app/styles.module.css";
// import "@/app/theme.css";
import { useEffect, useState } from "react";
import style from "@/app/styles.module.css";
import StickyBox from "react-sticky-box";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import Script from "next/script"; 
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dynamic from 'next/dynamic';

// Import dynamically for non-critical components
const Header = dynamic(() => import("./../parts/header"));
const Footer = dynamic(() => import("./../parts/footer"));
const BlogSidebarComponents = dynamic(() => import("../parts/blog/sidebar"));
const ServerOffline = dynamic(() => import("./../services/components"));

// Keep Config and Helper as direct imports if they are critical
import { Helper } from "./../services/helper";
import Config from "../services/config";

export default function Blog({upcoming}) {
     
    if(!upcoming) {
        return <ServerOffline/>
    }

    var [paging, setPaging] = useState({
        current_page: 0, 
        total_pages: -1,
        total_posts: -1,
        posts: []
    });

    var [userNeedsToLoadMore, setUserNeedsToLoadMore] = useState(false); 
    var [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        
        // store current paging  
        if(upcoming.latest_posts && ! upcoming.latest_posts.is_error) {           
            if( upcoming.latest_posts.data.pagination ) { 
                setPaging({
                    ...upcoming.latest_posts.data.pagination, 
                    posts: upcoming.latest_posts.data.posts                    
                });
            }
        } 

    }, [upcoming]);
    
    var header_content = parse(upcoming.header);
    var footer_content = parse(upcoming.footer);
    var jsonLdContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${upcoming.site_url}blog/`
        },
        "headline": upcoming.meta_title,
        "description": upcoming.meta_description,
    
        "author": {
            "@type": "Person",
            "name": "Montasser Mossallem" // Replace with the author name
        },
        "publisher": {
            "@type": "Organization",
            "name": upcoming.title, // Replace with the publisher name
            "logo": {
                "@type": "ImageObject",
                "url": upcoming.site_logo // Ensure this is a valid URL to your site's logo
            }
        },
        "breadcrumb": {
        "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${upcoming.site_url}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": `${upcoming.site_url}blog/`
                } 
            ]
        }
    });

    // load more posts
    var load_more_posts = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUserNeedsToLoadMore(true);
        var current_page    = paging.current_page,
            total_pages     = paging.total_pages;
                  
        if(current_page <= total_pages) {
            current_page++; 
        }

        ///api/latest_posts/?page_number=4
        var latest_request = await Helper.sendNTRequest({
            api: `latest_posts?page_number=${current_page}`,
            method: "get",
            data: {}
        });

        var response = await latest_request.json();
        
        // Something went wrong (Show message)
        if(response.is_error) {
            setIsLoading(false);
            return;
        }

        var pagination = response.data.pagination;
        var posts = response.data.posts;
        setPaging({
            ...pagination,
            posts: [...paging.posts, ...posts]
        });
        setIsLoading(false);

    }

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
    //const getColorForIndex = (index) => color[index % color.length];

    return <>
        <Head>
            <title>{upcoming.meta_title}</title>
            <meta name="description" content={upcoming.meta_description} />            
            <link rel="canonical" href={`${upcoming.site_url}blog/`}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={upcoming.meta_title}/>
            <meta property="og:description" content={upcoming.meta_description}/>
            <meta property="og:url" content={`${upcoming.site_url}blog/`}/>
            <meta property="og:site_name" content={upcoming.title}/>  
            <meta name="twitter:card" content="summary_large_image"/>  
            <script
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: jsonLdContent }}
            />
            {header_content}  
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
            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']}`}>
                <div className={`${style.row} ${style['mlr--15']}`}>
                    
                    <div className={`${style['lg-8']} ${style['md-8']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                        <div id='posts-wrap'>
                            
                            {
                                !upcoming.latest_posts.data.posts.length ? '' : (
                                    (userNeedsToLoadMore ? paging.posts: upcoming.latest_posts.data.posts).map((post, k) => {
                                         
                                        return (
                                            <div key={post.id + k} className={style.blog_post_wrap}>
                                                <div className={style['entry-header']}>
                                                    <h2 className={style['entry-title']}>
                                                        <Link href={post.link}>{post.title}</Link>
                                                    </h2>
                                                    <div className={style['entry-meta']}>
                                                        <ul className={`${style['entry-author']} ${style['category-label-meta']} ${style.mi}`}>
                                                            {
                                                                !post.tags.length ? '':post.tags.map((x, k) =>{

                                                                    return <li key={x.id}><Link style={getRandomColor()} href={x.url}>{x.name}</Link></li>
                                                                })
                                                            } 
                                                        </ul>

                                                        <span className={`${style['entry-author']} ${style.mi}`}>
                                                            <span className={`${style['by']} ${style['sp']}`}>by</span>
                                                            <Link href={post.author.url} className={`${style['author-name']}`}>{Helper.UppercaseName(post.author.name)}</Link>
                                                        </span>
                                                        <span className={style["entry-time mi"]}>
                                                            <span className={style["sp"]}>•</span>
                                                            <time className={style["published"]} dateTime={post.last_modified}>{Helper.formatDate(post.last_modified)}</time>
                                                        </span>
                                                        
                                                    </div>
                                                </div>
                                                <div className={style['entry-content']}>
                                                    <Link href={post.link} className={style['entry-image-wrap']}> 
                                                        {/*<span
                                                            className={`${style['entry-thumbnail']} ${style['pbt-lazy']}`}
                                                            style={{ backgroundImage: `url(${post.thumbnail})`}}
                                                        ></span> */}
                                                        <Image
                                                            src={post.thumbnail}
                                                            alt={post.title}
                                                            style={{ objectFit: 'cover' }} // Replace `objectFit="cover"` with inline styles
                                                            priority
                                                            fill 
                                                            decoding="async"
                                                        />
                                                    </Link>
                                                    <p className={`${style['entry-excerpt']}`}>{post.excerpt}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )
                            }
 
                        </div>

                        <div className={`${style.widget} ${style.remove_spaces}`}>
                            {
                                paging.current_page == paging.total_pages ? <span>No more posts found!</span>: <Link href={'#'} onClick={load_more_posts} className={style.load_more + ' ' + style.btn_load_more}>
                                    {isLoading? <span className={style.loader}></span>: 'Load More'}
                                </Link>
                            }
                        </div> 
                    </div>
                    
                    <div className={`${style['lg-4']} ${style['md-4']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                        <StickyBox offsetTop={85} offsetBottom={20}>
                            <BlogSidebarComponents
                                menus={upcoming.menus}
                                popular_posts={upcoming.popular_posts.data}
                                categories={upcoming.categories}
                                tags={upcoming.tags}
                                ads={[]}
                                enable={{
                                    popular_posts: (!upcoming.popular_posts.is_error  && true),
                                    follow_us: (upcoming?.menus?.follow_links?.length  && true),
                                    become_contributor: (upcoming?.menus?.company_links?.length  && true),
                                    categories: (upcoming?.categories?.length  && true),
                                    tags: (upcoming?.tags?.length  && true),
                                    ads:  (!upcoming?.ads?.is_error && true),
                                }}
                            />
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
                api: "wp-json/custom/v1/latest-posts?page_number=1",
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
            google_ads: settings.google_ads,
            share_social_buttons: settings.share_social_buttons,
            subscribe_description:settings.subscribe_description,
            subscribe_title:settings.subscribe_title,
            header: settings.header,
            footer: settings.footer, 
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
