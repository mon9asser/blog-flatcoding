import Head from "next/head";


/**
 * headline
 * paragraph
 * media = { url, type, poster }
 * overlay = {bg, color, position= bottom center top auto}
 * link = {
            position: 'bottom', // top - center - bottom - auto
            text: '',
            url: '',
            style: {
                bg: 'red',
                color: '#fff'
            }
        }
 */
var Slide_Component_One = ({ headline, paragraph, media, overlay, link }) => {

    var title = headline != undefined ? headline: 'He is nearing the end of his life';
    var text = paragraph != undefined ? paragraph: 'Be a strong';
    var _media = media ? media: {url: 'https://images.unsplash.com/photo-1572271460567-b895e00877c7', type: 'image', poster: 'https://images.unsplash.com/photo-1608190824485-94687b2207c7'} 

    var webm_url = '';
    if( _media.url.indexOf('.mp4') != -1 ) {
        webm_url = _media.url.replace(".mp4", '.webm');
    }
     
    var style = overlay ? overlay: {bg: '#000', color: '#fff', position: 'auto'}
    var position = {}
    var link_position = {}
    if( style.position == 'bottom' ) {
        position = {
            position: 'absolute', 
            bottom: 25, 
            left: 25, 
            right: 25,
        }
    } else if ( style.position == 'top' ) {
        position = {
            position: 'absolute', 
            top: 25, 
            left: 25, 
            right: 25,
        }
    } else if ( style.position == 'center' ) {
        position = {
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    }



    if( link.position == 'bottom' ) {
        link_position = {
            position: 'absolute',
            bottom: 5, 
            left: 25, 
            right: 25,
            color: 'green'
        }
    } else if( link.position == 'center' ) {
        link_position = {
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    } else if( link.position == 'top' ) {
        link_position = {
            position: 'absolute', 
            top: 25, 
            left: 25, 
            right: 25,
        }
    }

    var Link_Data = () => {

        if( link ) {
            
            var stylish = {};
            if( link.style && link.style.bg != undefined ) {
                stylish.background = link.style.bg;
            }
            if( link.style && link.style.color != undefined ) {
                stylish.color = link.style.color;
            }
            return <a style={{...stylish, textAlign:'center', ...link_position, padding: '0px 20px'}} href={link.url}>{link.text}</a>
        }

        return null;
    } 


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
                            <source src={_media.url} type='video/mp4' />
                            <source src={webm_url} type="video/webm" />
                            <div fallback>
                                <p>This browser does not support the video element.</p>
                            </div>
                        </amp-video>
                    )
                }
            </amp-story-grid-layer>
            <amp-story-grid-layer template="verticall">
                
                <div style={{...position, color: style.color, background: style.bg, padding: '15px', borderRadius: '5px'}}>
                    <h1 style={{fontFamily: "'Anton', serif", textTransform: "uppercase"}}>{title}</h1>
                    <p style={{fontWeight: 100, marginTop: '10px'}}>{text}</p> 
                </div>

                <Link_Data/>
                
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
                    paragraph= 'this is learn'
                    overlay= {{
                        bg: 'transparent',
                        color: 'tan',
                        position: 'bottom' // top - center - bottom - auto
                    }}
                    media = {{
                        url: 'https://plus.unsplash.com/premium_photo-1706625661544-cf6ad6902f57', 
                        type: 'image',  
                    }}
                    link = {{
                        position: 'auto', // top - center - bottom - auto
                        text: '',
                        url: 'https://facebppk.com' 
                    }}
                />
                
                <Slide_Component_One 
                    headline = 'this is my title'
                    paragraph= 'this is learn'
                    overlay= {{
                        bg: 'transparent',
                        color: '#000',
                        position: 'bottom' // top - center - bottom - auto
                    }}
                    media = {{
                        url: 'https://www.w3schools.com/html/mov_bbb.mp4', 
                        type: 'video',  
                    }}
                    link = {{
                        position: 'top', // top - center - bottom - auto
                        text: 'this is link',
                        url: '',
                        style: {
                            bg: 'red',
                            color: '#fff'
                        }
                    }}
                />  
            </amp-story>
        </>
    )
}
