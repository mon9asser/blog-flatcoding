
import Slide_A from "./main/slide-a"


/**
 * Image in BG 
 * Caption
 */


var Layout_1 = ({data}) => { 
    
    var obj = !data ? {}: data;

    if( obj.paragraph == undefined ) { 
        obj.paragraph = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.";
    }

    if( obj.headline == undefined ) { 
        obj.headline = "He is nearing the end of his life";
    }


    return (
        <Slide_A 
            paragraph={obj.paragraph} 
            headline={obj.headline} 
            overlay={{position: 'center', bg: '#000', color: '#fff'}}
        />
    );
}

export default Layout_1;