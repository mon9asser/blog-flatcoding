
import { useState, useEffect } from "react";
import style from "@/app/styles.module.css";
import Link from "next/link";
import Head from "next/head";
import StickyBox from "react-sticky-box";
import Image from "next/image";
import parse from 'html-react-parser';
import { Helper } from "./../../../services/helper";
import Header from "./../../../parts/header";
import Footer from "./../../../parts/footer"; 
import { ServerOffline } from "./../../../services/components";
import Script from "next/script";
import { 
    TutorialsContent
} from "./../../../services/components"; 

import BlogSidebarComponents from "../../../parts/blog/sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from "../../../services/config";

export default function Author({upcoming}) {

    console.log(upcoming)
    
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

        /*
        Helper.sendWPRequest({
                api: `wp-json/custom/v1/latest-posts?author=${usr}&page_number=1`,
                method: "get",
                data: {}
            }),
        */ 

        ///api/latest_posts/?page_number=4
        var latest_request = await Helper.sendNTRequest({
            api: `latest_posts?page_number=${current_page}&author=${upcoming.author_data.data.name}`,
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


    var header_content = parse(upcoming.header);
    var footer_content = parse(upcoming.footer);
 

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


    var json_data_var = `{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${upcoming.meta_title}",   
        "author": {
            "@type": "Organization",
            "name": "${upcoming?.title}"  
        },  
        "description": "${upcoming?.meta_description}",   
        "publisher": {
            "@type": "Organization",
            "name": "${upcoming?.title}",  
            "logo": {
                "@type": "ImageObject",
                "url": "${upcoming.site_logo}"  
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${upcoming?.author_data?.data?.url}"   
        },
        "url": "${upcoming?.author_data?.data?.url}",
         
        "breadcrumb": {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "${upcoming.site_url}"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "${upcoming.site_url}blog/"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "${Helper.UppercaseName(upcoming?.author_data.data.name)}",
                    "item": "${upcoming?.author_data?.data?.url}"
                }, 
            ]
        }
        
    }`;

    return <>
        <Head>
            <title>{upcoming?.meta_title}</title>
            <meta name="description" content={upcoming?.meta_description} />
            {
                upcoming?.author_data?.data?.meta_data?.wpseo_noindex_author == 'on' ?
                <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                : ""
            }
            <link rel="canonical" href={upcoming?.author_data?.data?.url}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="article"/>

            <meta property="og:title" content={upcoming?.meta_title}/>
            <meta property="og:description" content={upcoming?.meta_description}/>
            <meta property="og:url" content={upcoming?.author_data?.data?.url}/>
            <meta property="og:site_name" content={upcoming.title}/>
            {
                upcoming?.author_data?.data.avatar ?
                (
                    <meta name="twitter:card" content="summary_large_image"/>,
                    <meta property="og:image" content={upcoming?.author_data?.data.avatar}/>,
                    <meta name="twitter:image" content={upcoming?.author_data?.data.avatar}/>
                )
                : ""
            }
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json_data_var}} /> 
            
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
            
            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['pb-space-10']}`}>
                <header className={`${style.widget} ${style.remove_spaces}`}>
                    <div className={`${style["row"]}`} style={{ marginLeft: '-15px', marginRight: '-15px' }}>
                            <div
                                className={`${style["md-9"]} ${style["text-center"]} ${style["offset-left"]} ${style["offset-right"]} ${style["p-all-15"]} ${style["flexbox"]} ${style["content-center"]} ${style["column-direction"]} ${style["tutorial-header-block"]}`}
                            >
                                <Image
                                    className={`${style['entry-thumbnail']} ${style['pbt-lazy']} ${style['contributer-thumb']}`}
                                    src={upcoming.author_data.data.avatar}
                                    priority
                                    alt={upcoming.author_data.data.name}
                                    decoding="async"
                                    width={100}
                                    height={100}
                                />
                                    
                                {/*<span
                                    className={`${style['entry-thumbnail']} ${style['pbt-lazy']} ${style['contributer-thumb']}`}
                                    data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                    style={{
                                        backgroundImage:
                                            "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu)",
                                    }}
                                ></span>*/}
                                <h1 className={`${style["tutorial-headline"]}`}>{Helper.UppercaseName(upcoming.author_data.data.name)}</h1>
                                <div className={`${style["sub-title"]} ${style["user-analytics-data"]}`}>
                                    {
                                        parseInt(upcoming.author_data.data.post_count) ? <span>{upcoming.author_data.data.post_count} Article{parseInt(upcoming.author_data.data.post_count) > 1? 's': ''}</span>: ''
                                    }
                                    {
                                        parseInt(upcoming.author_data.data.comment_count) ? <span>{upcoming.author_data.data.comment_count} Comments</span>: ''
                                    } 
                                </div> 
                                <div className={`${style["mt-20"]} ${style["content-elem"]} ${style["text-element-center"]}`}>
                                    <p className={`${style["tutorial-description"]} ${style["no-spaces"]}`}>
                                        {
                                            upcoming.author_data.data.meta_data.description != '' ?
                                            upcoming.author_data.data.meta_data.description: upcoming.meta_description
                                        }
                                    </p>
                                    {/*<ul className={`${style['social-icons']} ${style['center-li']} ${style['social-bg']} ${style['social-author-icons']}`}>
                                        <li className={style['facebook']}>
                                            <Link href={'#'}>
                                                <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons['facebook']} />
                                            </Link>
                                        </li>
                                        <li className={style['email']}>
                                            <Link href={'#'}>
                                                <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons['email']} />
                                            </Link>
                                        </li> 
                                    </ul>*/}
                                </div>
                                
                            </div>
                    </div>
                </header> 
            </div>

            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['pt-space-10']}`}>
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
                                                                !post.tags.length ? '':post.tags.map((x, k) =><li key={x.id+k}><Link style={getRandomColor()} href={x.url}>{x.name}</Link></li>)
                                                            } 
                                                        </ul>
                                                        {/*<span className={`${style['entry-author']} ${style.mi}`}>
                                                            <span className={`${style['by']} ${style['sp']}`}>by</span>
                                                            <Link href={post.author.url} className={`${style['author-name']}`}>{Helper.UppercaseName(post.author.name)}</Link>
                                                        </span>*/}
                                                        
                                                        <span className={style["entry-time mi"]}> 
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
                                                            alt="Default Thumbnail"
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

    var usr = context.params.user;
    
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
                api: `wp-json/custom/v1/latest-posts?author=${usr}&page_number=1`,
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
            Helper.sendWPRequest({
                api: `wp-json/custom/v1/author?slug=${usr}`,
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
        
        // Author data
        var author_data = data[6];
        if(!author_data.is_error) {
            if( author_data.data.url ) {
                author_data.data.url = author_data.data.url.replace("https://authors.flatcoding.com/author/", `${settings.site_address}blog/u/`)
            }
        }
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

        if( author_data.is_error ) {
            return {
                notFound: true 
            }
        }

        // setup user data
        var meta_description = author_data.data.meta_data?.wpseo_metadesc != '' ? author_data.data.meta_data.wpseo_metadesc: author_data.data.meta_data.description
        var meta_title = author_data.data.meta_data?.wpseo_title != '' ? author_data.data.meta_data.wpseo_title:  author_data.data.name;
        if( meta_description == '' ) {
            meta_description = `${Helper.UppercaseName(meta_title)} is an author who writes about technology and programming, offering insights, tutorials, and guidance to help developers solve problems in their projects.`
        }
        
        meta_title = `${meta_title} - ${blog_settings.title}`;
        
         

        var upcoming = {
            
            // Settings
            meta_title: meta_title,
            meta_description: meta_description,


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
            footer: settings.footer,
            header: settings.header,
            
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
            latest_posts,

            // Author data
            author_data
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
