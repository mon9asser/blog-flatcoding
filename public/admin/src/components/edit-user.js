import { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js";

import withRouter from "./parts/with-router.js"; 
import withNavigate from "./parts/with-navigate.js";

class EditUserWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            firstname: "",
            secondname: "",
            password: "",
            confirm_password: "",   
            username: "",
            email: "", 
            about: "",
            rule: 0,
            thumbnail_url: "https://www.gravatar.com/avatar/e1c8bd8b3ba85dc596abba84e0fdbc7ccc2da71d3d5f336020acdaca86ee2c9a?s=200&d=identicon",
            social_links: [],
            title:"",
            allow_appears_in_search_engine: false,
            is_blocked: false,
            send_newsletter: false,
            is_pressed: false,
            show_message: "",
            request_status_class: "",
            request_message: "",
            deletion_confirm_modal_open: false,
            delete_pressed: false,
        };
    }

    load_user_data = async ( by_id = true ) => {

        if(this.props.pramas == undefined || this.props.pramas.user_id == undefined ) {
            this.props.navigate("/dashboard/users")
            return; 
        }

        var user_object = null;

        var user_id = this.props.pramas.user_id;

        var request = await Helper.sendRequest({
            api: `user/get?user_id=${user_id}`,
            method: "get",
            data: {}
        });

        if (!request.is_error && request.data.length === 1) {
            user_object = request.data[0];
        }
         
        if (user_object != null ) {
            this.setState({
                user_id: user_object._id || "",
                firstname: user_object.firstname || "",
                secondname: user_object.secondname || "",
                password: "",
                confirm_password: "",
                title: user_object.title || "",
                username: user_object.username || "",
                email: user_object.email || "",
                about: user_object.about || "",
                rule: user_object.rule || 0,
                thumbnail_url: await Helper.getGravatarUrl(user_object.email),
                social_links: user_object.social_links || [],
                is_blocked: user_object.is_blocked,
                allow_appears_in_search_engine: user_object.allow_appears_in_search_engine || false,
                send_newsletter: user_object.send_newsletter || false
            });
        }
    }

    componentDidMount = async () => {
    
        await this.load_user_data();

    }

    confirmDeletion = () => {
        this.setState({ deletion_confirm_modal_open: true });
    }

    deleteUser = async () => {
        this.setState({ delete_pressed: true });

        try {
            const response = await Helper.sendRequest({
                api: 'user/delete',
                method: 'POST',
                data: { user_id: this.state.user_id }
            });

            if (!response.is_error) {

                this.setState({
                    deletion_confirm_modal_open: false,
                    delete_pressed: false,
                    show_message: "show_message",
                    request_status_class: "success",
                    request_message: "User deleted successfully!",
                });

                // Redirect or handle post-deletion actions
                this.props.navigate("/dashboard/users");
        
                
            } else {
                this.setState({
                    show_message: "show_message",
                    request_status_class: "error",
                    request_message: response.message,
                    delete_pressed: false
                });
            }
        } catch (error) {
            console.error("An error occurred while deleting the user:", error);
            this.setState({
                show_message: "show_message",
                request_status_class: "error",
                request_message: "An error occurred while deleting the user.",
                delete_pressed: false
            });
        }
    }

    setEmailValue = (e) => {
        (async () => {
            var url = await Helper.getGravatarUrl(e.target.value);
            this.setState({ thumbnail_url: url });
        })();

        this.setState({ email: e.target.value });
    }

    setUserTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    add_media_link = () => {
        var link = { social_name: "", social_link: "#" };
        var links = [...this.state.social_links];
        links.push(link);
        this.setState({ social_links: links });
    }

    add_social_name = (text, key) => {
        var links = [...this.state.social_links];
        links[key].social_name = text;
        this.setState({ social_links: links });
    }

    remove_social_link = (key) => {
        var links = this.state.social_links.filter((el, index) => key !== index);
        this.setState({ social_links: links });
    }

    add_social_link = (text, key) => {
        var links = [...this.state.social_links];
        links[key].social_link = text;
        this.setState({ social_links: links });
    }

    save_user = async (e) => {
        e.preventDefault();

        this.setState({ is_pressed: true, show_message: "", request_status_class: "", request_message: "" });

        if (this.state.is_pressed) {
            return;
        }

        if (this.state.email === "" || !Helper.validateEmail(this.state.email)) {
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Please fill with valid email"
            });
            return;
        }

        if (this.state.password !== '' && this.state.confirm_password !== this.state.password) {
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: "Passwords don't match!"
            });
            return;
        }

        var data_object = {
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            secondname: this.state.secondname,
            about: this.state.about,
            rule: this.state.rule,
            title: this.state.title,
            thumbnail_url: this.state.thumbnail_url,
            is_blocked: this.state.is_blocked,
            allow_appears_in_search_engine: this.state.allow_appears_in_search_engine,
            social_links: this.state.social_links
        };

        //console.log(data_object);

        if (this.state.password !== "") {
            data_object.password = this.state.password;
        }

        if (this.state.user_id !== "") {
            data_object.user_id = this.state.user_id;
        }

        var request = await Helper.sendRequest({
            api: "user/create-update",
            method: "post",
            data: { ...data_object },
            is_create: this.state.user_id !== "" ? false : true
        });

        if (request.is_error) {
            this.setState({
                is_pressed: false,
                show_message: "show_message",
                request_status_class: "error",
                request_message: request.message
            });
            return;
        }

        this.setState({
            is_pressed: false,
            show_message: "show_message",
            request_status_class: "success",
            request_message: request.message,
        });

        await this.load_user_data(false);
    }

    render() {
        return (
            <div id="app">
                <NavbarContainer />
                <SidebarContainer />
                <section className="section main-section">
                    <div>
                        <div className="container" style={{ textAlign: "left", paddingLeft: "15px" }}>
                            <h1 style={{ fontSize: "30px", marginBottom: "30px", fontWeight: "bold" }}>User Name</h1>
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                            <div className="md-6" style={{ margin: "0 auto" }}>
                                <div className="block-container">
                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Email (required)</label>
                                        <div className="control">
                                            <input
                                                value={this.state.email}
                                                onChange={e => this.setEmailValue(e)}
                                                className="input" type="text" placeholder="example@gmail.com" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">First Name</label>
                                        <div className="control">
                                            <input
                                                value={this.state.firstname}
                                                onChange={e => this.setState({ firstname: e.target.value })}
                                                className="input" type="text" placeholder="First Name" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Second Name</label>
                                        <div className="control">
                                            <input
                                                value={this.state.secondname}
                                                onChange={e => this.setState({ secondname: e.target.value })}
                                                className="input" type="text" placeholder="Second Name" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input
                                                value={this.state.password}
                                                onChange={e => this.setState({ password: e.target.value })}
                                                className="input" type="password" placeholder="Password" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Confirm Password</label>
                                        <div className="control">
                                            <input
                                                value={this.state.confirm_password} 
                                                onChange={e => this.setState({ confirm_password: e.target.value })}
                                                className="input" type="password" placeholder="Confirm Password" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Username</label>
                                        <div className="control">
                                            <input
                                                value={this.state.username}
                                                onChange={e => this.setState({ username: e.target.value })}
                                                className="input" type="text" placeholder="Username" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Description</label>
                                        <div className="control">
                                            <textarea
                                                value={this.state.about}
                                                onChange={e => this.setState({ about: e.target.value })}
                                                className="input" style={{ minHeight: "100px" }}></textarea>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <label className="label">Rule</label>
                                        </div>
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    value={this.state.rule}
                                                    onChange={e => this.setState({ rule: e.target.value })}
                                                >
                                                    <option value={4}>Author</option>
                                                    <option value={3}>Administrator</option>
                                                    <option value={2}>Contributer</option>
                                                    <option value={1}>Editor</option>
                                                    <option value={0}>Subscriber</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md-6" style={{ margin: "0 auto" }}>
                                <div className="block-container">
                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Thumbnail</label>
                                        <div className="control">
                                            <div className="flexbox items-center gap-20" style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
                                                <img src={this.state.thumbnail_url} alt="" width="64" height="64" />
                                                <input
                                                    value={this.state.thumbnail_url}
                                                    onChange={e => this.setState({ thumbnail_url: e.target.value })}
                                                    className="full-border grey-border" type="text" placeholder="Image Url" style={{ border: "1px solid #ddd", padding: '15px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Title</label>
                                        <div className="control">
                                            <input
                                                value={this.state.title}
                                                onChange={e => this.setUserTitle(e)}
                                                className="input" type="text" placeholder="Example: Web Developer" />
                                        </div>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">Social Media</label>
                                        {
                                            !this.state.social_links.length ?
                                                <div className="control">There are no links, click to add social link</div>
                                                :
                                                this.state.social_links.map((x, index) => (
                                                    <div key={index} className="control" style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                                                        <input value={x.social_name} onChange={e => this.add_social_name(e.target.value, index)} className="input" style={{ flexBasis: "230px" }} type="text" placeholder="Social Name" />
                                                        <input value={x.social_link} onChange={e => this.add_social_link(e.target.value, index)} className="input" type="text" placeholder="Social Page Link" />
                                                        <button onClick={() => this.remove_social_link(index)} className="button red">Remove</button>
                                                    </div>
                                                ))
                                        }
                                        <button onClick={this.add_media_link} className="button tan" style={{ marginTop: "15px", marginLeft: "auto" }}>Add New Media</button>
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">
                                            <input
                                                style={{marginRight: "8px"}}
                                                checked={this.state.allow_appears_in_search_engine}
                                                onChange={e => this.setState({allow_appears_in_search_engine: ! this.state.allow_appears_in_search_engine})}
                                                type="checkbox" />
                                            Allow Appear in Search Engines
                                        </label> 
                                    </div>

                                    <div className="field" style={{ marginTop: "25px" }}>
                                        <label className="label">
                                            <input
                                                style={{marginRight: "8px"}}
                                                checked={this.state.is_blocked}
                                                onChange={e => this.setState({is_blocked: ! this.state.is_blocked})}
                                                type="checkbox" />
                                            Block  user
                                        </label> 
                                    </div>


                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
                        {this.state.request_message}
                    </div>

                    <div className="flex gap-5 sticky-btns space-between">
                        <div className="flex gap-5">
                            <a className="button red" onClick={this.confirmDeletion}>Delete</a>
                            <a className="button light">Visit page</a>
                        </div>
                        <div className="flex gap-5">
                            <a onClick={this.save_user} className="button blue">
                                {
                                    (this.state.is_pressed) ?
                                        <span className="loader"></span> :
                                        "Save"
                                }
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center justify-start space-x-3">
                            <div>© 2021, flatcoding.com</div>
                            <div>
                                <p>Developed By: <a href="https://flatcoding.com/" target="_blank">Montasser Mossallem</a></p>
                            </div>
                        </div>
                    </div>
                </footer>

                <div className={`modal ${this.state.deletion_confirm_modal_open ? "open_this_modal" : ""}`}>
                    <div className="modal-background --jb-modal-close" onClick={() => this.setState({ deletion_confirm_modal_open: false })}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Confirm Deletion</p>
                        </header>
                        <section className="modal-card-body">
                            <p>Are you sure you want to delete this user?</p>
                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={() => this.setState({ deletion_confirm_modal_open: false })} className="button">Cancel</button>
                            <button onClick={this.deleteUser} className="button red">
                                {this.state.delete_pressed ? <span className="loader"></span> : "Confirm"}
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

var EditUserNavigationWrapper = withNavigate(EditUserWrapper);
var EditUser = withRouter(EditUserNavigationWrapper);

export { EditUser };
