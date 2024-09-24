import Head from "next/head";
import Layout_1 from './layout-1';


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
            
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Anton" />
            </Head>
            <amp-story standalone publisher="Example Publisher" publisher-logo-src="https://example.com/logo.png" poster-portrait-src="https://example.com/poster.jpg">
                <Layout_1 />
            </amp-story>
        </>
    )
}
