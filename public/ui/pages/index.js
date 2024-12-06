
import { Helper } from "@/services/helper.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser' 
import Image from "next/image.js";
import Header from "./../parts/header.js";
import Footer from "./../parts/footer.js"; 
import { useState } from "react";
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

const HomePage = ({ upcoming }) => {

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

      <section className={`${styles['hero']} ${styles['white-bg']} ${styles['hero']}`}>
        <div className={`${styles['wrapper-no-padding']} ${styles['offset-left']} ${styles['offset-right']}`}>
          <div className={`${styles['banner-gray']}`}>
            <div className={`${styles['row']} ${styles['offset-left']} ${styles['offset-right']} ${styles['max-1172']} ${styles['mlr--30']} ${styles['ptb-50']} ${styles['section-subscribe']}`}>
            <div className={`${styles['lg-7']} ${styles['md-7']} ${styles['sm-12']} ${styles['flexbox']} ${styles['content-center']} ${styles['items-start']} ${styles['column-direction']} ${styles['p-all-30']}`}>                                      
                <SubscribeComponents/>
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
