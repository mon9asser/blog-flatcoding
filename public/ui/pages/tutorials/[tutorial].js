import { Helper } from "@/services/helper.js";
import Config from "@/services/config.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser'; 
import Image from "next/image.js";
import Header from "./../../parts/header.js";
import Footer from "./../../parts/footer.js"; 
import { useState, Fragment, createElement } from "react";
import Link from "next/link";
import Highlight from 'react-highlight'
import { AdCompaignBox } from "@/services/components.js";
 

export async function getServerSideProps(context) {
    
    
    try {
  
      var request = await Helper.sendRequest({
          api: `front/tutorial/get?tut_name=${context.params.tutorial}`,
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
      
      // page 404
      if( json.status && json.status == 404 ) {
        return {
            notFound: true,  
        };
      }
      

      return {
        props: {
          upcoming: json.data ? json.data: undefined
        }
      }
  
    } catch(error) {
      return { props: { error: 'Server is offline, please try again later.' } };
    }
  
  
}

export default function tutorial ({upcoming, adsReady}) {
     
    
    // server offline
    if( !upcoming || upcoming === undefined ) {
        return <ServerOffline/>
    }

    console.log(upcoming);
    var json_code_var = `{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "${upcoming.tutorial?.tutorial_title}",
          "author": {
              "@type": "Organization",
              "name": "${upcoming?.site_name}"
          },
          "datePublished": "${upcoming.tutorial?.date_published}",   
          "dateModified": "${upcoming.tutorial?.date_updated}",   
          "description": "${upcoming.site_meta_description}",
          "publisher": {
              "@type": "Organization",
              "name": "${upcoming?.site_name}",
              "logo": {
                  "@type": "ImageObject",
                  "url": "${upcoming?.site_logo}"  
              }
          },
          "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/"
          },
          "url": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/",
          "articleSection": "${upcoming.tutorial?.tag}",
          "keywords": "${upcoming.tutorial?.keyphrase}",
          "image": "${upcoming.tutorial?.thumbnail_url}",
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
                          "name": "Tutorials",
                          "item": "${upcoming.site_url}tutorials/"
                      },
                      {
                          "@type": "ListItem",
                          "position": 3,
                          "name": "${upcoming.tutorial?.tutorial_title}",
                          "item": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/"
                      }  
                  ]
          }
    }`;

    const header_content = parse(upcoming.header)
    const footer_content = parse(upcoming.footer)
    
    var banner_bg = {
      left: '#06162f',
      right: '#1c4033',
      is_gradient: true,
      bg: 'red',
      is_dark: true  
    }

    return <>
      <Head>
        <title>{upcoming.site_meta_title}</title>
        <meta name="description" content={upcoming.site_meta_description} />
        {
            upcoming.tutorial?.options?.hide_from_search_engines ?
            <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
            : ""
        } 

        <link rel="canonical" href={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/`}/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={upcoming.site_meta_title}/>
        <meta property="og:description" content={upcoming.site_meta_description}/>
        <meta property="og:url" content={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/`}/>
        <meta property="og:site_name" content={upcoming.site_name}/> 

        
        <meta property="og:image" content={upcoming.tutorial?.thumbnail_url}/>
        <meta name="twitter:card" content="summary_large_image"/> 
        <meta name="twitter:image" content={upcoming.tutorial?.thumbnail_url}/>
        
        <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{__html: json_code_var}}
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

      <section className={styles.tutorial_banner + ' ' + styles.wrapper} style={{background: banner_bg.is_gradient? `linear-gradient(to right, ${banner_bg.left}, ${banner_bg.right})`: banner_bg.bg}}>
        <div className={styles['max-1170'] + ' ' + styles['section-ptb-25'] +  ' ' + styles['offset-right'] + ' ' + styles['offset-left']}>
          <header className={styles['row']}>
            <div className={styles['md-10'] + ' ' + (banner_bg.is_dark? styles['banner-header-dark']: styles['banner-header-light'])}>
              <div className={styles['tut-title']}>
                <div dangerouslySetInnerHTML={{__html: upcoming.tutorial.tutorial_svg_icon}} />
                <div>
                  <h1>{upcoming.tutorial.tutorial_title}</h1>
                  <p>{upcoming.tutorial.description}</p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      <section className={styles.tutorial_banner + ' ' + styles['section-tabs-navs']}>
        <div className={styles['max-1170'] + ' ' + styles['offset-right'] + ' ' + styles['offset-left']}>
          <div className={styles['row']}>
            <div className={styles['md-8']}>
              {
                upcoming.tabs.length ? (
                  <ul className={styles['tutorials-tabs']}>
                    {upcoming.tabs.map((x, i) => <li key={i}><a className={i == 0 ? styles['active']: ''} href={x.url}>{x.title}</a></li>)}
                  </ul>
                ): ''
              }
            </div>
          </div>
        </div>
      </section>


      <section className={styles['max-1170'] + ' ' + styles['section-ptb-0'] +  ' ' + styles['offset-right'] + ' ' + styles['offset-left']+ ' ' + styles['plr-10']}>
        <div className={styles['mlr--15']}>
          <div className={styles['row']}>
            <div className={styles['md-9']}>
              <div className={styles['plr-15']}>
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
                Column 8 
              </div>
            </div>
            <div className={styles['md-3'] + ' ' + styles['sidebar-right-col']}>
              <div className={styles['sidebar-right']}>
                <div className={styles['plr-15']}>
                  Sidebar Box
                </div>
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
    </>;
}