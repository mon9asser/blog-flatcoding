import Head from "next/head";
import { Helper } from "../../services/helper";
  
var Slide_B = ({ data, urls, link, styles }) => {
    
    var anId = Helper.generateRandomStrings();
    var headline = "Our Coding Blog";
    var paragraph = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

    var subtitle = 'Welcome to';
    var intro_paragraph = "Here are the latest topics:"
    
    var button = {};
    var stylesh = ''; 
    if( styles != undefined ) {
        for (const [selector, styleObj] of Object.entries(styles)) {
            let styleString = '';
            for (const [key, value] of Object.entries(styleObj)) {
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                styleString += `${cssKey}: ${value}; `;
            }
            stylesh += `.${selector}-${anId} { ${styleString.trim()} } `;
        }
        stylesh = stylesh.trim();
    }

    if( link && link.url != undefined ) {
        button = link;
        if( button.text == undefined )
            button.text = 'Read more'
    }

    var url_sets = urls ? urls: [
        {
            link: '#',
            url: 'https://placehold.co/600x400',
            alt: ''
        },
        {
            link: '#',
            url: 'https://placehold.co/600x400',
            alt: ''
        },
        {
            link: '#',
            url: 'https://placehold.co/600x400',
            alt: ''
        },
        {
            link: '#',
            url: 'https://placehold.co/600x400',
            alt: ''
        },
        {
            link: '#',
            url: 'https://placehold.co/600x400',
            alt: ''
        }
    ]; 
    
    if(data && data.intro_paragraph != undefined ) {
        intro_paragraph = data.intro_paragraph;
    }

    if(data && data.headline != undefined ) {
        headline = data.headline;
    }

    if(data && data.paragraph != undefined ) {
        paragraph = data.paragraph;
    }

    if(data && data.subtitle != undefined ) {
        subtitle = data.subtitle;
    }

    
    return (
        <>
            <Head>
                <style amp-custom>
                    {`
                        .page_container-${anId} {
                            padding: 45px;
                        }
                        .page_container-${anId} > * {
                            margin-bottom: 20px;
                        }
                        .wrapper-${anId} {
                            padding:0 !important;
                            margin-left:0;
                            margin-right:0;
                            flex-wrap: wrap;
                            gap: 13px;
                            display: flex;  
                            justify-content: space-between; 
                            align-items: center;                               
                        }

                        .wrapper-${anId} a {
                           flex: 1;
                           flex-basis: ${(url_sets && url_sets.length > 2) ? '25%': '45%'}; 
                        } 
 
                        .headline-${anId} {
                            color: #fff;
                            font-family: 'Anton', serif;
                            text-transform: uppercase;
                            font-size: 25px;
                        }

                        .paragraph-${anId} {
                            font-weight: 100;  
                            color: #fff;
                        } 

                        .page-${anId} {
                            background:#222;
                        }
 
                        .button-${anId} {
                            background-color: #EA4C89;
                            border-radius: 8px;
                            border-style: none;
                            box-sizing: border-box;
                            color: #FFFFFF;
                            cursor: pointer;
                            display: inline-block;
                            font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: 500;
                            height: 40px;
                            line-height: 20px;
                            list-style: none;
                            margin: 0;
                            outline: none;
                            padding: 10px 16px;
                            position: relative;
                            text-align: center;
                            text-decoration: none;
                            transition: color 100ms;
                            vertical-align: baseline;
                            user-select: none;
                            -webkit-user-select: none;
                            touch-action: manipulation;
                        }

                        .button-${anId}:hover,
                        .button-${anId}:focus {
                            background-color: #F082AC;
                        }

                        .img-${anId} {
                            border-radius:3px;
                        }
                            
                        ${stylesh}
                    `}
                    
                </style>
            </Head>
            <amp-story-page id={anId} className={`page-${anId}`}>
                
                <amp-story-grid-layer template="fill">
                     <div className={`page_container-${anId}`}>

                        <div>
                            <p className={`paragraph-${anId}`}>{subtitle}</p>
                            <h1 className={`headline-${anId}`}>{headline}</h1>
                        </div>

                        <p className={`paragraph-${anId}`}>
                            {intro_paragraph}
                        </p>
                            
                        {
                            url_sets.length? (
                                <div className={`wrapper-${anId}`}>
                                    {url_sets.map( (x, _k) => {

                                        return (
                                            x.link != '' ? <a key={_k}  href={x.link}><amp-img className={`img-${anId}`} src={x.url} width="180" height="180" layout="responsive" alt={x.alt}></amp-img></a>: 
                                            <amp-img className={`img-${anId}`} src={x.url} width="180" height="180" layout="responsive" alt={x.alt}></amp-img>
                                        )
                                    })}
                                </div>
                            ): ''
                        }

                        <p className={`paragraph-${anId}`}>
                            {paragraph}
                        </p>
                        
                        {
                            button.url != undefined?
                                <a href={button.url} className={`button-${anId}`}>{button.text}</a>
                            : ''
                        }
                        
                            
                     </div>
                </amp-story-grid-layer> 

                
            </amp-story-page>
        </>
    )
}



export default Slide_B;
