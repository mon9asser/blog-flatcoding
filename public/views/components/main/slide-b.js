import Head from "next/head";
import { Helper } from "../../services/helper";
  
var Slide_B = ({ data, styles, orders, urls }) => {
    
     
    var url_sets = urls ? urls: [
        {
            link: 'https://facebook.com',
            url: 'https://images.unsplash.com/photo-1727162334294-170987f6b31b',
            alt: ''
        },
        {
            link: 'https://twitter.com',
            url: 'https://images.unsplash.com/photo-1727162334294-170987f6b31b',
            alt: ''
        },
        {
            link: '#https://tumblr.com',
            url: 'https://images.unsplash.com/photo-1727162334294-170987f6b31b',
            alt: ''
        },
        {
            link: 'https://news.com',
            url: 'https://images.unsplash.com/photo-1727162334294-170987f6b31b',
            alt: ''
        },
        {
            link: 'https://setter.com',
            url: 'https://images.unsplash.com/photo-1727162334294-170987f6b31b',
            alt: ''
        }, 
    ]; 
 
    var anId = Helper.generateRandomStrings()
    return (
        <>
            <Head>
                <style amp-custom>
                    {`
                        .amp-data-container {
                            padding: 45px;
                        }
                        .amp-data-container > * {
                            margin-bottom: 20px;
                        }
                        .flex-container {
                            flex-wrap: wrap;
                            gap: 20px;
                            display: flex;  
                            justify-content: space-between; 
                            align-items: center;                               
                        }
                        .flex-container a {
                           flex: 1;
                           flex-basis: ${(url_sets && url_sets.length > 2) ? '25%': '45%'}; 
                        } 
 
                        .headline {
                            color: #fff !important;
                            font-family: 'Anton', serif;
                            text-transform: uppercase;
                            font-size: 25px;
                        }

                        .paragraph {
                            font-weight: 100;  
                            color: #fff;
                        }
                      
                        .button-data {
                            display: block; 
                            padding: 8px 15px;
                            border-radius: 3px;
                            color: #fff;
                            background: blue;
                        }

                        .full_page {
                            background:teal;
                        }
                    `}
                    
                </style>
            </Head>
            <amp-story-page id={anId} className='full_page'>
                
                <amp-story-grid-layer template="fill">
                     <div className="amp-data-container">

                        <div>
                            <p className="paragraph">Welcome to</p>
                            <h1 className="headline">Our programming blog</h1>
                        </div>

                        <p className="paragraph">
                            Here are latest topics:
                        </p>
                            
                        {
                            url_sets.length? (
                                <div className="flex-container">
                                    {url_sets.map( (x, _k) => <a key={_k}  href={x.link}><amp-img className='flex-image' src={x.url} width="180" height="180" layout="responsive" alt={x.alt}></amp-img></a>)}
                                </div>
                            ): ''
                        }

                        <p className="paragraph">
                            In AMP Stories, if you want to achieve the object-fit: cover; effect for images, you should use the layout="fill" attribute on your.
                        </p>
                        
                        <a href="#data" className="button-data">Visit Our Site</a>
                            
                     </div>
                </amp-story-grid-layer> 

                
            </amp-story-page>
        </>
    )
}



export default Slide_B;
