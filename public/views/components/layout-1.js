
import Slide_A from "./main/slide-a"


/**
 * 
 *  paragraph={obj.paragraph} 
    headline={obj.headline} 
    text_styles = {headline, paragraph}
    media_cover = {url, poster => case it video}
    overlay={{position: 'center', custom_styles: {}}}
    link={{
        text: "Read More",
        url: "https://eratags.com",
        style: {
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
        position: 'bottom'
    };

    var media = media_cover ? media_cover: {url: ''}; 
    if( media_cover && media_cover.url != undefined && media_cover.url.indexOf('.mp4') != -1 ) {
        // case it video, so bring the ogg src
        media.type = 'video';

    } else {
        media.type = 'image';
    }

    // custom css style
    overlay_objects.custom_styles = {
        textAlign: 'left',
        backgroundColor: '#000', 
        color: '#fff'
    }

    var link = !link_data ? {}: link_data;
    var _styles_txt = text_styles ? text_styles: {}
    if( !_styles_txt || _styles_txt.headline == undefined )
        _styles_txt.headline = {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase"}
    
    return (
        <Slide_A 
            paragraph={obj.paragraph} 
            headline={obj.headline} 
            overlay={overlay_objects}
            link={link}
            media={media}
            text_styles={_styles_txt}
        />
    );
}

export default Layout_1;