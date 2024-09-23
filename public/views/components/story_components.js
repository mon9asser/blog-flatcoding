import Head from "next/head";

var Slide_Component_One = ({ data }) => {
    return (
        <amp-story-page id="cover">
            <amp-story-grid-layer template="vertical">
                <h1>The Joy of Pets</h1>
                    <amp-img 
                        src="https://media.flatcoding.com/learn-to-cod-with-codedtag.webp" 
                        width="720" 
                        height="1280" 
                        layout="responsive" 
                        alt="Pet Joy"
                    >
                    <p>this is a new webstory</p>
                </amp-img>
            </amp-story-grid-layer>
        </amp-story-page>
    )
}

export default function Story() {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <title>AMP Image Example</title> 
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
                <script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
            </Head>
            <amp-story standalone>
                <Slide_Component_One data={{ title: 'The Joy of Pets' }} />  
            </amp-story>
        </>
    )
}
