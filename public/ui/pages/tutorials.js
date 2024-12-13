
import { Helper } from "@/services/helper.js";
import Config from "@/services/config.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser'; 
import Image from "next/image.js";
import Header from "./../parts/header.js";
import Footer from "./../parts/footer.js"; 
import { useState, Fragment, createElement } from "react";
import Link from "next/link";
import Highlight from 'react-highlight'
import { AdCompaignBox } from "@/services/components.js";
 

export async function getServerSideProps(context) {

    const { res } = context;
  
    try {
  
      var request = await Helper.sendRequest({
          api: "front/tutorials/get",
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

const TutorialsPage = ({ upcoming, adsReady }) => {

    // server offline
    if( !upcoming || upcoming === undefined ) {
        return <ServerOffline/>
    }
    
    var jsonLdContent = `
      {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "${upcoming.post.post_title}",
          "description": "${upcoming.post.meta_description}",
          "url": "${upcoming.site_url}tutorials/",
          "breadcrumb": {
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
                      "name": "${upcoming.post.post_title}",
                      "item": "${upcoming.site_url}tutorials/"
                  }
              ]
          }
      }
  `;

  const header_content = parse(upcoming.header)
  const footer_content = parse(upcoming.footer)
  var header_count = 0;
  var end_section = 0; 
      
    return <>
        <Head>
          <title>{upcoming.site_meta_title}</title>
          <meta name="description" content={upcoming.post.meta_description} />
          {
              upcoming.post.allow_search_engine? "" :
              <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
          }
          
          <link rel="canonical" href={`${upcoming.site_url}tutorials/`}/>
          <meta property="og:locale" content="en_US"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={upcoming.site_meta_title}/>
          <meta property="og:description" content={upcoming.post.meta_description}/>
          <meta property="og:url" content={`${upcoming.site_url}tutorials/`}/>
          <meta property="og:site_name" content={upcoming.site_name}/> 
          <meta property="og:image" content={upcoming.article_thumbnail_url}/>
          <meta name="twitter:card" content="summary_large_image"/> 
          <meta name="twitter:image" content={upcoming.article_thumbnail_url}/>
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

      <div className={`${styles['max-850']} ${styles['offset-left']} ${styles['offset-right']} ${styles['mt-space-long']} ${styles['plr-block']} ${styles['ptb-60']}`}> 
          <header className={`${styles['flexbox']} ${styles['content-center']} ${styles['column-direction']} ${styles['mb-30']}`}>
              <h1 className={`${styles['tutorial-headline']} ${styles['mt-h']}`}>{Helper.decodeHtmlEntities(upcoming.post.post_title)}</h1>
              <div className={`${styles['flexbox']} ${styles['items-center']} ${styles['author-section']} ${styles['mt-5']}`}> 
                  <div className={`${styles['flexbox']} ${styles['content-center']} ${styles['auth-name']}`}>
                      <i>Last Update: { Helper.formatDate(upcoming.post.updated_date)}</i>
                  </div>
              </div>
          </header> 
          <div className={`${styles['lg-2-content']} ${styles['tutorial-content']} ${styles['content-section']}`}>
              {
                
                upcoming.post.blocks.map(x => {
                  if (x.id !== 'header-level-1') {
                    
                    // start switch 
                    switch (x.type) {
                      
                      case 'paragraph':
                        return (
                          <p
                            key={x.id}
                            style={{ textAlign: x?.data?.alignment }}
                            dangerouslySetInnerHTML={{ __html: x?.data?.text }}
                          />
                        );
                      
                      case 'code':
                        return (
                          <Highlight key={x.id} className={styles[x?.data?.language_type]}>
                            {x?.data?.value}
                          </Highlight>
                        );

                      case 'image':
                        var src = x?.data?.file?.url.replace("codedtag.com", "flatcoding.com")
                          return (
                            <figure key={x.id}>
                              <Image
                                priority
                                className={x?.data?.stretched ? styles['full'] : ''}//half
                                alt={x?.data?.caption}
                                height={250}
                                src={src}
                                width={x?.data?.file?.width}
                              />
                            </figure>
                          );
                      
                      case 'header':
                        header_count += 1;
                        return <Fragment key={`${x.id}-block-header`}>
                            <AdCompaignBox isReady={adsReady} position={`before_section_title_${header_count}`} data={upcoming.sponsers}/>
                            {createElement(
                              `h${Math.min(Math.max(x?.data?.level, 1), 6)}`,
                              { key: `${x.id}-heading`, style: { textAlign: x?.data?.alignment } },
                              Helper.decodeHtmlEntities(x?.data?.text)
                            )}
                            <AdCompaignBox isReady={adsReady} position={`after_section_title_${header_count}`} data={upcoming.sponsers}/>
                        </Fragment>;
                      
                      case 'youtubeEmbed':
                        return <LazyLoadYouTube key={x.id} url={x.data?.url} />;
                      case 'delimiter':
                        return <hr key={x.id} />;
                      case 'raw':
                        return (
                          <Highlight key={x.id} className={'html'}>
                            {x?.data?.html}
                          </Highlight>
                        );
                        
                      case 'raw':
                        return (
                          <div className={styles['table-container']}>
                            <table className={styles['table']}>
                                <thead>
                                    {x.data.withHeadings && (
                                        <tr>
                                            {x.data.content[0].map((heading, index) => (
                                                <th key={index}>{Helper.decodeHtmlEntities(heading)}</th>
                                            ))}
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {x.data.content.slice(x.data.withHeadings ? 1 : 0).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} data-label={x.data.withHeadings ? x.data.content[0][cellIndex] : `Column ${cellIndex + 1}`}>
                                                  <span dangerouslySetInnerHTML={{__html: Helper.decodeHtmlEntities(cell)}}/>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        );
                      
                      case 'list':
                        return (
                          <div className={styles['list-container']}>
                              {x.data.style === 'ordered' ? (
                                  <ol>
                                      {x.data.items.map((item, index) => (
                                          <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                                      ))}
                                  </ol>
                              ) : (
                                  <ul>
                                      {x.data.items.map((item, index) => (
                                          <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                                      ))}
                                  </ul>
                              )}
                          </div>
                        );

                        case 'tutorialsList':
                          end_section += 1;
                           return (
                            <Fragment key={`frage-box-${x.id}`}>
                                <div className={`${styles['row']} ${styles['mlr--15']}`} key={x.id}>
                                  {
                                    x.data.tutorials.length ? 
                                    x.data.tutorials.map(item => {
                                      return <div key={item._id} className={`${styles['sm-6']} ${styles['md-4']} ${styles['lg-4']} ${styles['text-center']} ${styles['p-all-15']}`}>
                                        <div className={styles['tutorial-box']}>
                                          {item.tutorial_svg_icon !== '' && (
                                            <i
                                            className={styles['tutorial-thumbs']}
                                            style={{ background: '#2d4756' }}
                                            dangerouslySetInnerHTML={{
                                              __html: item.tutorial_svg_icon,
                                            }}
                                            />
                                          )}
                                          <h3>
                                          <span>{item.tutorial_title}</span>
                                          {item.duration !== '' && (
                                          <span className={styles['subtitle']}>
                                            Duration:- {item.duration}
                                          </span>
                                          )}
                                        </h3>
                                        <Link
                                          className={styles['floating-all']}
                                          href={`${item.url}`}
                                        ></Link>
                                        </div>
                                      </div>
                                    }): ''
                                  }
                                </div> 

                                <AdCompaignBox isReady={adsReady} position={`end_of_category_section_${end_section}`} data={upcoming.sponsers}/>
                            </Fragment>
                           )
                        default:
                          return null;
                        
                    }
                    // end switch 

                  }
                })
              } 
          </div> 
      </div>
              
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

}

export default TutorialsPage;


 