import Slide_B from "./main/slide-b"

var Layout_5 = ({textData, link_data, cover_style, text_styles}) => {

    var obj = !textData ? {}: textData;

    if( obj.subtitle == undefined ) { 
        obj.subtitle = "";
    }

    if( obj.headline == undefined ) { 
        obj.headline = "";
    }

    if( obj.intro_paragraph == undefined ) { 
        obj.intro_paragraph = "";
    }

    if( obj.paragraph == undefined ) { 
        obj.paragraph = "";
    }

    var link = !link_data ? {}: link_data;
    
    
    return <Slide_B/>
}


export default Layout_5;
