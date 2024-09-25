
import Slide_A from "./main/slide-a"


/**
 * 
 *  paragraph={obj.paragraph} 
    headline={obj.headline} 
    text_styles = {headline, paragraph}
    media_cover = {url, poster => case it video}
    overlay={{position: 'center', bg: '#000', color: '#fff', custom_styles: {}}}
    link={{
        text: "Read More",
        url: "https://eratags.com",
        style: {
            bg: 'tomato',
            color: '#fff',
            other_styles: { => custom styles
                marginTop: '15px',
                display: 'block',
                padding: '5px 0px',
                borderRadius: '5px',
            }
        }
    }}
 */


var Layout_1 = ({textData, link_data, overlay, media_cover, text_styles}) => { 
    
    var obj = !textData ? {}: textData;

    if( obj.paragraph == undefined ) { 
        obj.paragraph = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    }

    if( obj.headline == undefined ) { 
        obj.headline = "He is nearing the end of his life";
    }
    
    var overlay_objects = overlay ? overlay: {
        position: 'center', 
        bg: 'transparent', 
        color: '#fff'
    };

    var media = media_cover ? media_cover: {url: ''}; 
    if( media_cover && media_cover.url != undefined && media_cover.url.indexOf('.mp4') != -1 ) {
        media.type = 'video';
    } else {
        media.type = 'image';
    }

    // custom css style
    overlay_objects.custom_styles = {
        textAlign: 'left',
        display: 'flex',
        gap: '15px',
        alignItems: 'center'
    }

    var link = {};
    var link_obj = !link_data ? {}: link_data;
    if( link_obj.url != undefined )
        link = {text: 'Click', style: {color: '#fff', bg: '#000', other_styles: { padding: '3px', borderRadius: '5px', width: '100%' }}, ...link_obj}

    var _styles_txt = text_styles ? text_styles: {}
    if( !_styles_txt || _styles_txt.headline == undefined )
        _styles_txt.headline = {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase", borderLeft: '2px solid #fff', borderRight: '2px solid #fff'}
    
    return (
        <Slide_A 
            paragraph={obj.paragraph} 
            headline={obj.headline} 
            overlay={overlay_objects}
            link={link}
            media={media}
            text_styles={_styles_txt}
            text_mode={{
                headline: 'vertical'
            }}
        />
    );
}

export default Layout_1;