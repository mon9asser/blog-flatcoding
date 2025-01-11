

import "@/app/theme.css";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer"; 
import Link from "next/link";
import Script from "next/script";
import axios from 'axios'

/*import dynamic from "next/dynamic"; 
const AdCompaignBox = dynamic(() => import("./../services/ad_campaign"), {
    ssr: false,
});
*/
import AdCompaignBox from "./../services/ad_campaign";

import { 
    SubscribeComponents,
    ServerOffline
} from "./../services/components"; 
import { notFound } from "next/navigation";

export default function Home({upcoming, adsReady}){
     
    if(!upcoming) {
        return <ServerOffline/>
    }
    
    //console.log(upcoming);

    var jsonLdContent = `
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "flatcoding",
                "url": "${upcoming?.site_url}",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "${upcoming?.site_url}search?q={search_result}",
                    "query-input": "required name=search_result"
                },
                "sameAs": [${upcoming?.settings?.social_links}],
                "author": {
                    "@type": "Person",
                    "name": "Montasser Mossallem"
                },
                "description": "${upcoming?.settings?.site_meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${upcoming?.settings?.site_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${upcoming?.settings?.site_logo}"
                    }
                }
            }
    `;

    var TutorialsSection = () => {
        return (
            <>
                <div className="header-section text-center">
                    
                    <h2 className="custom-headline section-head text-center mb-25 mt-25">{upcoming.settings?.homepage_section_title}</h2>
                    <p>{upcoming.settings?.homepage_section_description}</p>
                </div>
                
                <div className="row content-center">
                    
                    {
                        upcoming.tutorials?.length ? (
                            upcoming.tutorials.map(tutorial => {
                                return (
                                    <div key={tutorial._id} className="sm-6 md-4 lg-4 text-center p-all-15">
                                        <div className="tutorial-box">
                                            
                                            {
                                                tutorial?.tutorial_svg_icon != ''? 
                                                    <i className="tutorial-thumbs" dangerouslySetInnerHTML={{__html: tutorial?.tutorial_svg_icon}}/>
                                                : ""
                                            }
                                            
                                            <h3>
                                                <Link aria-label={'Go to ' + tutorial.tutorial_title} href={`${upcoming.site_url}tutorials/${tutorial.slug}/`}>{tutorial.tutorial_title}</Link>
                                                
                                                {
                                                    tutorial?.selected_category?.name != ''? 
                                                    <span className="subtitle">{tutorial?.selected_category?.name}</span>: 
                                                    ""
                                                }
                                                
                                            </h3>
                                            <Link aria-label={'Go to ' + tutorial.tutorial_title} className="floating-all" href={`${upcoming.site_url}tutorials/${tutorial.slug}/`}></Link>
                                        </div>
                                    </div>
                                )
                            })
 
                        ): null
                    }

                     
                </div>
            </>
        );
    }

    
    var SiteFeaturesSection = () => {
        return (
            <div className="row content-center">
                {
                    upcoming.settings.site_name == "" ?"": <h2 className="custom-headline section-head text-center mb-25 mt-25">Why {upcoming.settings.site_name} ?</h2>
                } 
                <div className='row items-center content-center'>
                     
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="flatcoding-icon">
                            <span className='flexbox items-center content-center'>
                                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 8C5 5.17157 5 3.75736 5.87868 2.87868C6.75736 2 8.17157 2 11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C19 3.75736 19 5.17157 19 8V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V8Z" stroke="#ffffff" strokeWidth="1.5"/>
                                    <path d="M5 4.08C4.02 4.17 3.37 4.39 2.88 4.88C2 5.76 2 7.17 2 10V14C2 16.83 2 18.24 2.88 19.12C3.37 19.61 4.02 19.83 5 19.92" stroke="#ffffff" strokeWidth="1.5" opacity="0.5"/>
                                    <path d="M19 4.08C19.98 4.17 20.63 4.39 21.12 4.88C22 5.76 22 7.17 22 10V14C22 16.83 22 18.24 21.12 19.12C20.63 19.61 19.98 19.83 19 19.92" stroke="#ffffff" strokeWidth="1.5" opacity="0.5"/>
                                    <path d="M9 13H15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                                    <path d="M9 9H15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M9 17H12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                                </svg>
                            </span>
                            
                        </div>
                        <h3>Free Tutorials</h3>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="flatcoding-icon">
                            <span className='flexbox bg2 items-center content-center'>
                                <svg width="35px" height="35px" viewBox="0 0 56 56" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.64 32.55H8.33C8.95 32.55 9.52 32.18 9.68 31.52L10.34 28.58L13.56 43.48C13.86 44.85 16.09 44.85 16.3 43.46L19.08 25.15L22.35 53.39C22.56 55.08 24.98 55.06 25.11 53.39L28.13 19.72L31.12 53.37C31.28 55.08 33.67 55.08 33.88 53.37L37.14 25.15L39.95 43.48C40.16 44.88 42.37 44.88 42.69 43.48L45.86 28.76L46.55 31.52C46.75 32.28 47.28 32.55 47.9 32.55H54.38C55.29 32.55 56 31.84 56 30.95C56 30.06 55.29 29.33 54.38 29.33H48.9L47.07 22.25C46.66 20.72 44.68 20.72 44.36 22.25L41.53 35.59L38.31 14.56C38.06 12.89 35.75 12.94 35.55 14.58L32.67 39.54L29.52 3.92C29.38 2.21 26.87 2.21 26.71 3.92L23.56 39.54L20.68 14.58C20.5 12.89 18.19 12.89 17.92 14.56L14.7 35.59L11.89 22.25C11.57 20.84 9.54 20.84 9.15 22.25L7.33 29.33H1.64C0.73 29.33 0 30.06 0 30.95C0 31.84 0.73 32.55 1.64 32.55Z"/>
                                </svg>
                            </span>
                            
                        </div>
                        <h3>Online Compilers</h3>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="flatcoding-icon">
                            <span width='30px' className='bg3 flexbox items-center content-center'>
                                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.26 2H16.73C17.38 2 17.96 2.02 18.48 2.09C21.25 2.4 22 3.7 22 7.26V13.58C22 17.14 21.25 18.44 18.48 18.75C17.96 18.82 17.39 18.84 16.73 18.84H7.26C6.61 18.84 6.03 18.82 5.51 18.75C2.74 18.44 1.99 17.14 1.99 13.58V7.26C1.99 3.7 2.74 2.4 5.51 2.09C6.03 2.02 6.61 2 7.26 2Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.58 8.32H17.26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                                    <path d="M6.74 14.11H17.27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                                    <path d="M7 22H17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                                </svg>
                            </span> 
                        </div>
                        <h3>Solving Problems</h3>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="flatcoding-icon">
                            <span className='flexbox bg4 items-center content-center'>
                                <svg width="35px" height="35px" viewBox="0 0 512 512" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="406.324" y="145.007" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -50.3631 87.2844)" width="23.173" height="308.599"/>
                                    <rect x="458.948" y="134.53" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -47.3079 97.3498)" width="23.173" height="308.599"/>
                                    <path d="M0 99.049V457.58h77.646V99.049H0zM54.065 422.886H23.582V133.744h30.482v289.142z"/>
                                    <rect x="108.132" y="219.882" width="98.347" height="237.692"/>
                                    <path d="M108.128 54.422v14.145v120.837h98.343V60.972v-6.55H108.128zM182.275 160.792h-49.949v-30.482h49.949V160.792zM182.275 113.516h-49.949V83.034h49.949V113.516z"/>
                                    <path d="M236.955 457.58h108.191V91.454H236.955V457.58zM255.335 351.716h71.43v30.482h-71.43V351.716zM255.335 398.99h71.43v30.482h-71.43V398.99z"/>
                                </svg>
                            </span> 
                        </div>
                        <h3>Books and Resources</h3>
                    </div>

                </div>
            </div>
        );
    }
     
    const header_content = parse(upcoming.settings.header);
    const footer_content = parse(upcoming.settings.footer);
    const dynamicImageUrl = Helper.generateNextImageUrl(upcoming.settings.banner_image_url);


    return (
       <>
            <Head>
                <title>{upcoming.settings.site_meta_title}</title>
                <meta name="description" content={upcoming.settings.site_meta_description}/>
                <link rel="canonical" href={upcoming.site_url}/> 
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={upcoming.settings.site_meta_title}/>
                <meta property="og:description" content={upcoming.settings.site_meta_description}/>
                <meta property="og:url" content={upcoming.site_url}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/> 
                
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta property="og:image" content={upcoming.settings.site_thumbnail_url} />
                <meta name="twitter:image" content={upcoming.settings.site_thumbnail_url}/>
                <script
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: jsonLdContent }}
                />
                {header_content}  
                
            </Head>
            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />

            <section className="hero white-bg hero">
                <div className="wrapper-no-padding offset-left offset-right">
                    <div className="banner-gray">
                        <div className="row offset-left offset-right max-1172 mlr--30 ptb-50 section-subscribe">
                            <div className={`lg-7 md-7 sm-12 flexbox content-center items-start column-direction p-all-30 ${upcoming.settings.banner_image_url == "" ? 'offset-left offset-right text-center': ''}`}>                                      
                                
                                { adsReady? <AdCompaignBox settings={upcoming.settings} position="before_title" data={upcoming.ads}/> : ""}

                                <SubscribeComponents  
                                    adsReady={adsReady}
                                    camp_data={upcoming.ads}
                                    is_footer={false}
                                    settings={upcoming.settings}
                                    title={upcoming.settings?.banner_site_title}
                                    description={upcoming.settings?.banner_site_description}
                                />
                                
                            </div>
                            
                            {
                                upcoming.settings.banner_image_url == "" ? "" : 
                                <div className="lg-5 md-5 sm-12 flexbox content-center items-center column-direction p-all-15">
                                    <figure> 
                                        {/*
                                        <link
                                            rel="preload"
                                            href={upcoming.settings.banner_image_url}
                                            as="image"
                                            type="image/webp"
                                        />*/}
                                        <Image
                                            crossOrigin="anonymous"
                                            className={'half'}
                                            alt={upcoming.settings.banner_site_title || 'FlatCoding.com Banner'}
                                            height={360}
                                            width={640}
                                            src={upcoming.settings.banner_image_url} // This will be dynamically processed by Next.js
                                            decoding="async"
                                            priority={true}
                                            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 320px"                                          
                                        /> 
                                    </figure>
                                </div> 
                            }
                            
                            
                        </div>
                    </div>
                    <div className="feature-block">
                        <div className="max-1172 offset-left offset-right row plr-15 mlr--30 ptb-50 section-tutorials">
                            { adsReady? <AdCompaignBox settings={upcoming.settings} position="before_section_2" data={upcoming.ads}/>: ""} 
                            <SiteFeaturesSection/>
                            { adsReady? <AdCompaignBox settings={upcoming.settings} position="after_section_2" data={upcoming.ads}/>: ""}
                        </div>
                    </div>
                    <div className="row offset-left offset-right plr-15 mlr--30 ptb-50 max-1172">

                        { adsReady ? <AdCompaignBox settings={upcoming.settings} position="before_section_3" data={upcoming.ads}/>: '' }
                        <TutorialsSection/>
                        { adsReady ? <AdCompaignBox settings={upcoming.settings} position="after_section_3" data={upcoming.ads}/>: "" }
                    
                    </div> 
                </div>
            </section> 

            <Footer 
                settings={upcoming.settings}
                menus={{
                    company_links: upcoming.company_links,
                    follow_links: upcoming.follow_links,
                    nav_links: upcoming.nav_links, 
                }}
            />

            {footer_content}
       </>
    )
}



export async function getServerSideProps(context) {

   
    try {
            var request = await Helper.sendRequest({
                api: "home-page/get",
                method: "get",
                data: {} 
            })
        
          if (!request.ok) {
              throw new Error('Server is offline');
          }
      
          var upcoming = {};
        
          if( request.status == 200) {
        
              var json = await request.json(); 
              
              var site_url = json.data.settings.site_address;
              if(site_url) {
                    var url_array = site_url.split('/');
                    if( url_array[url_array.length - 1] != '' ) {
                        site_url = site_url + '/';
                    }
              } 
              
              json.data.settings.site_address = site_url;
        
              if( json.data.settings.site_meta_title != '' ) {
                json.data.settings.site_meta_title = `${json.data.settings.site_meta_title} ${json.data.settings.beside_post_title}`;
              }
              
              // prepare lists from menu 
              var nav_left = json.data.menus?.filter( x=> x.menu_name === "main_menu")
              var nav_right = json.data.menus?.filter( x=> x.menu_name === 'main_nav_right');
              var company_links = json.data.menus?.filter( x=> x.menu_name === "company_nav_links")
              var follow_links = json.data.menus?.filter( x=> x.menu_name === 'follow_nav_links');
              var nav_links = json.data.menus?.filter( x=> x.menu_name === 'tags_nav_links');
              
              var posts = json.data.posts.filter(x => x.post_type == 0);
              if(posts.length) {
                posts = posts.slice(-6)
              }
 
              

              upcoming = {
                // latest_posts: posts, 
                tutorials: json.data.tutorials,
                //posts: json.data.posts,              
                settings: json.data.settings,
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url: site_url || null,
                menus: json.data.menus,              
                ads: json.data.ads
              };
        
          }
          
          return {
            props: {upcoming}
          }
    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
  
}
    