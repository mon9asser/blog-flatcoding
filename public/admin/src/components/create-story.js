import React, {Component} from "react";
import { NavbarContainer } from "./parts/navbar";
import { SidebarContainer } from "./parts/sidebar";
import { Helper } from "../helper";

class CreateWebStories extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

            // => settings (not for save) 
            settings: null,
            templates: null,
            
            // => general settings for AMP 

            // => (for save)
            title:'',
            description: '',
            meta_description: '',
            is_published: false, 
            enable_search_engine: true, 
            enable_besside_title: true, 
            canonical: '',
            image_cover: '', 
            meta_title: '',

            // => slides ( for save )
            screens: [], 
            date_updated: '',


        }
    }

    createNewSlide = (name, e) => {
        
        e.preventDefault();

        var story = {
            screen_object: 'slide', //
            template_name: name,
            open: false, // expand block of slide 
            data: {} 
        };

        // setup data
        switch( name ) {
            
            case 'layout-1':

                // main data 
                story.data = {
                    slide_template:name,
                    headline: 'He is nearing the end of his life',
                    paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    text_styles: {
                        headline: {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase"}, 
                        paragraph: {}
                    },
                    link: {
                        text: "",
                        url: "",
                        style: { 
                            other_styles: {  
                                backgroundColor: '#EA4C89',
                                color: '#fff',
                                marginTop: '15px',
                                display: 'block',
                                padding: '5px 0px',
                                borderRadius: '5px',
                            }
                        }
                    }, 
                    overlay:{ 
                        position: 'bottom', 
                        custom_styles: {
                            textAlign: 'left',
                            backgroundColor: '#000', 
                            color: '#fff',
                        } 
                    },
                    media_cover: {
                        url: 'https://media.flatcoding.com/learn-to-cod-with-codedtag.webp', 
                        poster: ''
                    }
                } 

                break;
            
            case 'layout-2':
                story.data = {
                    slide_template:name,
                    headline: 'He is nearing the end of his life',
                    paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    text_styles: {
                        headline: {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase", borderLeft: '2px solid #fff', borderRight: '2px solid #fff'}, 
                        paragraph: {}
                    },
                    link: {
                        text: 'Click', 
                        style: {
                            other_styles: { 
                                color: '#fff', 
                                background: '#000', 
                                padding: '3px', 
                                borderRadius: '5px', 
                                width: '100%' 
                            }
                        }
                    }, 
                    overlay:{ 
                        position: 'center', 
                        custom_styles: {
                            textAlign: 'left',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center',
                            background: 'transparent', 
                            color: '#fff'
                        }
                    },
                    media_cover: {
                        url: 'https://media.flatcoding.com/learn-to-cod-with-codedtag.webp', 
                        poster: ''
                    }
                }
                break;
            
            case 'layout-3':
                    story.data = {
                        slide_template:name,
                        headline: 'He is nearing the end of his life',
                        paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        text_styles: {
                            headline: {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase"}, 
                            paragraph: ''
                        },
                        link: {
                            text: "Open",
                            url: "#",
                            style: { 
                                other_styles: {  
                                    textAlign: 'left', 
                                    borderRight: '2px solid #fff',
                                    borderLeft: '2px solid #fff',
                                    background: 'transparent', 
                                    color: '#fff'
                                }
                            }
                        }, 
                        overlay:{ 
                            position: 'center', 
                            custom_styles: {
                                backgroundColor: '#000', 
                                color: '#fff', 
                            } 
                        },
                        media_cover: {
                            url: 'https://media.flatcoding.com/learn-to-cod-with-codedtag.webp', 
                            poster: ''
                        }
                    }
                    break;

            case 'layout-4':
                    story.data = {
                        slide_template:name,
                        headline: '',
                        paragraph: '',
                        text_styles: {
                            headline:  {marginBottom: '15px', display: 'flex', fontFamily: "'Anton', serif", textTransform: "uppercase"}, 
                            paragraph: ''
                        },
                        link: {
                            text: "Open",
                            url: "#",
                            style: {
                                
                                other_styles: {  
                                    background: 'tomato',
                                    color: '#fff',
                                    marginTop: '15px',
                                    display: 'block',
                                    padding: '5px 0px',
                                    borderRadius: '5px',
                                }
                            }
                        }, 
                        overlay:{ 
                            position: 'center',   
                            custom_styles: {
                                textAlign: 'left',
                                background: 'transparent', 
                                color: '#fff'
                            } 
                        },
                        media_cover: {
                            url: 'https://media.flatcoding.com/learn-to-cod-with-codedtag.webp', 
                            poster: ''
                        }
                    }
                    break;
            
            case 'layout-5':
                story.data = {
                    slide_template:name,
                    headline: '',
                    paragraph: '',
                    subtitle: '',
                    intro_paragraph: '',
                    button: {
                        url: '', 
                        text: ''
                    },
                    urls: [], /*{link, url, alt}*/
                    styles: {} /*headline - page_container-wrapper-paragraph-page-button-img*/
                }
                break;
            case 'layout-6':
                story.data = {
                    slide_template:name,
                    headline: '',
                    paragraph: '',
                    subtitle: '',
                    intro_paragraph: '',
                    button: {
                        url: '', 
                        text: ''
                    },
                    urls: [], /*{link, url, alt}*/
                    styles: {} /*headline - page_container-wrapper-paragraph-page-button-img*/
                }
                break;
            case 'layout-7':
                    story.data = {
                        slide_template:name,
                        headline: 'Celebrity Philanthropy',
                        paragraph: 'Lorem Ipsum is simply dummy text of the printing.',
                        subtitle: 'The best of',
                        button: {
                            url: '', 
                            text: ''
                        }
                     }
                    break;
        }
         
        var old_screens = [...this.state.screens];
            old_screens.push(story);

        this.setState({
            screens: old_screens
        })
    }

    async componentDidMount(){

        var [settingsResponse, storyTemplateResponse] = await Promise.all([
            Helper.sendRequest({ api: "settings/get", method: 'GET', data: {} }),
            Helper.sendRequest({ api: "story/templates", method: 'GET', data: {} }),
        ]); 
        
        if(!settingsResponse.is_error) {
            if( settingsResponse.data.length ) {
                this.setState({
                    settings: settingsResponse.data[0],
                    templates: storyTemplateResponse.data
                });
            }
        }
 
        
    }

    SidebarRightAMPScreens = () => {
        
        return (
            <div className="amp-right-sidebar">
                <h2>
                    WebStory Screens
                </h2>
                <ul>
                    
                    {
                        this.state.templates.map( (x, _k) => {
                            return (
                                <li key={_k}>
                                    <img crossOrigin="anonymous" src={x.thumbnail} width="300" height="500"/>
                                    <a className="add-to-story" href="#" onClick={e => this.createNewSlide(x.name, e)}>
                                       + Add
                                    </a>
                                </li>
                            );
                        })
                    }
                    
                </ul>
            </div>
        );
    }

    blockExpandCollapse = (index) => {
         
        var screens = [...this.state.screens];
        if( screens[index] != undefined ) {
            screens[index].open = !screens[index].open; 
        }

        this.setState({
            screens: screens
        })

    }

    deleteStory = (index) => {
        // Log the initial state for debugging purposes
        console.log("Before delete:", this.state.screens);
    
        // Use setState with a function to get the previous state
        this.setState((prevState) => {
            // Filter out the element at the specified index
            const updatedScreens = prevState.screens.filter((_, k) => index !== k);
            
            // Return the new state
            return { screens: updatedScreens };
        }, () => {
            // This callback is executed after the state has been updated.
            console.log("After Delete:", this.state.screens);
        });
    };
    

    StoryComponents = () => { 
        return (
            <section className="story-components-data">
                <h1>Create a new story</h1>
                <div>
                    
                    <div className="story-basic-info">
                        <div className="row">
                            <div className="md-6">
                                 <div>
                                    <b className="story-section-title">Story Basic Informations</b>
                                </div>
                               <div className="col-field"> 
                                    <input onChange={e => this.setState({title: e.target.value})} value={this.state.title} placeholder="Title" />
                               </div>
                               <div className="col-field"> 
                               <textarea onChange={e => this.setState({description: e.target.value})} value={this.state.description} placeholder="Description"></textarea>
                               </div>
                               <div className="col-field"> 
                                    <input onChange={e => this.setState({image_cover: e.target.image_cover})} value={this.state.image_cover} placeholder="Link of Image Cover" />
                               </div>
                               <div className="col-field"> 
                                    <input onChange={e => this.setState({meta_title: e.target.meta_title})} value={this.state.meta_title} placeholder="Meta Title" />
                               </div>
                               <div className="col-field"> 
                                    <textarea onChange={e => this.setState({meta_description: e.target.meta_description})} value={this.state.meta_description} placeholder="Meta Description"></textarea>
                               </div>
                                <div className="col-field flexbox-fields"> 
                                    <label>
                                        <input 
                                            type="checkbox"
                                            onChange={e => this.setState({enable_besside_title: !this.state.enable_besside_title})}
                                            checked={this.state.enable_besside_title}
                                        />
                                        Enable Beside Meta Title
                                    </label>
                               </div>
                               
                               <div className="col-field flexbox-fields"> 
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            onChange={e => this.setState({enable_search_engine: !this.state.enable_search_engine})}
                                            checked={this.state.enable_search_engine}
                                        />
                                        Allow search engines to show this Article in search results?
                                    </label>
                               </div>
                            </div>
                            <div className="md-6"> 
                                <div>
                                    <b className="story-section-title">Story Slides</b>
                                </div>

                                {
                                    

                                    this.state.screens.map( (x, index) => {
                                        return (
                                            <div key={index} className="sotry-block">
                                                <div className="flex-story-head">
                                                    <h2 onClick={e => this.blockExpandCollapse(index)}>Story Title</h2>
                                                    <div className="flex-subtitle">
                                                        <div>
                                                        Type: <b>Layout 1</b>
                                                        </div>
                                                        <span onClick={e => this.deleteStory(index)} className='mdi mdi-trash-can'></span>
                                                    </div>
                                                </div>
                                                <div style={{display: x.open ? 'block': 'none'}} className="flex-story-body">
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Slide Headline</span>
                                                            <input placeholder="Slide Headline" />
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Slide Paragraph</span>
                                                            <textarea placeholder="Slide Paragraph"></textarea>
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Background Media URL</span>
                                                            <input placeholder="Background Media URL" />
                                                        </label>
                                                    </div>
                                                    <div className="col-field">
                                                        <label>
                                                            <span>Video Poster URL (IMAGE)</span> 
                                                            <input placeholder="Video Poster URL (IMAGE)" />
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Button Title</span> 
                                                            <input placeholder="Button Title" />
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Button URL</span> 
                                                            <input placeholder="Button URL" />
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Headline Styles</span>
                                                            <textarea placeholder="Headline Styles"></textarea>
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Paragraph Styles</span>
                                                            <textarea placeholder="Paragraph Styles"></textarea>
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Button Styles (Link) </span>
                                                            <textarea placeholder="Button Styles"></textarea>
                                                        </label>
                                                    </div>
                                                    <div className="col-field"> 
                                                        <label>
                                                            <span>Box Overlay Styles </span>
                                                            <textarea placeholder="Overlay Styles"></textarea>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>   
                                        )
                                    }) 
                                }
                                
                           
                            </div>

                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    render() {

        console.log(this.state.settings)
        return (
            <div id="app">

                <NavbarContainer />
                <SidebarContainer />

                { this.state.settings != null ? <this.SidebarRightAMPScreens/>: ''}
                {
                    this.state.settings != null ?
                    <this.StoryComponents /> : ''
                }
                
                 
            </div>
        );
    }
}
 
export { CreateWebStories };


