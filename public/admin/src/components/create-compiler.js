import React, { Component } from "react";
import { Helper } from "../helper.js";

class CreateCompiler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compilers: [],
            selected_compiler: null,
            is_loading: false,
            is_saving: false,
            request_message: "",
            request_status_class: "",
        };
    }

    // Method to fetch compilers
    fetchCompilers = async () => {
        this.setState({ is_loading: true });

        const request = await Helper.sendRequest({
            api: "compilers/get",
            method: "get",
            data: {},
        });

        if (request.is_error) {
            this.setState({
                is_loading: false,
                request_status_class: "error",
                request_message: request.message,
            });
            return;
        }

        this.setState({
            compilers: request.data,
            is_loading: false,
        });
    };

    // Method to handle the delete compiler by ID
    deleteCompiler = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this compiler?");
        if (!confirmDelete) return;

        this.setState({ is_loading: true });

        const request = await Helper.sendRequest({
            api: `compilers/${id}`,
            method: "delete",
        });

        if (request.is_error) {
            this.setState({
                request_status_class: "error",
                request_message: request.message,
                is_loading: false,
            });
            return;
        }

        this.setState({
            request_status_class: "success",
            request_message: "Compiler deleted successfully",
            is_loading: false,
        });

        // Fetch the updated compilers list after deletion
        await this.fetchCompilers();
    };

    // Method to handle the add/update compiler
    saveCompiler = async (e) => {
        e.preventDefault();

        const { selected_compiler } = this.state;

        this.setState({ is_saving: true, request_message: "" });

        const data_to_send = {
            title: selected_compiler.title,
            meta_title: selected_compiler.meta_title,
            meta_description: selected_compiler.meta_description,
            description: selected_compiler.description,
            slug: selected_compiler.slug,
            thumbnail_url: selected_compiler.thumbnail_url,
            language: selected_compiler.language,
            keyphrase: selected_compiler.keyphrase,
            allow_search_engine: selected_compiler.allow_search_engine,
            canonical: selected_compiler.canonical,
            prevent_codes: selected_compiler.prevent_codes,
        };

        // Include the compiler ID if we're updating an existing one
        if (selected_compiler._id) {
            data_to_send.id = selected_compiler._id;
        }

        const request = await Helper.sendRequest({
            api: "compilers/update",
            method: "post",
            data: data_to_send,
        });

        if (request.is_error) {
            this.setState({
                is_saving: false,
                request_status_class: "error",
                request_message: request.message,
            });
            return;
        }

        this.setState({
            is_saving: false,
            request_status_class: "success",
            request_message: "Compiler saved successfully",
        });

        // Refresh the compiler list after save
        await this.fetchCompilers();
    };

    // Handle form field change
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            selected_compiler: {
                ...prevState.selected_compiler,
                [name]: value,
            },
        }));
    };

    // Method to select a compiler for update
    selectCompiler = (compiler) => {
        this.setState({ selected_compiler: compiler });
    };

    componentDidMount = async () => {
        await this.fetchCompilers();
    };

    render() {
        const { compilers, selected_compiler, is_loading, is_saving, request_message, request_status_class } = this.state;

        return (
            <div>
                <h1>Manage Compilers</h1>

                {request_message && (
                    <div className={`notification ${request_status_class}`}>
                        {request_message}
                    </div>
                )}

                <div>
                    <h2>Available Compilers</h2>
                    {is_loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {compilers.map((compiler) => (
                                <li key={compiler._id}>
                                    {compiler.title} ({compiler.language}){" "}
                                    <button onClick={() => this.selectCompiler(compiler)}>Edit</button>
                                    <button onClick={() => this.deleteCompiler(compiler._id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selected_compiler && (
                    <form onSubmit={this.saveCompiler}>
                        <h2>{selected_compiler._id ? "Update Compiler" : "Add New Compiler"}</h2>

                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={selected_compiler.title}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Meta Title</label>
                            <input
                                type="text"
                                name="meta_title"
                                value={selected_compiler.meta_title}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Meta Description</label>
                            <textarea
                                name="meta_description"
                                value={selected_compiler.meta_description}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={selected_compiler.description}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Language</label>
                            <input
                                type="text"
                                name="language"
                                value={selected_compiler.language}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={selected_compiler.slug}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Thumbnail URL</label>
                            <input
                                type="text"
                                name="thumbnail_url"
                                value={selected_compiler.thumbnail_url}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label>Keyphrase</label>
                            <input
                                type="text"
                                name="keyphrase"
                                value={selected_compiler.keyphrase}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label>Allow Search Engine</label>
                            <input
                                type="checkbox"
                                name="allow_search_engine"
                                checked={selected_compiler.allow_search_engine}
                                onChange={(e) => this.handleChange({ target: { name: "allow_search_engine", value: e.target.checked } })}
                            />
                        </div>

                        <div>
                            <label>Canonical</label>
                            <input
                                type="text"
                                name="canonical"
                                value={selected_compiler.canonical}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <button type="submit" disabled={is_saving}>
                            {is_saving ? "Saving..." : "Save Compiler"}
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export { CreateCompiler };
