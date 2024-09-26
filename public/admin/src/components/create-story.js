import React, {Component} from "react";
import { NavbarContainer } from "./parts/navbar";
import { SidebarContainer } from "./parts/sidebar";
import { Helper } from "../helper";

class CreateWebStories extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            templates: null 
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
                                    <a>
                                        <img crossOrigin="anonymous" src={x.thumbnail} width="300" height="500"/>
                                    </a>
                                </li>
                            );
                        })
                    }
                    
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div id="app">

                <NavbarContainer />
                <SidebarContainer />

                { this.state.settings != null ? <this.SidebarRightAMPScreens/>: ''}

                <section className="section main-section"> 
                    
                </section> 

                <footer className="footer">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center justify-start space-x-3">
                            <div>
                                © 2021, flatcoding.com
                            </div>

                            <div>
                                <p>Developed By: <a href="/test" target="_blank">Montasser Mossallem</a></p>
                            </div>
                        </div>
                    </div>
                </footer>  
            </div>
        );
    }
}
 
export { CreateWebStories };


