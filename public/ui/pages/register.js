import {useState, useEffect, useRef } from 'react';
import style from "@/public/css/index.module.css";
import { Helper } from '../services/helper';
import {CreateCaptcha} from "./../services/components";
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';


export default function register() {

    var [generatedCaptcha, setGenerateCaptcha] = useState(null);
    var [captcha, setCaptcha] = useState('');
    var [userData, setUserData] = useState({
        username: "",
        firstname: "",
        secondname: "",
        password: "",
        confirm_password: "", 
        email: "", 
    })
    var [loading, setLoading] = useState(false); 
    var [error, setError] = useState('')
    var [loginSuccess, setLoginSuccess] = useState('');


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

    console.log(userData);
    var updateState = ( key, value ) => {
        var old = {...userData};
        old[key] = value;
        setUserData(old);
    }

    var registerProccess = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError('');

        // checking captcha
        if( captcha == '' ) {
            setError('Please confirm that you are not a robot');
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
        if(userData.password == '' || userData.confirm_password == "" || userData.email == '' || userData.firstname == "" || userData.secondname == "" || userData.username == "" ) {
            setError('Please make sure you filled all inputs!');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }

        if( userData.password != userData.confirm_password ) {
            setError('The password does not match the confirm password; please ensure both fields are identical.');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }

        // validate email 
        var email_validator = Helper.validateEmail(userData.email);
        if( !email_validator ) {
            setError('Email not valid.');
            // generate a new captcha
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);
            return false;
        }

        // clean user inputs before send 
        var sanitizePassword = DOMPurify.sanitize(userData.password);
        var sanitizeEmail = DOMPurify.sanitize(userData.email);
        var sanitizeFirstName = DOMPurify.sanitize(userData.firstname);
        var sanitizeSecondName = DOMPurify.sanitize(userData.secondname);
        var sanitizeUserName = DOMPurify.sanitize(userData.username);

        var object_data = {
            username: sanitizeUserName,
            firstname: sanitizeFirstName,
            secondname: sanitizeSecondName,
            full_name: sanitizeFirstName + " " + sanitizeSecondName,
            password: sanitizePassword,
            confirm_password: userData.confirm_password,
            email: sanitizeEmail,
        }

        var request = await Helper.sendRequest({
            api: "user/register",
            method: "post",
            data: object_data
        });
        
        var req = await request.json();

        if(req.is_error) {

            setError(req.message);
             
            setGenerateCaptcha(Helper.generateCaptcha());
            setLoading(false);

            return false;

        }

        // Success register 
        setError('');
        setLoginSuccess(req.message);
        setLoading(false); 

        // Store Cookie 
        Cookies.set(Helper.user_cookie, JSON.stringify( req.data ), { expires: 7, secure: true, sameSite: 'Strict' });
        
        // redirect 
        window.location.href = '/dashboard';
    }

    return (
        <div className="authincation h-100">
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
                                    <h4 className="text-center mb-4">Sign up your account</h4>
                                    
                                    <form>
                                        <div className="form-group">
                                            <label><strong>First Name</strong></label>
                                            <input value={userData.firstname} onChange={e => updateState('firstname', e.target.value)} type="text" className="form-control" placeholder="Your First Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Last Name</strong></label>
                                            <input value={userData.secondname} onChange={e => updateState('secondname', e.target.value)} type="text" className="form-control" placeholder="Your Last Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Email</strong></label>
                                            <input value={userData.email} onChange={e => updateState('email', e.target.value)} type="email" className="form-control" placeholder="hello@example.com"/>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Username</strong></label>
                                            <input value={userData.username} onChange={e => updateState('username', e.target.value)} type="text" className="form-control" placeholder="Your Username"/>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Password</strong></label>
                                            <input value={userData.password} onChange={e => updateState('password', e.target.value)} type="password" placeholder="Password" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Confirm Password</strong></label>
                                            <input value={userData.confirm_password} onChange={e => updateState('confirm_password', e.target.value)} type="password" placeholder="Confirm Password" className="form-control"/>
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

                                        {error != '' && <div className="alert alert-danger">{error}</div>}
                                        {loginSuccess != '' && <div className="alert alert-success">{loginSuccess}</div>}

                                        <div className="text-center mt-4">
                                            <button onClick={registerProccess} type="submit" className="btn btn-primary btn-block default-btn">
                                                {loading ? "Please wait ...": "Signup"}
                                            </button> 
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Already have an account? <a className="text-primary" href="/login">Sign in</a></p>
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