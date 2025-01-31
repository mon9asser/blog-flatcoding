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
 


import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



export default function Post({upcoming}) {
    
     
    const { data: session } = useSession(); 
    var [loadLogin, setLoadLogin] = useState(false);
    var [comments, setComments] = useState([]); 
    
    var [open, setOpen] = useState(false);
    var [enableLoadMoreComments, setEnableLoadMoreComments] = useState(false);
    var [openReplyWindowId, setOpenReplyWindowId] = useState(0);

    var ThumbUp = () => (
        <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z"/></svg>
    )
    
    var ThumbDown = () => (
        <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z"/></svg>
    )
    
    var disLikeCallback = async (e, commentId) => {
        if( !session || !session.user ) {
            setOpen(true);
            return;
        } 
        
        upcoming.comments.all = upcoming.comments.all.map(x => {

            if(x.id == commentId) {
 

                if(!x.meta.comment_dislikes){
                    x.meta.comment_dislikes = 1; 
                } else {
                    x.meta.comment_dislikes = parseInt( x.meta.comment_dislikes) + 1;
                }

            }   

            return x;
        });
        
        var formatDate = {
            name: session.user.name, 
            email: session.user.email, 
            image: session.user.image, 
            accessToken:session.user.accessToken, 
            comment_id:commentId, 
            interaction_type: 'dislike' 
        }


        const response = await Helper.sendNTRequest({
            api: 'submit-interaction',
            method: 'post',
            body: formatDate 
        });   

        var reqs = await response.json();
        

        
    }

    var likeCallback    = async (e, commentId) => {
        
        if( !session || !session.user ) {
            setOpen(true);
            return;
        }
        
        upcoming.comments.all = upcoming.comments.all.map(x => {

            if(x.id == commentId) {

                if(!x.meta.comment_likes){
                    x.meta.comment_likes = 1; 
                } else {
                    x.meta.comment_likes = parseInt( x.meta.comment_likes) + 1;
                }
                

            }   

            return x;
        });

        var formatDate = {
            name: session.user.name, 
            email: session.user.email, 
            image: session.user.image, 
            accessToken:session.user.accessToken, 
            comment_id:commentId, 
            interaction_type: 'like' 
        }

        const response = await Helper.sendNTRequest({
            api: 'submit-interaction',
            method: 'post',
            body: formatDate 
        });   

        var reqs = await response.json();
        
        console.log(reqs);

    }

    var showLoginDialog = () => {
        setOpen(true);
    }

    var replyCallback = (e, commentId) => {
        
        if( !session || !session.user ) {
            setOpen(true);
            return;
        }

        setOpenReplyWindowId(commentId);

    }
    
    var loadMoreComments = async (e) => {
        setEnableLoadMoreComments(true);
        e.preventDefault();
        
        upcoming.comments.paging.page= upcoming.comments.paging.page + 1;
       
        if( upcoming.comments.paging.page >= upcoming.comments.paging.total_pages ) {
            upcoming.comments.paging.page = upcoming.comments.paging.total_pages;
        } 

        var request = await Helper.sendWPRequest({
            api: `wp-json/wp/v2/comments?per_page=5&page=${upcoming.comments.paging.page}&parent=0&post=${upcoming.single_post.data.id}`,
            method: "get",
            data: {},
            no_header: true
        });


        var response = await request.json();
        
        // convert link to main site url 
        var new_comments_data = response.map(x => {
            x.link = x.link.replace("authors.flatcoding.com", "flatcoding.com/blog") 
            return x;
        }); 

        // push new comments to main comments state
        var allComments = [...comments, ...new_comments_data]; 
        
        setEnableLoadMoreComments(false);

        // assign all comments to main state
        setComments(allComments);

    }
    var LoginPopUpBox = ({open, setOpen}) => { 

        var googleLoginCallback = async(e) => {
            e.preventDefault();
            setLoadLogin(true);
            await signIn("google");
        }
        
        var closeDialog = () => {
            setOpen(false);
        }

        return <div onClick={closeDialog} className={`${style['popup-login-box']} ${open? style.open_dialog: ''}`}>
            <div>
                <h3>Login</h3>
                <p>You need to log in to comment and interact with others' comments.</p>
                <button onClick={googleLoginCallback} type="button" class="btn google-btn"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" class="google-icon"><path fill="#4285F4" d="M44.5,20H24v8.5h11.7c-1.1,3.2-3.6,5.7-6.7,6.9l6.7,5.2c3.9-3.6,6.3-8.8,6.3-14.6C44.7,24.9,44.6,22.4,44.5,20z"/><path fill="#34A853" d="M24,44c5.9,0,10.8-1.9,14.4-5.1l-6.7-5.2c-2,1.3-4.6,2-7.7,2c-5.9,0-10.8-4-12.6-9.4l-7.2,5.6C8.9,39.7,15.9,44,24,44z"/><path fill="#FBBC05" d="M11.4,26.3c-0.5-1.3-0.8-2.7-0.8-4.3s0.3-3,0.8-4.3l-7.2-5.6C2.3,15.6,1,19.1,1,22.8s1.3,7.2,3.2,10.7L11.4,26.3z"/><path fill="#EA4335" d="M24,9.5c3.2,0,6.1,1.1,8.4,3.2l6.3-6.3C34.8,2.9,29.9,1,24,1c-8.1,0-15.1,4.3-19.2,10.7l7.2,5.6C13.2,13.5,18.1,9.5,24,9.5z"/><path fill="none" d="M0,0h48v48H0V0z"/></svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    }
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

    var AddNewComment = ({user, post_id, comment_id, reply_to_comment_id, thumbnail }) => {
        
        if(!user) return null; 
        
        delete user.id;  
        var [value, setValue] = useState('');
        var [response, setResponse] = useState('');
        var [isLoading, setLoading] = useState(false);
        var [loadLogin, setLoadLogin] = useState(false);

        var [message, setMessage] = useState('');
        var [display, setDisplay] = useState('');
        var [clasN, setclasN] = useState('nothing');

        var submitComment = async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage('');
            setclasN('nothing'); 
            
            var data_form = {
                ...user,
                post_id: post_id? post_id: 0,
                comment_id: comment_id? comment_id: 0,
                reply_to_comment_id: reply_to_comment_id? reply_to_comment_id: 0,
                comment_value: value
            }
            
            if(value == '' ) {
                setMessage("Comment cannot be empty!");
                setclasN('error_msg');
                setLoading(false);
                return;
            }
          
            const response = await Helper.sendNTRequest({
                api: 'submit-comment',
                method: 'post',
                body: data_form 
            });        
          
            var submitted = await response.json();
            if( submitted.is_error ) {
                setMessage(submitted.message);
                setclasN('error_msg');
                setLoading(false);
                return;
            }

            setMessage(submitted.message);
            setclasN('success_msg'); // 
            setLoading(false);
             
        }

        return <>

            <div className={style.add_comment_for_author}>
                {
                    thumbnail ?
                        <div className={style['add_comment_for_author_thumbnail']}>
                            <Image 
                                crossOrigin="anonymous" 
                                src={user.image} 
                                alt={user.name} 
                                decoding="async"
                                width={120}
                                height={120}
                                priority
                            />
                        </div>
                    : null
                }
                
                <div className={style.add_comment_details}>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onKeyUp={() => {
                            setMessage("");
                            setclasN('nothing');
                            setLoading(false);
                        }}
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
            <div className={`${style['response_msg']} ${style[clasN]}`}> 
                <p>{message}</p>
            </div>
            <Link onClick={submitComment} className={`${style.post_comment} ${style.flex}`} href='#'>
                {
                    isLoading? <span className={style.loader}></span>: 'Submit'
                }
            </Link> 
        </>
    }


    useEffect(function(){
        
        // add comments to array
        setComments(upcoming.comments?.all);

    }, [upcoming.comments?.all])

    var load_more_replies = async (event, comment_id) => {

        event.preventDefault();

        var load_replies = await Helper.sendWPRequest({
            api: `wp-json/wp/v2/comments?parent=${comment_id}`,
            method: "get",
            data: {},
            no_header: true
        });

        var replies = await load_replies.json();
        

        var all_comments = comments.map(x => {

            if( x.id == comment_id ) {
                x.replies = replies; 
            }
            
            return x;
        });

        setComments( all_comments ); 
    }
    
    
    var googleLogoutCallback = async(e) => {
        e.preventDefault();
        setLoadLogin(true);
        await signOut("google")
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
                                                alt={Helper.UppercaseName(upcoming.single_post.data.author.name)}
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
                            !session || !session.user ?
                            <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                <div className={`${style['comments-sectison']} ${style['join_us_to_comment']}`}>
                                    <h3>
                                        Add a New Comment
                                    </h3> 
                                    <Link href='#write-a-new-comment' onClick={showLoginDialog} className={`${style.post_comment} ${style.flex}`}>
                                        {
                                            loadLogin? <span className={style.loader}></span>: 'Add Comment'
                                        }
                                    </Link> 
                                </div>
                            </div>
                            : 
                            <div id='write-a-new-comment' className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                <div className={style['comments-sectison']}>
                                    <div className={`${style.flex} ${style.youloggedin}`}>
                                        <h3>
                                            Add a New Comment
                                        </h3> 
                                        <p>Your comment will be posted using this email: <i>{session.user.email}</i>. You can <button onClick={e => googleLogoutCallback(e)} >{loadLogin? <span className={style.loader}></span>: 'Logout'}</button>.</p>
                                    </div>
                                    {
                                        (session && session.user) ?
                                            <AddNewComment 
                                                
                                                post_id={upcoming.single_post.data.id}  
                                                comment_id={0}
                                                reply_to_comment_id={0}
                                                user={session.user}  
                                                thumbnail={true}/>
                                        : ''
                                    }
                                      
                                </div>
                            </div>
                        }
                        

                        {/*Add a New Comments*/}
                        
                        
                        {/*Recently Comments*/}
                        {
                            upcoming.comments?.all?.length ? 
                                <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                                    <div className={style['comments-sectison']}>
                                        <h3>
                                            Recent Comments ({upcoming.comments.paging.counts})
                                        </h3>
                                        
                                        {   
                                            (comments.length? comments: upcoming.comments?.all).map(comment => (
                                                <div id={`comment-${comment.id}`} key={comment.id} className={style['comment-wrapper']}>
                                                    <div className={`${style['comment']} ${style['comment-box']}`}>
                                                        <div className={style['thumbnail']}>
                                                            <Image 
                                                                property
                                                                crossOrigin="anonymous"
                                                                decoding="async"
                                                                width={50}
                                                                height={50}
                                                                src={comment.author_avatar_urls[48]} 
                                                                alt={comment.author_name} 
                                                            />
                                                        </div>
                                                        <div className={style['comment-content']}>
                                                            <div className={style['comment-details']}>
                                                                <span className={style['name']}>{Helper.UppercaseName(comment.author_name)}</span>
                                                                <span className={style['date']}>{Helper.formatDate(comment.date)}</span>
                                                            </div>
                                                            <div 
                                                                className={style['comment-text']} 
                                                                dangerouslySetInnerHTML={{__html: comment.content.rendered}}
                                                            /> 
                                                            <div className={style.like_dislike}>
                                                                <ul className={style.comment_meta_ul}>
                                                                    <li>
                                                                        <Link href={`#comment-${comment.id}`} onClick={e=>likeCallback(e, comment.id)}>Like</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href={`#comment-${comment.id}`} onClick={e=>disLikeCallback(e, comment.id)}>Dislike</Link>
                                                                    </li> 
                                                                    <li>
                                                                        <Link href={`#comment-${comment.id}`} onClick={e=>replyCallback(e, comment.id)}>Reply</Link>
                                                                    </li> 
                                                                </ul>

                                                                {
                                                                    comment.meta?.comment_dislikes || comment.meta?.comment_likes ?
                                                                    <ul className={`${style.comment_meta_ul} ${style.meta_ul_result} ${style.comment_meta_ul_result}`}>
                                                                       
                                                                        {
                                                                            comment.meta.comment_likes ?
                                                                            <li>
                                                                                {comment.meta.comment_likes} <span><ThumbUp/></span>
                                                                            </li> : ""
                                                                        }
                                                                        
                                                                        {
                                                                            comment.meta.comment_dislikes ?
                                                                            <li>
                                                                                {comment.meta.comment_dislikes} <span><ThumbDown/></span>
                                                                            </li>: ""
                                                                        }
                                                                        
                                                                    </ul>: ""
                                                                }
                                                                

                                                            </div>
                                                            
                                                            {
                                                                comment.id === openReplyWindowId ?
                                                                   <div className={style.reply_block_text}>
                                                                        <p>You will comment with <i>{session.user.email}</i>. You can <a href="#" onClick={e => googleLogoutCallback(e)} >{loadLogin? <span className={style.loader}></span>: 'Logout'}</a>.</p>
                                                                        <AddNewComment
                                                                            comment_id={0}
                                                                            post_id={upcoming.single_post.data.id}  
                                                                            reply_to_comment_id={comment.id}
                                                                            thumbnail={false}
                                                                            user={session.user}
                                                                            
                                                                        />
                                                                   </div>
                                                                : ""
                                                            }

                                                            {
                                                                comment.replies?.length ?
                                                                
                                                                    comment.replies.map(reply => (
                                                                        <div key={reply.id} id={`comment-${reply.id}`} className={`${style['comment']} ${style['reply-to']}`}>
                                                                            <div className={style['thumbnail']}>
                                                                                <Image 
                                                                                    property
                                                                                    crossOrigin="anonymous"
                                                                                    decoding="async"
                                                                                    width={40}
                                                                                    height={40}
                                                                                    src={reply.author_avatar_urls[48]} 
                                                                                    alt={reply.author_name} 
                                                                                /> 
                                                                            </div>
                                                                            <div className={style['comment-content']}>
                                                                                <div className={style['comment-details']}>
                                                                                    <span className={style['name']}>{Helper.UppercaseName(reply.author_name)}</span>
                                                                                    <FontAwesomeIcon icon={faReply} className={style['icon-reply-to']} />
                                                                                    <span className={style['date']}>{Helper.formatDate(reply.date)}</span>
                                                                                </div>
                                                                                <div 
                                                                                    className={`${style['comment-text']} ${style['reply-to-text']}`}
                                                                                    dangerouslySetInnerHTML={{__html: reply.content.rendered}}
                                                                                />  
                                                                            </div>
                                                                        </div>
                                                                    ))

                                                                : ""
                                                            } 

                                                            {
                                                                (comment._links?.children?.length && !comment?.replies?.length) ?
                                                                <Link onClick={e => load_more_replies(e, comment.id)} className={style.load_more_replies} href={'#'}>Show all replies to this comment.</Link> : ""
                                                            }
                                                            
                                                        </div>
                                                        
                                                    </div>   
                                                </div>
                                            ))
                                        }
                                          
                                    </div>  
                                    
                                    {
                                        upcoming.comments.paging.page >= upcoming.comments.paging.total_pages ?
                                        <span className={style.nomorecommentsfound}>No more comments are found!</span>
                                        :<div onClick={loadMoreComments} className={`${style.view_more_comments} ${style.load_more_cmt}  ${style.load_more_commnt}`}>
                                            <a>
                                                {
                                                    enableLoadMoreComments ?
                                                    <span className={style.loader}></span>: 
                                                    'Load More Comments'
                                                }
                                            </a> 
                                        </div> 
                                    }
                                    

                                    
                                </div> 
                            : ""
                        }
                        
                        
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
        
        {/* Login Box */}
        <LoginPopUpBox open={open} setOpen={setOpen} />

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


        // Getting comments of this post 
        ///wp-json/wp/v2/comments?per_page=1&page=1&parent=0&post=34
        /*Helper.sendWPRequest({
            api: `wp-json/wp/v2/comments?per_page=1&page=1&parent=0&post=34`,
            method: "get",
            data: {}
        });*/

        

        // Wait for all requests to resolve
        const comment_response = await Promise.all([
            Helper.sendWPRequest({
                api: `wp-json/wp/v2/comments?per_page=5&page=1&parent=0&post=${single_post.data.id}`,
                method: "get",
                data: {}
            }),
            Helper.sendWPRequest({
                api: `wp-json/wp/v2/comments?parent=0&post=${single_post.data.id}`,
                method: "get",
                data: {}
            }) 
        ]);

        // Parse JSON from each response
        const comments_data = await Promise.all(comment_response.map(response => response.json()));

        // convert link to main site url 
        var new_comments_data = comments_data[0].map(x => {
            x.link = x.link.replace("authors.flatcoding.com", "flatcoding.com/blog") 
            return x;
        });

        // http://localhost:3002/blog/install-react-xyz/?comment_id=28#comment-28
        if( context.query?.comment_id ) {
            
            var reqs = await Helper.sendWPRequest({
                api: `wp-json/wp/v2/comments/${context.query?.comment_id}`,
                method: "get",
                data: {}
            });

            var first_comment = await reqs.json();
            if( ! first_comment.data ) {
                new_comments_data = [first_comment, ...new_comments_data.filter(x => x.id != first_comment.id )];
            } 
        }


        var total_pages = Math.ceil( comments_data[1].length / 5 );
        var comments = { 
            all: new_comments_data,
            paging: {
                counts: comments_data[1].length,
                page: 1,
                comments_per_page: 5,
                total_pages: total_pages
            }
        }
        
        

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
            single_post,

            // comments
            comments

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
