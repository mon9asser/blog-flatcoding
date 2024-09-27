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
            disable_search_engines: false, 
            canonical: '',
            image_cover: '', 
            amp_story_props: {},

            // => slides ( for save )
            screens: [], 
            date_updated: '',


        }
    }

    createNewSlide = (name) => {
        
        var story = {
            screen_object: 'slide', //
            template_name: name,
            data: {} 
        };

        // setup data
        switch( name ) {
            
            case 'layout-1':

                // main data 
                story.data = {
                    slide_template:name,
                    headline: '',
                    paragraph: '',
                    text_styles: {
                        headline: '', 
                        paragraph: ''
                    },
                    link: {
                        text: "Open",
                        url: "#",
                        style: {
                            bg: 'tomato',
                            color: '#fff',
                            other_styles: {  
                                marginTop: '15px',
                                display: 'block',
                                padding: '5px 0px',
                                borderRadius: '5px',
                            }
                        }
                    },
                    media_url: '',
                    overlay:{ 
                        position: 'center', 
                        bg: '#000', 
                        color: '#fff', 
                        custom_styles: {} 
                    },
                    media_cover: {
                        url: '', 
                        poster: ''
                    }
                } 

                break;
            
            case 'layout-2':
                story.data = {
                    slide_template:name,
                    headline: '',
                    paragraph: '',
                    text_styles: {
                        headline: '', 
                        paragraph: ''
                    },
                    link: {
                        text: "Open",
                        url: "#",
                        style: {
                            bg: 'tomato',
                            color: '#fff',
                            other_styles: {  
                                marginTop: '15px',
                                display: 'block',
                                padding: '5px 0px',
                                borderRadius: '5px',
                            }
                        }
                    },
                    media_url: '',
                    overlay:{ 
                        position: 'center', 
                        bg: '#000', 
                        color: '#fff', 
                        custom_styles: {} 
                    },
                    media_cover: {
                        url: '', 
                        poster: ''
                    }
                }
                break;
            
                case 'layout-3':
                    story.data = {
                        slide_template:name,
                        headline: '',
                        paragraph: '',
                        text_styles: {
                            headline: '', 
                            paragraph: ''
                        },
                        link: {
                            text: "Open",
                            url: "#",
                            style: {
                                bg: 'tomato',
                                color: '#fff',
                                other_styles: {  
                                    marginTop: '15px',
                                    display: 'block',
                                    padding: '5px 0px',
                                    borderRadius: '5px',
                                }
                            }
                        },
                        media_url: '',
                        overlay:{ 
                            position: 'center', 
                            bg: '#000', 
                            color: '#fff', 
                            custom_styles: {} 
                        },
                        media_cover: {
                            url: '', 
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
                            headline: '', 
                            paragraph: ''
                        },
                        link: {
                            text: "Open",
                            url: "#",
                            style: {
                                bg: 'tomato',
                                color: '#fff',
                                other_styles: {  
                                    marginTop: '15px',
                                    display: 'block',
                                    padding: '5px 0px',
                                    borderRadius: '5px',
                                }
                            }
                        },
                        media_url: '',
                        overlay:{ 
                            position: 'center', 
                            bg: '#000', 
                            color: '#fff', 
                            custom_styles: {} 
                        },
                        media_cover: {
                            url: '', 
                            poster: ''
                        }
                    }
                    break;
                
        }
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
                                    <a className="add-to-story" href="#" onClick={e => this.createNewSlide(x.name)}>
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

    StoryComponents = () => {
        return (
            <section className="story-components-data">
                <h1>Create a new story</h1>
                <div>
                    
                    <div className="story-basic-info">
                        <b className="story-section-title">Story Basic Informations</b>
                        <div className="row">
                            <div className="md-6">
                               <div className="col-field"> 
                                    <input placeholder="Title" />
                               </div>
                               <div className="col-field"> 
                               <textarea placeholder="Description"></textarea>
                               </div>
                            </div>
                            <div className="md-6"> 
                                <div className="col-field"> 
                                    <input placeholder="Meta Title" />
                               </div>
                               <div className="col-field"> 
                                    <textarea placeholder="Meta Description"></textarea>
                               </div>
                                <div className="col-field flexbox-fields"> 
                                    <label>
                                        <input type="checkbox" />
                                        Enable Beside Meta Title
                                    </label>
                               </div>
                               
                               <div className="col-field flexbox-fields"> 
                                    <label>
                                        <input type="checkbox" />
                                        Allow search engines to show this Article in search results?
                                    </label>
                               </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    render() {
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


