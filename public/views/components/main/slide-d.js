import Head from "next/head";
import { Helper } from "../../services/helper";

const Slide_D = ({ data, urls, link, styles }) => {
    const anId = Helper.generateRandomStrings();
    const title = data?.title || "Discover the Power of Coding";
    const subtitle = data?.subtitle || "Learn, Build, and Grow";
    const description = data?.description || "Explore the latest in technology and innovation with our curated coding tutorials.";
    const button = link?.url ? link : { text: 'Start Learning', url: '#' };
    
    // Default URL sets if none are provided
    const url_sets = urls || [
        { link: '#', url: 'https://placehold.co/600x800', alt: 'First image' },
        { link: '#', url: 'https://placehold.co/600x800', alt: 'Second image' },
    ];

    let stylesh = '';
    if (styles) {
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

    return (
        <>
            <Head>
                <style amp-custom>
                    {`
                        .page_container-${anId} {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-between;
                            padding: 20px;
                            background: #ffffff;
                            height: 100%;
                            text-align: center;
                            font-family: 'Arial', sans-serif;
                            color: #333;
                        }
                        .header-${anId} {
                            padding: 20px;
                            background: #f5f5f5;
                            border-radius: 15px;
                            margin-bottom: 30px;
                        }
                        .title-${anId} {
                            font-size: 30px;
                            font-weight: bold;
                            line-height: 1.3;
                            color: #2c3e50;
                            margin: 0;
                        }
                        .subtitle-${anId} {
                            font-size: 18px;
                            font-weight: 600;
                            color: #8e44ad;
                            margin: 10px 0;
                        }
                        .highlight {
                            background: #f39c12;
                            color: #fff;
                            padding: 5px 10px;
                            border-radius: 5px;
                        }
                        .description-${anId} {
                            font-size: 16px;
                            color: #555;
                            margin: 15px 0;
                        }
                        .wrapper-${anId} {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 10px;
                            margin: 20px 0;
                            width:100%;
                            padding: 0px 70px;
                        }
                        .wrapper-${anId} > div:nth-of-type(3) {
                            grid-column: 1 / -1;
                            padding: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                            border-radius: 8px;
                            overflow: hidden;
                        }
                        .img-${anId} {
                            border-radius: 5px;
                            width: 100%;
                            height: auto;
                        }
                        .button-container-${anId} {
                            margin-top: 30px;
                        }
                        .button-${anId} {
                            background-color: #2980b9;
                            border-radius: 10px;
                            border: none;
                            color: #ffffff;
                            padding: 15px 25px;
                            font-size: 16px;
                            font-weight: 600;
                            text-decoration: none;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }
                        .button-${anId}:hover {
                            background-color: #3498db;
                        }
                        .footer-${anId} {
                            font-size: 12px;
                            color: #888;
                            margin-top: 20px;
                        }
                        ${stylesh}
                    `}
                </style>
            </Head>
            <amp-story-page id={anId} className={`page-${anId}`}>
                <amp-story-grid-layer template="fill">
                    <div className={`page_container-${anId}`}>
                        <div className={`header-${anId}`}>
                            <h1 className={`title-${anId}`}><span className="highlight">{title}</span></h1>
                            <p className={`subtitle-${anId}`}>{subtitle}</p>
                            <p className={`description-${anId}`}>{description}</p>
                        </div>

                        <div className={`wrapper-${anId}`}>
                            {url_sets.map((x, _k) => (
                                <div key={_k}>
                                    <a href={x.link}>
                                        <amp-img className={`img-${anId}`} src={x.url} width="600" height="800" layout="responsive" alt={x.alt}></amp-img>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className={`button-container-${anId}`}>
                            {button.url && (
                                <a href={button.url} className={`button-${anId}`}>{button.text}</a>
                            )}
                        </div>

                        
                    </div>
                </amp-story-grid-layer>
            </amp-story-page>
        </>
    );
}

export default Slide_D;
