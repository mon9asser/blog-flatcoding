import { Helper } from "../../services/helper";
/**
 * headline
 * paragraph
 * media = { url, type, poster }
 * overlay = {bg, color, position= bottom center top auto}
 * text_mode = {headline, paragraph} // vertical - horizontal
 * text_styles = {headline, paragraph}
 * link = {
            position: 'bottom', // top - center - bottom - auto
            text: '',
            url: '',
            style: {
                bg: 'red',
                color: '#fff', 
                other_styles => css styles
            }
        }
 */

 
var Slide_A = ({ headline, paragraph, media, overlay, link, text_mode, text_styles }) => {
    
    var title = headline != undefined ? headline: 'He is nearing the end of his life';
    var text = paragraph != undefined ? paragraph: 'Be a strong';
    var _media = media ? media: {
        url: '', 
        type: 'image', 
        poster: ''
    } 

    var webm_url = '';
    if( _media.url.indexOf('.mp4') != -1 ) {
        webm_url = _media.url.replace(".mp4", '.webm');
    }
        
    var style = overlay ? overlay: {position: 'auto'}
    
    var custom_styles = {};
    if( style.custom_styles != undefined ) {
        custom_styles = style.custom_styles;
    }
    
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
            var other_styles = {};
            if( link.style && link.style.bg != undefined ) {
                stylish.background = link.style.bg;
            }

            if( link.style && link.style.color != undefined ) {
                stylish.color = link.style.color;
            }

            if( link.style && link.style.other_styles != undefined ) {
                other_styles = link.style.other_styles;
            }

            
            return <a style={{...stylish, ...other_styles, textAlign:'center', ...link_position}} href={link.url}>{link.text}</a>
        
        }

        return null;
    } 

    var styling = text_styles && text_styles.headline ? text_styles: {
        headline: {fontFamily: "'Anton', serif", textTransform: "uppercase"},
        paragraph: { fontWeight: 100, marginTop: '10px' }
    }

    var anId = Helper.generateRandomStrings()
    return (
        <amp-story-page id={anId}>
            {
                _media.url != "" ? (
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
                ): ""
            }
            

            <amp-story-grid-layer template="verticall">
                
                <div style={{...position,  padding: '15px', borderRadius: '5px', ...custom_styles}}>
                    <h1 style={{...styling.headline, ...headline_text_mode}}>{title}</h1>
                    <p style={{...styling, ...paragraph_text_mode}}>{text}</p> 
                    <Link_Data/>
                </div>
                
            </amp-story-grid-layer>
        </amp-story-page>
    )
}



export default Slide_A;
