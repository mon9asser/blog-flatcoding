import style from "@/app/styles.module.css";
import Link from "next/link";
import Head from "next/head";
import StickyBox from "react-sticky-box";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../../services/helper";
import Header from "./../../parts/header";
import Footer from "./../../parts/footer"; 
import { ServerOffline } from "./../../services/components";
import Script from "next/script";
import { 
    TutorialsContent
} from "./../../services/components"; 

import { SocialShare } from "./../../services/components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import BlogSidebarComponents from "../../parts/blog/sidebar";

import Config from "./../../services/config";
 


import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
 


export default function Write({upcoming}) {
    
    
    // console.log(upcoming);
    const [value, setValue] = useState('');

    var [buttonDisabled, setButtonDisabled] = useState(false);
    var [responseStatus, setResponseStatus] = useState(''); // error_msg - success_msg
    var [responseMessage, setResponseMessage] = useState(''); 
    var [loading, setLoading] = useState(false); 
    var [form, setForm] = useState({
        first_name: '',
        second_name: '',
        email: '',
        linkdin: '',
        facebook: '',
        instagram: '',
        youtube: '',
        website_url: '',
        article_1: '',
        article_2: '',
        article_3: '',
        bio: '',
        topics: ''
    });
    


    var sendRequest = async (e) => {
        e.preventDefault();
        setResponseStatus('');
        setResponseMessage('');
        setLoading(true);
        
        // -----------------------------------------------
        // validate user inputs 
        // -----------------------------------------------

        // => Check empty fields
        if(form.first_name == '' || form.second_name == '' || form.email == '' || form.article_1 == '' || form.article_2 == '' || form.article_3 == '' || form.bio == '' || form.topics == '') {
            setResponseStatus('error_msg');
            setResponseMessage('Please ensure that you fill out all required fields.');
            setLoading(false);
            return; 
        }

        // => Invalid email
        if (!Helper.validateEmail(form.email)) {
            setResponseStatus('error_msg');
            setResponseMessage('Please make sure you have entered a valid email.');
            setLoading(false);
            return; 
        }

        // => Invalid Link for Link 1 - 2 - 3
        if (!Helper.isLink(form.article_1) || !Helper.isLink(form.article_2) || !Helper.isLink(form.article_3) ) {
            setResponseStatus('error_msg');
            setResponseMessage('Please ensure that all links contain valid URLs.');
            setLoading(false);
            return; 
        }

        // => Choose at least 3 topics you want to write about.
        if(form.topics.indexOf('|') == -1 ) {
            setResponseStatus('error_msg');
            setResponseMessage('Please ensure that you have filled in at least 3 topics, separated by |.');
            setLoading(false);
            return; 
        }

        // => Convert pipelines to list in html 
        var topics = form.topics.split('|').map(x => {
            var field = x.trim();
            
            if( field == '' || field.length < 20 ) {
                return false; 
            }

            return `<li>${field}</li>`;
        });

        if(topics.includes(false)) {
            setResponseStatus('error_msg');
            setResponseMessage('Please make sure you have filled in all topics with at least 20 characters, separated by "|".');
            setLoading(false);
            return; 
        }
        
        form.topics = `<ol>${topics.join('')}</ol>`;
        
        // => Send Request 
        var reqqs = await Helper.sendNTRequest({
            api: `send_application`,
            method: "post",
            body: form
        });

        var response = await reqqs.json();  

        if(response.is_error) {
            setResponseStatus('error_msg');
            setResponseMessage(response.message);
            setLoading(false);
            return; 
        } 
        setResponseStatus('success_msg');
        setResponseMessage(response.message);
        setLoading(false);
        setButtonDisabled(true)
    }

    var storeFieldValue = ( key, value ) => {
        var old_obj = {...form};
            old_obj[key] = value;
            setForm(old_obj);
    }
    
    var header_content = parse(upcoming.header);
    var footer_content = parse(upcoming.footer);
    var json_data_var = `{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${upcoming.single_post?.title}",   
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
            "@id": "${upcoming.single_post.link}"   
        },
        "url": "${upcoming.single_post.link}",
         
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
                    "name": "${upcoming.single_post.title.rendered}",
                    "item": "${upcoming.single_post.link}"
                }, 
            ]
        }
         
    }`; 

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

    var AddNewComment = ({thumbnail}) => {
        return <>

            <div className={style.add_comment_for_author}>
                {
                    thumbnail ?
                        <div className={style['add_comment_for_author_thumbnail']}>
                            <img src="https://placehold.co/50" alt="User Thumbnail" />
                        </div>
                    : null
                }
                
                <div className={style.add_comment_details}>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        placeholder="Write your comment here..."
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'], // Text formatting
                                [{ list: 'ordered' }, { list: 'bullet' }], // Lists
                                ['link', 'code-block'], // Links and code blocks
                            ],
                        }}
                        formats={['bold', 'italic', 'underline', 'list', 'bullet', 'link', 'code-block']}
                    />
                </div>
            </div>
            <a className={style.post_comment} href='#'>Submit</a> 
        </>
    }
    return <>
    
        <Head>
                     
            <title>{upcoming?.meta_title}</title>
            <meta name="description" content={upcoming?.meta_description} />
            {
                upcoming?.single_post?.allow_post_indexing == false ?
                <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                : ""
            }
            <link rel="canonical" href={upcoming.single_post.link}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="article"/>

            <meta property="og:title" content={upcoming?.meta_title}/>
            <meta property="og:description" content={upcoming?.meta_description}/>
            <meta property="og:url" content={upcoming.single_post.link}/>
            <meta property="og:site_name" content={upcoming.title}/>
            {
                upcoming.single_post.thumbnail ?
                (
                    <meta name="twitter:card" content="summary_large_image"/>,
                    <meta property="og:image" content={upcoming.single_post.thumbnail}/>,
                    <meta name="twitter:image" content={upcoming.single_post.thumbnail}/>
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
            
            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['paddingt-10']}`}>
                <div className={`${style.row} ${style['mlr--15']}`}>
                    <div className={`${style['lg-8']} ${style['md-8']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                         
                        <div id='posts-wrap'> 
                            <div className={style.blog_post_wrap}>
                                

                                <div className={`${style['entry-header']}`}>
                                    <h1 className={`${style["tutorial-headline"]}`}>{upcoming.single_post.title.rendered}</h1>    
                                </div>
                                
                                <div 
                                    className={`${style['lg-2-content']} fixed-post-single ${style['post-single']} ${style['tutorial-content']} 
                                    ${style['content-section']}`} 
                                    dangerouslySetInnerHTML={{__html: upcoming.single_post.content.rendered}}
                                />

                                <div className={`${style['entry-content']} ${style['flex-direction-column']} ${style['single--content']}`}> 
                                
                                    <form className={style.mt_10}>
                                        <div className="nice-form-group">
                                            <label>Your First Name <i>*</i></label>
                                            <input value={form.first_name} onChange={e => storeFieldValue('first_name', e.target.value)} type="text" placeholder="First Name" />
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Your Second Name <i>*</i></label>
                                            <input value={form.second_name} onChange={e => storeFieldValue('second_name', e.target.value)} type="text" placeholder="Second Name" />
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Contact Email <i>*</i></label>
                                            <input value={form.email} onChange={e => storeFieldValue('email', e.target.value)} type="text" placeholder="Your Email" />
                                            <small>Please provide a valid contact email</small>
                                        </div>

                                        <div className="nice-form-group">
                                            <label>LinkedIn profile URL</label>
                                            <input value={form.linkdin} onChange={e => storeFieldValue('linkdin', e.target.value)} type="text" placeholder="LinkedIn profile URL" /> 
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Facebook profile URL</label>
                                            <input value={form.facebook} onChange={e => storeFieldValue('facebook', e.target.value)} type="text" placeholder="Facebook profile URL" /> 
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Instagram profile URL</label>
                                            <input value={form.instagram} onChange={e => storeFieldValue('instagram', e.target.value)} type="text" placeholder="Instagram profile URL" /> 
                                        </div>
                                        <div className="nice-form-group">
                                            <label>YouTube profile URL</label>
                                            <input value={form.youtube} onChange={e => storeFieldValue('youtube', e.target.value)} type="text" placeholder="YouTube profile URL" /> 
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Website URL</label>
                                            <input value={form.website_url} onChange={e => storeFieldValue('website_url', e.target.value)} type="text" placeholder="Website URL" /> 
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Link to Your Best Article 1 <i>*</i></label>
                                            <input value={form.article_1} onChange={e => storeFieldValue('article_1', e.target.value)} type="text" placeholder="Article URL" />
                                            <small>If you do not have articles, create one on Hashnode or Dev.to and share it with us.</small>
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Link to Your Best Article 2 <i>*</i></label>
                                            <input value={form.article_2} onChange={e => storeFieldValue('article_2', e.target.value)} type="text" placeholder="Article URL" />
                                            <small>If you do not have articles, create one on Hashnode or Dev.to and share it with us.</small>
                                        </div>

                                        <div className="nice-form-group">
                                            <label>Link to Your Best Article 3 <i>*</i></label>
                                            <input value={form.article_3} onChange={e => storeFieldValue('article_3', e.target.value)} type="text" placeholder="Article URL" />
                                            <small>If you do not have articles, create one on Hashnode or Dev.to and share it with us.</small>
                                        </div>
                                        <div className="nice-form-group">
                                            <label>Short Bio <i>*</i></label>
                                            <textarea value={form.bio} onChange={e => storeFieldValue('bio', e.target.value)} type="text" placeholder="Short Bio"></textarea> 
                                        </div>
                                        <div className="nice-form-group">
                                            <label>Topics You Plan to Write with Us<i>*</i></label>
                                            <textarea value={form.topics} onChange={e => storeFieldValue('topics', e.target.value)} type="text" placeholder="Topics Separated by |"></textarea> 
                                            <small>Separate Each with |</small>
                                        </div>
                                        
                                        <div className={`${style.response_msg} ${style.block_msg} ${style[responseStatus]}`}>
                                            <p>{responseMessage}</p>
                                        </div>

                                        <div className={`${style['widget-content']}  ${style['submit-request']}`}>
                                            <Link disabled={buttonDisabled} onClick={sendRequest} className={`${style.load_more} ${style.flex} ${style.write_for_us}`} href={'#'}>
                                                {
                                                    loading ? <span className={style.loader}></span>: 'Submit Request'
                                                }
                                            </Link>
                                        </div>
                                    </form>
                                            
                                </div>
                                 
                            </div>
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
                                    become_contributor: (upcoming?.menus?.company_links?.length  && false),
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
                api: "wp-json/custom/v1/related-posts?post_slug=write-for-us&number_of_posts=2",
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
                api: `wp-json/wp/v2/pages?slug=write-for-us`,
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
        var releated_posts = data[3];
        
        // Single of Post 
        var single_post = data[6];
        if( single_post.length ) {
            single_post = single_post[single_post.length - 1];
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


        // change link value 
        single_post.link = single_post.link.replace("https://authors.flatcoding.com/", `${settings.site_address}blog/` );
        delete single_post.guid;

        meta_title = `${single_post.title.rendered} - ${blog_settings.title}`; 

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

            // You may like 
            releated_posts,

            // Post 
            single_post

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
