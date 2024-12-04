
import { Helper } from "@/services/helper.js";
import styles from "@/public/css/index.module.css";
import Head from "next/head";
import { ServerOffline } from "@/services/components.js";
import parse from 'html-react-parser' 

import Header from "./../parts/header.js";
import Footer from "./../parts/footer.js"; 

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
  
   
  // Render homepage content if the server is online
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
          
          {parse(upcoming.header)}
      </Head>
      
      <Header 
          header_data={{
            site_address: upcoming.site_address, 
            site_logo: upcoming.site_logo, 
            site_name: upcoming.site_name 
          }} 
          nav_left={'upcoming.nav_left'} 
          nav_right={'upcoming.nav_right'} 
      />


     </>
  );
};

export default HomePage;
