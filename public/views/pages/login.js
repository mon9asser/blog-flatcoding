import {useState, useEffect, useRef } from 'react';
import style from './../public/css/style.css';
import { Helper } from '../services/helper';
import {CreateCaptcha} from "./../services/components";

export default function login() {

    var [generatedCaptcha, setGenerateCaptcha] = useState(null);

    var [password, setPassword] = useState('');
    var [email, setEmail] = useState('');
    var [captcha, setCaptcha] = useState(null);
    var [loading, setLoading] = useState(false); 

    useEffect(() => {

        // store result of capcha
        setGenerateCaptcha(Helper.generateCaptcha()); 

    }, []);


    var loginProccess = () => {

        setLoading(true);

    }


    return (
        <div className="authincation h-100 mt-10">
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <h4 className="text-center mb-4">Sign in your account</h4>
                                        <form>
                                            <div className="form-group">
                                                <label><strong>Email</strong></label>
                                                <input 
                                                    type="email" 
                                                    placeholder="Email"
                                                    className="form-control" 
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><strong>Password</strong></label>
                                                <input 
                                                    type="password" 
                                                    placeholder="Password"
                                                    className="form-control"  
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className='form-inline d-flex justify-content-between mt-4 mb-2'>
                                                <div className='form-group'>
                                                    <input 
                                                        type="text"
                                                        placeholder="Write Captcha Here" 
                                                        className="form-control"  
                                                        value={captcha}
                                                        onChange={e => setCaptcha(e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className='form-group'>
                                                    <CreateCaptcha value={generatedCaptcha} />
                                                </div>
                                            </div>
                                            <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                <div className="form-group">
                                                    <div className="form-check ml-2">
                                                        <input className="form-check-input" type="checkbox" id="basic_checkbox_1"/>
                                                        <label className="form-check-label" for="basic_checkbox_1">Remember me</label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <a href="page-forgot-password.html">Forgot Password?</a>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={loginProccess} type="submit" className="btn btn-primary btn-block">
                                                    {loading ? "Please wait ...": "Login"}
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p>Don't have an account? <a className="text-primary" href="./page-register.html">Sign up</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
