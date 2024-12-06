
import { Helper } from "@/services/helper.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser'; 
import Image from "next/image.js";
import Header from "./../parts/header.js";
import Footer from "./../parts/footer.js"; 
import { useState } from "react";
import Link from "next/link";
import { AdCompaignBox } from "@/services/components.js";
export async function getServerSideProps(context) {

  const { res } = context;

  try {

    var request = await Helper.sendRequest({
        api: "front/home/get",
        method: "get",
        data: {} 
    });

    if (!request.ok) {
      throw new Error('Server is offline');
    }

    if( request.status != 200) {
      throw new Error('Server is offline');
    }

    var json = await request.json(); 
     
    
    return {
      props: {
        upcoming: json.data ? json.data: undefined
      }
    }

  } catch(error) {
    return { props: { error: 'Server is offline, please try again later.' } };
  }


}

const HomePage = ({ upcoming, adsReady }) => {
  
  console.log(upcoming);
  // server offline
  if( !upcoming || upcoming === undefined ) {
    return <ServerOffline/>
  }

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
                "sameAs": [${upcoming?.social_links}],
                "author": {
                    "@type": "Person",
                    "name": "Montasser Mossallem"
                },
                "description": "${upcoming?.site_meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${upcoming?.site_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${upcoming?.site_logo}"
                    }
                }
            }
    `;
  

  const header_content = parse(upcoming.header);
  const footer_content = parse(upcoming.footer);
  
  
    var SubscribeComponents = () => {
          
      var [email, setEmail] = useState('')
          var [result, setRestult] = useState({
              message: '',
              cls: '', // show
              type: '',  // error - success
              is_pressed: false
          });
          
          var response_results_callback = (obj) => {
              var old_objec = {...result};
              var __keys = Object.keys(obj);
              __keys.map(x => {
                  old_objec[x] = obj[x]
              }); 
              setRestult(old_objec);
          } 

          var send_data = (e) => {
          
              e.preventDefault();
          
              response_results_callback({ 
              is_pressed: true
              }); 
          
              Helper.sendRequest({
              api: 'user/subscribe',
              data: {
                  email: email
              },
              method: 'post'
              }).then( async row => {
              
              var res =  await row.json(); 
              var to_be_state = {};
              to_be_state.message= res.data;
              to_be_state.cls= 'show';
              to_be_state.is_pressed= false;
          
              if( res.is_error ) { 
                  to_be_state.type= 'error';
              } else {
                  to_be_state.type= 'success';
              }
              
              response_results_callback(to_be_state);
          
              setTimeout(() => {
                  response_results_callback({
                  message: '',
                  cls: '',
                  type: ''
                  });
              }, 3000)
          
              });
          
          
          }
      return (
          <div>
              
              <h1 className={`${styles["custom-headline"]} ${styles["section-head"]}`} dangerouslySetInnerHTML={{__html: upcoming.banner_title}} />  
              <p>{upcoming.site_meta_description}</p>
              <div style={{ margin: '0 auto' }}>
              <div className={`${styles['response-msg']} ${styles[result.cls]} ${styles[result.type]}`}>{result.message}</div>
                  <form className={`${styles["set-center"]} ${styles["form-group"]} ${styles["set-focus"]}`} action="/" method="get">
                      <input type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="example@email.com" />
                      <button onClick={send_data} className={`${styles["btn"]} ${styles["primary-btn"]}`} type="submit">
                          {
                              result.is_pressed ?
                              <span className={styles["loader"]}></span>: 
                              'Subscribe'
                          }
                      </button>
                  </form>
              </div>
          </div>
      );
  };

  console.log(upcoming);

  return (
     <>
      <Head>
          <title>{upcoming.site_meta_title}</title>
          <meta name="description" content={upcoming.site_meta_description}/>
          <link rel="canonical" href={upcoming.site_url}/>

          <meta property="og:locale" content="en_US"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content={upcoming.site_meta_title}/>
          <meta property="og:description" content={upcoming.site_meta_description}/>
          <meta property="og:url" content={upcoming.site_url}/>
          <meta property="og:site_name" content={upcoming.site_name}/> 
          
          <meta name="twitter:card" content="summary_large_image"/> 
          <meta property="og:image" content={upcoming.site_thumbnail_url} />
          <meta name="twitter:image" content={upcoming.site_thumbnail_url}/>
          <script
              type="application/ld+json" 
              dangerouslySetInnerHTML={{ __html: jsonLdContent }}
          />
          
          {header_content}
      </Head>
      
      <Header 
        header_options={{
          site_name: upcoming.site_name,
          site_logo: upcoming.site_logo,
          site_url: upcoming.site_url
        }}
        nav_left ={upcoming.main_menu} 
        nav_right={upcoming.main_nav_right}
      />

      <section className={`${styles['hero']} ${styles['white-bg']}`}>
        <div className={`${styles['wrapper-no-padding']} ${styles['offset-left']} ${styles['offset-right']}`}>
          <div className={`${styles['banner-gray']}`}>
            <div className={`${styles['row']} ${styles['offset-left']} ${styles['offset-right']} ${styles['max-1172']} ${styles['mlr--30']} ${styles['ptb-50']} ${styles['section-subscribe']}`}>
              <div className={`${styles['lg-7']} ${styles['md-7']} ${styles['sm-12']} ${styles['flexbox']} ${styles['content-center']} ${styles['items-start']} ${styles['column-direction']} ${styles['p-all-30']}`}>                                      
                { adsReady? <AdCompaignBox position="before_title" data={upcoming.sponsers}/> : ""}
                <SubscribeComponents/>
                { adsReady? <AdCompaignBox position="after_title" data={upcoming.sponsers}/> : ""}
              </div>

              <div className={`${styles['lg-5']} ${styles['md-5']} ${styles['sm-12']} ${styles['flexbox']} ${styles['content-center']} ${styles['items-center']} ${styles['column-direction']} ${styles['p-all-15']}`}>
                <figure> 
                  <Image
                    priority
                    crossOrigin="anonymous"
                    className={'half'}
                    alt={upcoming.banner_title}
                    height={200} 
                    width={320}
                    src={upcoming.banner_image_url}  
                  /> 
                </figure>
              </div> 
            </div>  
          </div>   
        </div>
      </section>   

      <section className={`${styles['white-bg']}`}>

        <div className={`${styles['feature-block']}`}>
          <div className={`${styles['max-1172']} ${styles['offset-left']} ${styles['offset-right']} ${styles['row']} ${styles['plr-15']} ${styles['mlr--30']} ${styles['ptb-50']} ${styles['section-tutorials']}`}>
            <h2 className={`${styles['custom-headline']} ${styles['section-head']} ${styles['text-center']} ${styles['mb-25']} ${styles['mt-25']}`}>Why FlatCoding?</h2>
            <div className={`${styles['row']} ${styles['items-center']} ${styles['content-center']}`}>
              <div className={`${styles['center-icons']} ${styles['sm-6']} ${styles['md-3']} ${styles['lg-3']} ${styles['text-center']} ${styles['p-all-15']}`}>
                <div className={`${styles['flatcoding-icon']}`}>
                  <span className={`${styles['flexbox']} ${styles['items-center']} ${styles['content-center']}`}>
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
                <h5>Free Tutorials</h5>
              </div>
              <div className={`${styles['center-icons']} ${styles['sm-6']} ${styles['md-3']} ${styles['lg-3']} ${styles['text-center']} ${styles['p-all-15']}`}>
                <div className={`${styles['flatcoding-icon']}`}>
                  <span className={`${styles['flexbox']} ${styles['bg2']} ${styles['items-center']} ${styles['content-center']}`}>
                      <svg width="35px" height="35px" viewBox="0 0 56 56" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.64 32.55H8.33C8.95 32.55 9.52 32.18 9.68 31.52L10.34 28.58L13.56 43.48C13.86 44.85 16.09 44.85 16.3 43.46L19.08 25.15L22.35 53.39C22.56 55.08 24.98 55.06 25.11 53.39L28.13 19.72L31.12 53.37C31.28 55.08 33.67 55.08 33.88 53.37L37.14 25.15L39.95 43.48C40.16 44.88 42.37 44.88 42.69 43.48L45.86 28.76L46.55 31.52C46.75 32.28 47.28 32.55 47.9 32.55H54.38C55.29 32.55 56 31.84 56 30.95C56 30.06 55.29 29.33 54.38 29.33H48.9L47.07 22.25C46.66 20.72 44.68 20.72 44.36 22.25L41.53 35.59L38.31 14.56C38.06 12.89 35.75 12.94 35.55 14.58L32.67 39.54L29.52 3.92C29.38 2.21 26.87 2.21 26.71 3.92L23.56 39.54L20.68 14.58C20.5 12.89 18.19 12.89 17.92 14.56L14.7 35.59L11.89 22.25C11.57 20.84 9.54 20.84 9.15 22.25L7.33 29.33H1.64C0.73 29.33 0 30.06 0 30.95C0 31.84 0.73 32.55 1.64 32.55Z"/>
                      </svg>
                  </span>
                </div>
                <h5>Online Compilers</h5>
              </div>
              <div className={`${styles['center-icons']} ${styles['sm-6']} ${styles['md-3']} ${styles['lg-3']} ${styles['text-center']} ${styles['p-all-15']}`}>
                <div className={`${styles['flatcoding-icon']}`}>
                  <span className={`${styles['bg3']} ${styles['flexbox']} ${styles['items-center']} ${styles['content-center']}`}>
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.26 2H16.73C17.38 2 17.96 2.02 18.48 2.09C21.25 2.4 22 3.7 22 7.26V13.58C22 17.14 21.25 18.44 18.48 18.75C17.96 18.82 17.39 18.84 16.73 18.84H7.26C6.61 18.84 6.03 18.82 5.51 18.75C2.74 18.44 1.99 17.14 1.99 13.58V7.26C1.99 3.7 2.74 2.4 5.51 2.09C6.03 2.02 6.61 2 7.26 2Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.58 8.32H17.26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                        <path d="M6.74 14.11H17.27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                        <path d="M7 22H17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                    </svg>
                  </span>
                </div>
                <h5>Solving Problems</h5>
              </div>
              <div className={`${styles['center-icons']} ${styles['sm-6']} ${styles['md-3']} ${styles['lg-3']} ${styles['text-center']} ${styles['p-all-15']}`}>
                <div className={`${styles['flatcoding-icon']}`}>
                  <span className={`${styles['flexbox']} ${styles['bg4']} ${styles['items-center']} ${styles['content-center']}`}>
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
                <h5>Books and Resources</h5>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className={`${styles['white-bg']}`}>

        <div className={`${styles['wrapper-no-padding']}`}>
          <div className={`${styles['max-1172']} ${styles['offset-left']} ${styles['offset-right']} ${styles['row']} ${styles['plr-15']} ${styles['mlr--30']} ${styles['ptb-50']} ${styles['section-tutorials']}`}>
            <div className={`${styles['row']} ${styles['offset-left']} ${styles['offset-right']} ${styles['plr-15']} ${styles['mlr--30']} ${styles['ptb-50']} ${styles['max-1172']}`}>
                <div className={`${styles['header-section']} ${styles['hero']} ${styles['text-center']}`}>  
                  <h2 className={`${styles['custom-headline']} ${styles['section-head']} ${styles['text-center']} ${styles['mb-10']} ${styles['mt-25']}`}>{upcoming.latest_tutorials.homepage_section_title}</h2>
                  <p>{upcoming.latest_tutorials.homepage_section_description}</p>
                </div>
                <div className={`${styles['row']} ${styles['content-center']}`}>
                 {upcoming.latest_tutorials.tutorials.map(tutorial => {

                  return (
                    <div key={tutorial._id} className={`${styles['sm-6']} ${styles['md-4']} ${styles['lg-4']} ${styles['text-center']} ${styles['p-all-15']}`}>
                        <div className={styles['tutorial-box']}>
                            
                            {
                                tutorial?.tutorial_svg_icon != ''? 
                                    <i className={styles['tutorial-thumbs']} dangerouslySetInnerHTML={{__html: tutorial?.tutorial_svg_icon}}/>
                                : ""
                            }
                            
                            <h3>
                                <Link href={tutorial.url}>{tutorial.tutorial_title}</Link>
                                
                                {
                                    tutorial?.selected_category?.name != ''? 
                                    <span className={styles['subtitle']}>{tutorial?.selected_category?.name}</span>: 
                                    ""
                                }
                                
                            </h3>
                            <Link className={styles['floating-all']} href={tutorial.url}></Link>
                        </div>
                    </div>
                  )

                 })}
                </div>
                <Link className={`${styles['see-more-tutorials']}`} href={`${upcoming.site_url}tutorials/`}>See more</Link>
            </div>
          </div>
        </div>

      </section>

      <Footer 
        footer_options={{
          subscribe_title: upcoming.subscribe_title, 
          subscribe_description: upcoming.subscribe_description
        }}
        company_links= {upcoming.company_nav_links}
        follow_links= {upcoming.follow_nav_links}
        nav_links= {upcoming.tags_nav_links} 
      /> 
      {footer_content}
     </>
  );
};

export default HomePage;
