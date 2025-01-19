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


import Config from "./../../services/config";
 


import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



export default function Tag({upcoming}) {
    
    
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
            
            <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']} ${style['paddingt-10']}`}>
                <div className={`${style.row} ${style['mlr--15']}`}>
                    <div className={`${style['lg-8']} ${style['md-8']} ${style['sm-12']} ${style['plr-15']} ${style['ptb-15']}`}>
                         
                        <div id='posts-wrap'> 
                            <div className={style.blog_post_wrap}>
                                

                                <div className={style['entry-header']}>
                                    <h1 className={`${style["tutorial-headline"]}`}>Google Correlate: The Best SEO Research Tool You Aren’t Using</h1>    
                                    <div className={`${style['entry-meta']} ${style['post-entry-meta']}`}>
                                        <Link href={'#'} className={style.author}>
                            
                                            <span
                                                className={`${style['authot-thumb']} ${style['pbt-lazy']}`}
                                                data-image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w72-h72-p-k-no-nu/p9.jpg"
                                                style={{
                                                    backgroundImage:
                                                        "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu)",
                                                }}
                                            ></span> 
                                            <span>David Albert</span>
                                        </Link>

                                        <span className={style["entry-time mi"]}>
                                            <span className={style["sp"]}>•</span>
                                            <time className={style["published"]} dateTime="2021-07-12T18:44:00Z">July 12, 2021</time>
                                        </span>
                                    </div>
                                </div>
                                
                                <div className={`${style['entry-content']} ${style['single--content']}`}> 
                                    
                                    <Image
                                        className={`half`} // half
                                        alt={'Image Thumbnail'}
                                        height={250}
                                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ8rOtkqEIxqewg0Hf6316slN0X6r6BHAq3ts8so38Hal6NBkhsqQkLWX4-3HdO6P-dip6MhuZTn2Jd9aOn61byzUjTVGPyer22bUZrKSeW86TjDE6SEtfbgDh_wb51EGchYrszDsm9gM/w99-h66-p-k-no-nu/p9.jpg=w72-h72-p-k-no-nu" 
                                        width={750}
                                    />

                                    <p>This is an example post content area. Here, you can share engaging articles, stories, and updates with your audience.</p>
                                    <p>This is an example post content area. Here, you can share engaging articles, stories, and updates with your audience.</p>
                                    <p>This is an example post content area. Here, you can share engaging articles, stories, and updates with your audience.</p>
 
                                    <h2>Key Features:</h2>
                                    <ul>
                                        <li>High-quality content</li>
                                        <li>Engaging visuals</li>
                                        <li>Responsive design</li>
                                    </ul>

                                    
                                    <h2>Steps to Success:</h2>
                                    <ol>
                                        <li>Plan your content strategy</li>
                                        <li>Create valuable posts</li>
                                        <li>Engage with your readers</li>
                                    </ol>

                                    
                                    <blockquote>
                                        <p>"Content is king, but engagement is queen, and the lady rules the house!"</p>
                                    </blockquote>

                                     
                                    <h2>Watch Our Introduction Video:</h2>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" frameborder="0" allowFullScreen></iframe>

                                    
                                    <h2>Sample Code Snippet:</h2>
                                    <pre><code>
                                        ${`function greetUser() {
                                            console.log("Hello, WordPress World!");
                                        }`}
                                    </code></pre>
 

                                    
                                    <h2>Comparison Table:</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Free Plan</th>
                                                <th>Pro Plan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Storage</td>
                                                <td>1 GB</td>
                                                <td>10 GB</td>
                                            </tr>
                                            <tr>
                                                <td>Support</td>
                                                <td>Email</td>
                                                <td>Priority Email & Phone</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                            

                                </div>
                                <div className={`${style['entry-labels']} ${style['list-tags']}`}>
                                    <span className={style["labels-label"]}>Tags:</span>
                                    <a className={style["label-link"]} href="https://starter-pbt.blogspot.com/search/label/Content%20Marketing" rel="tag">Content Marketing</a>
                                    <a className={style["label-link"]} href="https://starter-pbt.blogspot.com/search/label/Editor%27s%20Picks" rel="tag">Editor's Picks</a>
                                    <a className={style["label-link"]} href="https://starter-pbt.blogspot.com/search/label/SEO%20News" rel="tag">SEO News</a>
                                </div>

                                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                                    {
                                        upcoming?.share_social_buttons == '' ? ''
                                        : 
                                        <>
                                            <div className={`${style['flexbox']} ${style['gap-15']} ${style['share-box']} ${style['article-share-box']}`}> 
                                                <SocialShare   
                                                    platforms={upcoming?.share_social_buttons} 
                                                    url={`https://tutorials/tutorials/post/`}
                                                    title={'Post Title'}
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
                                <span></span>
                            </div>
                            <div>
                                <h5>David Albert</h5>
                                <p>
                                    Pro Blogger Templates is a site where you find unique and professional blogger templates, Improve your blog now for free.
                                </p>
                                <ul className={`${style['social-icons']} ${style['social-bg']} ${style['social-author-icons']}`}>
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
                                </ul>
                            </div>
                        </div> 

                        {/*Add a New Comments*/}
                        <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                            <div className={`${style['comments-sectison']} ${style['join_us_to_comment']}`}>
                                <h3>
                                    Add a New Comment
                                </h3>
                               <a className={style.post_comment}>Add Comment</a> 
                            </div>
                        </div>

                        {/*Add a New Comments*/}
                        <div className={`${style.widget} ${style.remove_spaces} ${style.comments}`}>
                            <div className={style['comments-sectison']}>
                                <h3>
                                    Add a New Comment
                                </h3>
                                <AddNewComment thumbnail={true}/>  
                            </div>
                        </div>
                        
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
                api: "wp-json/custom/v1/related-posts?post_slug=install-react-xyz&number_of_posts=2",
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
                api: "wp-json/custom/v1/post-by-slug?post_slug=node-js-nvm",
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
