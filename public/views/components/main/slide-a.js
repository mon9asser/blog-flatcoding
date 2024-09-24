import { Helper } from "../../services/helper";
/**
 * headline
 * paragraph
 * media = { url, type, poster }
 * overlay = {bg, color, position= bottom center top auto}
 * text_mode = {headline, paragraph} // vertical - horizontal
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

 
var Slide_A = ({ headline, paragraph, media, overlay, link, text_mode }) => {

    var title = headline != undefined ? headline: 'He is nearing the end of his life';
    var text = paragraph != undefined ? paragraph: 'Be a strong';
    var _media = media ? media: {
        url: 'https://images.unsplash.com/photo-1572271460567-b895e00877c7', 
        type: 'image', 
        poster: 'https://images.unsplash.com/photo-1608190824485-94687b2207c7'
    } 

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

    if( link && link.position == 'bottom' ) {
        link_position = {
            position: 'absolute',
            bottom: 5, 
            left: 25, 
            right: 25,
            color: 'green'
        }
    } else if( link && link.position == 'center' ) {
        link_position = {
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    } else if(link && link.position == 'top' ) {
        link_position = {
            position: 'absolute', 
            top: 25, 
            left: 25, 
            right: 25,
        }
    }


    var headline_text_mode = {}
    var paragraph_text_mode = {}

    if( text_mode && text_mode.headline != undefined ) {
        if( text_mode.headline == 'vertical') {
            headline_text_mode = {
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textWrap: 'balance'
            };
        }
    }

    if( text_mode && text_mode.paragraph != undefined ) {
        if( text_mode.paragraph == 'vertical') {
            paragraph_text_mode = {
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textWrap: 'balance'
            };
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


    var anId = Helper.generateRandomStrings()
    return (
        <amp-story-page id={anId}>
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
                    <h1 style={{fontFamily: "'Anton', serif", textTransform: "uppercase", ...headline_text_mode}}>{title}</h1>
                    <p style={{fontWeight: 100, marginTop: '10px', ...paragraph_text_mode}}>{text}</p> 
                    <Link_Data/>
                </div>
                
            </amp-story-grid-layer>
        </amp-story-page>
    )
}



export default Slide_A;
