import Head from "next/head";
import { Helper } from "./../services/helper";

var AdSense = ({AdSense}) => {
    var anId = Helper.generateRandomStrings()

    return (
        <>
            <Head>
                <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
                <style amp-custom>
                    {`
                        .ad-page-${anId} {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #ffffff;
                            height: 100vh; /* Full page height */
                            margin: 0;
                            padding: 0;
                        }
                        .ad-container {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .ad-container amp-ad {
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    `}
                </style> 
            </Head>
            <amp-story-page id={`ad-page-${anId}`} className={`ad-page-${anId}`}>
                <amp-story-grid-layer template="fill">
                    <div className="ad-container" style={{flexDirection: 'column'}}>
                        <amp-ad 
                            width="100vw" 
                            height="100vw" 
                            type="adsense"
                            data-ad-client="ca-pub-xxxxxxxxxxx"
                            data-ad-slot="xxxxxxxxxxx"
                            data-auto-format="rspv"
                            data-full-width="">
                        <div overflow=""></div>
                        </amp-ad>
                    </div>
                </amp-story-grid-layer>
            </amp-story-page>
        </>
    );
}


export default AdSense;
