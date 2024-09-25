import Slide_C from "./main/slide-c"

/*
    data = {headline, subtitle, paragraph, intro_paragraph}
    button = {url, text}
    urls = [{link, url, alt}]
    styles = {
        headline,
        page_container
        wrapper
        paragraph
        page
        button
        img
    }
*/

var Layout_7 = ({data, button, urls, styles}) => {

    var obj = !data ? {}: data;

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

    var link = !button ? {}: button;
    
    
    return <Slide_C/>
}


export default Layout_7;
