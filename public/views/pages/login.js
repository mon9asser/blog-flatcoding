import {useState, useEffect, useRef } from 'react';
import style from './../public/css/style.css';
import { Helper } from '../services/helper';
import {CreateCaptcha} from "./../services/components";
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';

export default function login() {

    var [generatedCaptcha, setGenerateCaptcha] = useState(null);
    var [loginSuccess, setLoginSuccess] = useState('');
    var [password, setPassword] = useState('');
    var [email, setEmail] = useState('');
    var [captcha, setCaptcha] = useState('');
    var [loading, setLoading] = useState(false); 
    var [error, setError] = useState('')

    
    useEffect(() => {
        
        var cookie = Cookies.get(Helper.user_cookie);
         
        // check session exists
        if (cookie) {
            window.location.href = '/dashboard';
            return;
        }

        // store result of capcha
        setGenerateCaptcha(Helper.generateCaptcha()); 

    }, []);


    var loginProccess = async (e) => { 
        
        e.preventDefault();
        setLoading(true);
        setError('');

        // checking captcha
        if( captcha == '' ) {
            setError('Captcha is required to login');
            setLoading(false);
            return false;
        }

        var gCaptcha = generatedCaptcha.replace(/\s+/g, '');
        if( captcha != gCaptcha  ) { 
            setError('Captcha is not correct!');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }

        // check user inuts 
        if(password == '' || email == '') {
            setError('User credentials are required.');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }
        
        // validate email 
        var email_validator = Helper.validateEmail(email);
        if( !email_validator ) {
            setError('Email not valid.');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }

        // clean user inputs before send 
        var sanitizePassword = DOMPurify.sanitize(password);
        var sanitizeEmail = DOMPurify.sanitize(email);
        
        var data_object = { 
            password: sanitizePassword, 
            email_username: sanitizeEmail
        }

        var request = await Helper.sendRequest({
            api: "user/login",
            method: "post",
            data: data_object
        });
        
        var req = await request.json();
        if(req.is_error) {

            setError(req.message);
             
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);

            return false;

        }

        // Success Login 
        setError('');
        setLoginSuccess(req.message);
        setLoading(false); 
        
        // Store Cookie 
        Cookies.set(Helper.user_cookie, JSON.stringify( req.data ), { expires: 7, secure: true, sameSite: 'Strict' });
        
        // redirect 
        window.location.href = '/dashboard';

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
                                                        <label className="form-check-label" htmlFor="basic_checkbox_1">Remember me</label>
                                                    </div>
                                                </div>
                                                {/*
                                                <div className="form-group">
                                                    <a href="/">Forgot Password?</a>
                                                </div>*/}
                                            </div>

                                            {error != '' && <div className="alert alert-danger">{error}</div>}
                                            {loginSuccess != '' && <div className="alert alert-success">{loginSuccess}</div>}

                                            <div className="text-center">
                                                <button onClick={loginProccess} type="submit" className="btn btn-primary btn-block default-btn">
                                                    {loading ? "Please wait ...": "Login"}
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p>Don't have an account? <a className="text-primary" href="/register">Sign up</a></p>
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
