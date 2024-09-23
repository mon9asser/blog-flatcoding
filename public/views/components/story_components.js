import Head from "next/head";


/**
 * headline
 * paragraph
 * media = { url, type, poster }
 * overlay = {bg, color}
 */
var Slide_Component_One = ({ headline, paragraph, media, overlay }) => {

    var title = headline? headline: 'He is nearing the end of his life';
    var text = paragraph? paragraph: 'Be a strong';
    var _media = media ? media: {url: 'https://images.unsplash.com/photo-1572271460567-b895e00877c7', type: 'image', poster: 'https://images.unsplash.com/photo-1608190824485-94687b2207c7'} 

    var webm_url = '';
    if( _media.url.indexOf('.mp4') != -1 ) {
        webm_url = _media.url.replace(".mp4", '.webm');
    }
     
    var style = overlay ? overlay: {bg: '#000', color: '#fff'}
    
    return (
        <amp-story-page id="cover">
            <amp-story-grid-layer template="fill">
                {
                    _media.type == 'image'? (
                        <amp-img 
                            src={_media.url}
                            width="720"
                            height="1280"
                            layout="responsive"
                            crossorigin="anonymous"
                            animate-in="zoom-out" // Apply zoom-out animation
                            animate-in-duration="1s" // Set the duration of the zoom-out effect
                            alt={title}>
                        </amp-img>
                    ):(
                        <amp-video
                            width="720"
                            height="1280"
                            layout="responsive"
                            autoplay
                            loop
                            controls
                            poster={_media.poster}
                        >
                            <source src={_media.poster.url} type='video/mp4' />
                            <source src={webm_url} type="video/webm" />
                            <div fallback>
                                <p>This browser does not support the video element.</p>
                            </div>
                        </amp-video>
                    )
                }
            </amp-story-grid-layer>
            <amp-story-grid-layer template="verticall">
                <div style={{position: 'absolute', bottom: 25, left: 25, right: 25, color: style.color, background: style.bg, padding: '15px', borderRadius: '5px'}}>
                    <h1 style={{fontFamily: "'Anton', serif", textTransform: "uppercase"}}>{title}</h1>
                    <p style={{fontWeight: 100, marginTop: '10px'}}>{text}</p>
                </div>
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
            
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Anton" />
            </Head>
            <amp-story standalone publisher="Example Publisher" publisher-logo-src="https://example.com/logo.png" poster-portrait-src="https://example.com/poster.jpg">
                <Slide_Component_One 
                    headline = 'this is my title'
                    paragraph= 'this is my paragraph'
                    overlay= {{
                        bg: 'rgba(255,255,255,0.3)',
                        color: '#fff',
                        postion: 'bottom' // top - middle
                    }}
                    media = {{
                        url: 'https://images.unsplash.com/photo-1608190824485-94687b2207c7', 
                        type: 'image',
                        poster: '' 
                    }}
                />  
            </amp-story>
        </>
    )
}
