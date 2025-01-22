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
import { signIn, signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { BlogFaqsSection } from "./../../services/components";
import { 
    TutorialsContent
} from "./../../services/components"; 

import BlogSidebarComponents from "../../parts/blog/sidebar";
import { SocialShare } from "./../../services/components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'


import Config from "./../../services/config";
 


import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



export default function Post({upcoming}) {
    
    
    console.log(upcoming);

    const [value, setValue] = useState('');
    
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


    var googleLoginCallback = async() => {
        await signIn("google");
    }
    var faqs = upcoming.single_post.data.faqs;
    var faqs_schema = '';
    // Check if FAQs exist and append them as "mainEntity" of the Article
    if (faqs && faqs.length) {
        var faqEntities = faqs.map((faq) => {
            
            return {
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            };
        });        
    
        // Adding FAQs as part of the main JSON-LD object
        faqs_schema += `
            "mainEntity": { 
                "@type": "FAQPage",
                "mainEntity": ${JSON.stringify(faqEntities)}
            }
        `;
    }
    // JSON LD Schema
    var json_data_var = `{
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": "${upcoming.single_post.data?.title}",   
                            "author": {
                                "@type": "Organization",
                                "name": "${upcoming?.title}"  
                            },
                            "datePublished": "${upcoming.single_post.data.publish_date}",   
                            "dateModified": "${upcoming.single_post.data.last_modified}",   
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
                                "@id": "${upcoming.single_post.data.link}"   
                            },
                            "url": "${upcoming.single_post.data.link}",
                             
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
                                        "name": "${upcoming.single_post.data.title}",
                                        "item": "${upcoming.single_post.data.link}"
                                    }, 
                                ]
                            }
                            
                            ${faqs_schema && faqs_schema != '' ? ',' + faqs_schema : ''}
                        }`;
    return <>
        <Head>
                     
            <title>{upcoming?.meta_title}</title>
            <meta name="description" content={upcoming?.meta_description} />
            {
                upcoming?.single_post?.data?.allow_post_indexing == false ?
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
                                

                                <div className={style['entry-header']}>
                                    <h1 className={`${style["tutorial-headline"]}`}>{upcoming.single_post.data.title}</h1>    
                                    <div className={`${style['entry-meta']} ${style['post-entry-meta']}`}>
                                        <Link href={upcoming.single_post.data.author.link} className={style.author}>
                            
                                            {/*<span
                                                className={`${style['authot-thumb']} ${style['pbt-lazy']}`}
                                                data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                                style={{
                                                    backgroundImage:
                                                        "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu)",
                                                }}
                                            ></span>*/} 
                                            <Image
                                                src={upcoming.single_post.data.author.avatar}
                                                alt="Default Thumbnail"
                                                style={{ objectFit: 'cover' }} // Replace `objectFit="cover"` with inline styles
                                                priority 
                                                width={30}
                                                height={30}
                                                className={style.user_avatar}
                                                decoding="async"
                                            />
                                            <span>{Helper.UppercaseName(upcoming.single_post.data.author.name)}</span>
                                        </Link>

                                        <span className={style["entry-time mi"]}>
                                            <span className={style["sp"]}>•</span>
                                            <time className={style["published"]} dateTime={upcoming.single_post.data.last_modified}>{Helper.formatDate(upcoming.single_post.data.last_modified)}</time>
                                        </span>
                                    </div>
                                </div>
                                
                                
                                 
                                <div 
                                    className={`${style['lg-2-content']} fixed-post-single ${style['post-single']} ${style['tutorial-content']} 
                                    ${style['content-section']}`} 
                                    dangerouslySetInnerHTML={{__html: upcoming.single_post.data.content}}
                                />

                                {
                                    upcoming.single_post.data.tags?.length?
                                    (
                                        <div className={`${style['entry-labels']} ${style['list-tags']}`}>
                                            <span className={style["labels-label"]}>Tags:</span>
                                            {upcoming.single_post.data.tags.map(x => <Link className={style["label-link"]} href={x.link}>{x.name}</Link>)}
                                        </div>
                                    ): ''
                                }

                                
                                
                                {
                                    upcoming.single_post.data.faqs?.length?
                                        <BlogFaqsSection faqs_section={upcoming.single_post.data.faqs}/>
                                    : ''
                                }


                                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                                    {
                                        upcoming?.share_social_buttons == '' ? ''
                                        : 
                                        <>
                                            <div className={`${style['flexbox']} ${style['gap-15']} ${style['share-box']} ${style['article-share-box']}`}> 
                                                <b className={style['share-on-social']}>Help Others Find This:</b>
                                                <SocialShare   
                                                    platforms={upcoming?.share_social_buttons} 
                                                    url={upcoming.single_post.data.link}
                                                    title={upcoming.single_post.data.title}
                                                    size={32} 
                                                    height={'32px'} 
                                                    width={'32px'} 
                                                    radius={true} 
                                                />
                                            </div>
                                        </>
                                    }
                                </div>

                                
                            </div>
                        </div> 

                        
                        

                        <div className={`${style.widget} ${style.remove_spaces} ${style.author_details}`}>
                            <div>
                                <span style={{background: `url(${upcoming.single_post.data.author.avatar})`}}></span>
                            </div>
                            <div>
                                <h5><Link href={upcoming.single_post.data.author.link}>{Helper.UppercaseName(upcoming.single_post.data.author.name)}</Link></h5>
                                
                                {
                                    upcoming.single_post.data.author.description != "" ?
                                    <p>{upcoming.single_post.data.author.description}</p>
                                    : ""
                                }
                                
                                {
                                    Object.entries(upcoming.single_post.data.author.social_links)?.length ? (
                                        <ul className={`${style['social-icons']} ${style['social-bg']} ${style['social-author-icons']}`}>
                                        {
                                            Object.entries(upcoming.single_post.data.author.social_links).map(([key, value]) => (
                                           
                                                value.indexOf("https://") !== -1 ?
                                                <li key={key} className={style[key]}>
                                                    <Link target="_blank" href={value}>
                                                        <FontAwesomeIcon className={style.icon_social_icon} icon={Config.icons[key]} />
                                                    </Link>
                                                </li> :''
                                            
                                            
                                            ))
                                        }
                                        </ul>
                                    ) : (
                                        ""
                                    )
                                    }
                            </div>
                        </div> 

                        {/*You may also like section*/}
                        {
                            upcoming.releated_posts.data?.length?
                            <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                <div className={`${style['comments-sectison']}`}>
                                    
                                    <h3>
                                        You May Also Like
                                    </h3>
                                    <div className={style['related-posts']}>
                                    {
                                        upcoming.releated_posts.data.map(post => (
                                            
                                            <div className={style['related-item']} id={style['item-0']}>
                                                <Link
                                                title={post.title}
                                                className={`${style['entry-image-wrap']} ${style['is-image']}`}
                                                href={post.link}
                                                >
                                                <span
                                                    className={`${style['entry-image']} ${style['pbt-lazy']}`}
                                                    data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                                    style={{
                                                    backgroundImage:
                                                        `url(${post.thumbnail})`,
                                                    }}
                                                ></span>
                                                </Link>
                                                <div className={style['entry-header']}>
                                                <h2 className={style['entry-title']}>
                                                    <Link
                                                    href={post.link}
                                                    title={post.title}
                                                    >
                                                    {post.title}
                                                    </Link>
                                                </h2>
                                                <div className={style['entry-meta']}>
                                                    <span className={style['entry-time']} id={style['mi']}>
                                                    <time className={style['published']} dateTime={post.last_modified}>
                                                        {Helper.formatDate(post.last_modified)}
                                                    </time>
                                                    </span>
                                                </div>
                                                </div>
                                            </div>
                                           
                                        ))
                                    }
                                     </div>
                                    

                                </div>
                            </div>
                            :''
                        }
                        

                        {
                            ! Helper.isLoggedIn() ?
                            <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                <div className={`${style['comments-sectison']} ${style['join_us_to_comment']}`}>
                                    <h3>
                                        Add a New Comment
                                    </h3>
                                    <button
                                        onClick={googleLoginCallback}
                                        style={{
                                        padding: "10px 20px",
                                        cursor: "pointer",
                                        backgroundColor: "#4285F4",
                                        color: "white",
                                        border: "none",
                                        }}
                                    >
                                        Sign In with Google
                                    </button>
                                    <a className={style.post_comment}>Add Comment</a> 
                                </div>
                            </div>
                            : 
                            <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                <div className={style['comments-sectison']}>
                                    <h3>
                                        Add a New Comment
                                    </h3>
                                    <AddNewComment thumbnail={true}/>  
                                </div>
                            </div>
                        }
                        

                        {/*Add a New Comments*/}
                        
                        
                        {/*Recently Comments*/}
                        <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                            <div className={style['comments-sectison']}>
                                <h3>
                                    Recent Comments (15)
                                </h3>
                                <div className={style['comment-wrapper']}>
                                    <div className={style['comment']}>
                                        <div className={style['thumbnail']}>
                                            <img src="https://placehold.co/50" alt="User Thumbnail" />
                                        </div>
                                        <div className={style['comment-content']}>
                                            <div className={style['comment-details']}>
                                                <span className={style['name']}>John Doe</span>
                                                <span className={style['date']}>January 18, 2025</span>
                                                <ul className={`${style.comment_meta_ul} ${style.meta_ul_result}`}>
                                                    <li>
                                                        5 Likes
                                                    </li> 
                                                    <li>
                                                        3 Unlikes
                                                    </li> 
                                                </ul>                                                
                                            </div>
                                            <div className={style['comment-text']}>
                                                <p>This is a great article! I learned so much from it. Thank you for
                                                sharing!</p>
                                            </div> 
                                            <ul className={style.comment_meta_ul}>
                                                <li>
                                                    <a>Like</a>
                                                </li>
                                                <li>
                                                    <a>Dislike</a>
                                                </li>
                                                <li>
                                                    <a>Reply</a>
                                                </li>
                                            </ul>

                                            

                                            <div className={style.reply_comments}>
                                                <div className={`${style['comment']} ${style['reply-to']}`}>
                                                    
                                                    <div className={style['thumbnail']}>
                                                        <img src="https://placehold.co/50" alt="User Thumbnail" />
                                                    </div>
                                                    <div className={style['comment-content']}>
                                                        <div className={style['comment-details']}>
                                                            <span className={style['name']}>John Doe</span>
                                                            <FontAwesomeIcon icon={faReply} className={style['icon-reply-to']} />
                                                            <span className={style['date']}>January 18, 2025</span>
                                                            <span className={style['is-author']}>Author</span>
                                                            <ul className={`${style.comment_meta_ul} ${style.meta_ul_result}`}>
                                                                <li>
                                                                    5 Likes
                                                                </li> 
                                                                <li>
                                                                    3 Unlikes
                                                                </li> 
                                                            </ul>
                                                        </div>
                                                        <div className={style['comment-text']}>
                                                            <p>This is a great article! I learned so much from it. Thank you for
                                                            sharing!</p>
                                                        </div> 
                                                        <ul className={style.comment_meta_ul}>
                                                            <li>
                                                                <a>Like</a>
                                                            </li>
                                                            <li>
                                                                <a>Dislike</a>
                                                            </li> 
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className={`${style['comment']} ${style['reply-to']}`}>
                                                    
                                                    <div className={style['thumbnail']}>
                                                        <img src="https://placehold.co/50" alt="User Thumbnail" />
                                                    </div>
                                                    <div className={style['comment-content']}>
                                                        <div className={style['comment-details']}>
                                                            <span className={style['name']}>John Doe</span>
                                                            <FontAwesomeIcon icon={faReply} className={style['icon-reply-to']} />
                                                            <span className={style['date']}>January 18, 2025</span>
                                                        </div>
                                                        <div className={style['comment-text']}>
                                                            <p>This is a great article! I learned so much from it. Thank you for
                                                            sharing!</p>
                                                        </div> 

                                                        <ul className={style.comment_meta_ul}>
                                                            <li>
                                                                <a>Like</a>
                                                            </li>
                                                            <li>
                                                                <a>Dislike</a>
                                                            </li> 
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                            <div className={style.view_more_comments}>
                                                <a>
                                                   Read More (5 Replies)
                                                </a>
                                            </div>

                                            <div className={style.add_comment_reply}>
                                                <AddNewComment thumbnail={false}/>  
                                            </div>
                                        </div>
                                        
                                    </div>  
                                </div>

                                <div className={style['comment-wrapper']}>
                                    <div className={style['comment']}>
                                        <div className={style['thumbnail']}>
                                            <img src="https://placehold.co/50" alt="User Thumbnail" />
                                        </div>
                                        <div className={style['comment-content']}>
                                            <div className={style['comment-details']}>
                                                <span className={style['name']}>John Doe</span>
                                                <span className={style['date']}>January 18, 2025</span>
                                                <ul className={`${style.comment_meta_ul} ${style.meta_ul_result}`}>
                                                    <li>
                                                        5 Likes
                                                    </li> 
                                                    <li>
                                                        3 Unlikes
                                                    </li> 
                                                </ul>    
                                            </div>
                                            <div className={style['comment-text']}>
                                                <p>This is a great article! I learned so much from it. Thank you for
                                                sharing!</p>
                                            </div> 

                                            

                                            <ul className={style.comment_meta_ul}>
                                                <li>
                                                    <a>Like</a>
                                                </li>
                                                <li>
                                                    <a>Dislike</a>
                                                </li> 
                                                <li>
                                                    <a>Reply</a>
                                                </li> 
                                            </ul>
                                        </div>
                                        
                                    </div>   
                                </div>
                                
                                
                            </div> 
                            <div className={`${style.view_more_comments} ${style.load_more_cmt}`}>
                                <a>
                                    See More (5 Comments)
                                </a> 
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
    
    var slug = context.params.post;
     
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
                api: `wp-json/custom/v1/related-posts?post_slug=${slug}&number_of_posts=3`,
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
                api: `wp-json/custom/v1/post-by-slug?post_slug=${slug}`,
                method: "get",
                data: {}
            }),
        ];

        // Wait for all requests to resolve
        const responses = await Promise.all(requests);

        // Parse JSON from each response
        const data = await Promise.all(responses.map(response => response.json()));

        // Single of Post 
        var single_post = data[6]; 
        if(single_post.is_error) {
            return {
                notFound: true, // This triggers the default Next.js 404 page
            };    
        }

  
        // 1- Site Settings  
        var settings = data[0].settings.length?data[0].settings[0]: {};
        if(settings.site_address) {
            var convertToArray = settings.site_address.split('/');
            if(convertToArray[convertToArray.length - 1 ] !== '/') {
                settings.site_address = `${settings.site_address}/`;
            }
        }

        // change link value 
        single_post.data.link = single_post?.data.link.replace("https://authors.flatcoding.com/", `${settings.site_address}blog/` );


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


        var meta_title = single_post.data.title + ' - ' + blog_settings.title;
        
        
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
            meta_description: single_post.data.meta_description,
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
