import Head from "next/head";
import { Helper } from "../../services/helper";
  
const Slide_C = ({ data, urls, link, styles }) => {
    const anId = Helper.generateRandomStrings();
    const subtitle = data?.subtitle == undefined ? 'The best of': '';
    const headline = data?.headline == undefined ? "Celebrity Philanthropy": '';
    const paragraph = data?.paragraph == undefined ? "Lorem Ipsum is simply dummy text of the printing.": '';
    const button = link?.url ? link : { text: 'Read more', url: '#' };
    
    // Default URL sets if none are provided
    const url_sets = urls || [
        { link: '#', url: 'https://placehold.co/600x400', alt: '' },
        { link: '#', url: 'https://placehold.co/600x400', alt: '' },
        { link: '#', url: 'https://placehold.co/600x400', alt: '' }
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
                            padding: 45px;
                            color: #333;
                            font-family: 'Arial', sans-serif;
                        }
                        .page_container-${anId} > * {
                            margin-bottom: 20px;
                        }
                        .header-${anId} {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                        }
                        .subtitle-${anId} {
                            font-size: 16px;
                            font-weight: bold;
                            text-transform: uppercase;
                            margin: 0;
                        }
                        .headline-${anId} {
                            font-size: 36px;
                            font-weight: bold;
                            margin: 5px 0;
                            text-transform: capitalize;
                            line-height: 1.2;
                        }
                        .highlight {
                            background: yellow;
                        }
                        .wrapper-${anId} {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 10px;
                        }
                        .wrapper-${anId} > div:nth-of-type(3) {
                            grid-column: 1 / -1; /* Make the third image span both columns */
                        }
                        .img-${anId} {
                            border-radius: 5px;
                            width: 100%;
                            height: auto;
                        }
                        .paragraph-${anId} {
                            font-size: 14px;
                            color: #555;
                        }
                        .page-${anId} {
                            background: #f5f5f5;
                            padding: 20px;
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

                        ${stylesh}
                    `}
                </style>
            </Head>
            <amp-story-page id={anId} className={`page-${anId}`}>
                <amp-story-grid-layer template="vertical">
                    <div className={`page_container-${anId}`}>
                        <div className={`header-${anId}`}>
                            <p className={`subtitle-${anId}`}>{subtitle}</p>
                            <h1 className={`headline-${anId}`}><span className="highlight">{headline.split(" ")[0]}</span> {headline.split(" ").slice(1).join(" ")}</h1>
                        </div>

                        <div className={`wrapper-${anId}`}>
                            {url_sets.map((x, _k) => (
                                <div key={_k}>
                                    {
                                        x.link !== '' ? (
                                            <a href={x.link}>
                                            <amp-img className={`img-${anId}`} src={x.url} width="600" height="400" layout="responsive" alt={x.alt}></amp-img>
                                        </a>
                                        ):(
                                            <amp-img className={`img-${anId}`} src={x.url} width="600" height="400" layout="responsive" alt={x.alt}></amp-img>
                                        )
                                    }
                                </div>
                            ))}
                        </div>

                        <p className={`paragraph-${anId}`}>
                            {paragraph}
                        </p>  

                        {button.url && (
                            <a href={button.url} className={`button-${anId}`}>{button.text}</a>
                        )}
                    </div>
                </amp-story-grid-layer>
            </amp-story-page>
        </>
    )
}


export default Slide_C;
