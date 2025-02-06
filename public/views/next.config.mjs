/** @type {import('next').NextConfig} */
import os from 'os';

const nextConfig = { 
    i18n: {
        locales: ['en'],  
        defaultLocale: 'en',
    },
    reactStrictMode: true,
    productionBrowserSourceMaps: true, 
    trailingSlash: true,  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Matches any hostname
        },
        {
          protocol: 'http',
          hostname: '**', // Matches any hostname
        },
      ],
    },  
    
    async rewrites() {
        return [
          {
            source: '/sitemap_articles.xml',
            destination: '/api/sitemap_articles',
          },
          {
            source: '/sitemap_pages.xml',
            destination: '/api/sitemap_pages',
          },
          {
            source: '/sitemap_users.xml',
            destination: '/api/sitemap_users',
          },
          {
            source: '/sitemap_tutorials.xml',
            destination: '/api/sitemap_tutorials',
          }, 
          
          {
            source: '/sitemap_tabs.xml',
            destination: '/api/sitemap_tabs',
          }, 

          {
            source: '/sitemap_index.xml',
            destination: '/api/sitemap_index',
          }, 

          {
            source: '/sitemap_blog_users.xml',
            destination: '/api/sitemap_blog_users',
          }, 
          {
            source: '/sitemap_blog_categories.xml',
            destination: '/api/sitemap_blog_categories',
          },
          {
            source: '/sitemap_blog_tags.xml',
            destination: '/api/sitemap_blog_tags',
          },
          {
            source: '/sitemap_blog_posts.xml',
            destination: '/api/sitemap_blog_posts',
          },
          {
            source: '/sitemap_blog_pages.xml',
            destination: '/api/sitemap_blog_pages',
          },


          {
            source: '/robots.txt',
            destination: '/api/robots',
          }, 
          
          {
            source: '/ads.txt',
            destination: '/api/ads',
          }, 

          
        ];
    },
    
    async redirects() {
        var api_key = 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132';
    
        try {
            var httHashReq = await fetch("https://api.flatcoding.com/hash-request", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "agent": 'User Agent Data'
                }
            });
    
            var hash_json = await httHashReq.json();
            //console.log('Hash Request Response:', hash_json);
    
            if(hash_json.is_error) {
                return [];
            }
    
            var token = hash_json.data;
    
            var redirect_http = await fetch("https://api.flatcoding.com/redirects", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "authorization": token
                }
            });
            
            var responseText = await redirect_http.text();
             
            //console.log('Redirects Response Text:', responseText);
    
            // Check if responseText is valid JSON
            try {
                var json = JSON.parse(responseText);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                return [];
            }
    
            if(json.is_error) {
                return [];
            }
    
            var redirects = json.data;
            if(!redirects.length) {
                return [];
            }
    
            redirects = redirects.map(x => { 
                return {
                    source: x.from,
                    destination: x.to,
                    permanent: parseInt(x.redirectType) == 301 ? true : false,
                };
            });
            
            redirects.push({
              source: "/%5E[a-zA-Z0-9_]%20$/",
              destination: '/',
              permanent: true,
            });
 
            return redirects;
    
        } catch (error) {
            console.error('Error in redirects function:', error);
            return [];
        }
    },
     
};

export default nextConfig;
