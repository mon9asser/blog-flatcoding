import {useState, useEffect, useRef } from 'react';
// import style from './../public/css/admin.module.css';

import styles from "@/public/focus/css/style.module.css";

// D:\flatcoding.com\public\ui\public\focus\css\style.css
import { Helper } from '../services/helper';
import {CreateCaptcha} from "./../services/components";
import loginIcon from "@/public/icons/icon-login.gif";
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';
import Image from 'next/image';
export default function login() {

    var [generatedCaptcha, setGenerateCaptcha] = useState(null);
    var [loginSuccess, setLoginSuccess] = useState('');
    var [password, setPassword] = useState('');
    var [email, setEmail] = useState('');
    var [captcha, setCaptcha] = useState('');
    var [loading, setLoading] = useState(false); 
    var [error, setError] = useState('')

    
    useEffect(() => {
        
        // store result of capcha
        setGenerateCaptcha(Helper.generateCaptcha()); 

        var cookie = Cookies.get(Helper.user_cookie);
         
        // check session exists
        if (cookie) {
            window.location.href = '/dashboard';
            return;
        }  

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
        <div className={`${styles['authincation']} ${styles['h-100']} ${styles['mt-10']}`}>
            <div className={`${styles['container-fluid']} ${styles['h-100']}`}>
                <div className={`${styles['row']} ${styles['justify-content-center']} ${styles['h-100']} ${styles['align-items-center']}`}>
                    <div className={styles['col-md-4'] + ' ' + styles['mx-width']}>
                        <div className={styles['authincation-content']}>
                            <div className={`${styles['row']} ${styles['no-gutters']}`}>
                                <div className={styles['col-xl-12']}>
                                    <div className={styles['auth-form']}>

                                        <div className={styles['headlogin']}>
                                            <Image 
                                                alt={'Login to your account'}
                                                width="25" 
                                                height="25"
                                                src={loginIcon}  
                                                priority
                                            /> 

                                            <h4 className={`${styles['text-center']} ${styles['mb-4']}`}>Sign in your account</h4>
                                        </div>
                                        <form>
                                            <div className={styles['form-group']}>
                                                <label>Email</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="Email"
                                                    className={styles['form-control']}
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label>Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="Password"
                                                    className={styles['form-control']}
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className={`${styles['form-inline']} ${styles['mb-space-btn']} ${styles['rm-mt']} ${styles['d-flex']} ${styles['justify-content-between']} ${styles['mt-4']} ${styles['mb-2']}`}>
                                                <div className={styles['form-group']}>
                                                    <input 
                                                        type="text"
                                                        placeholder="Write Captcha Here" 
                                                        className={styles['form-control']}
                                                        value={captcha}
                                                        onChange={e => setCaptcha(e.target.value)}
                                                    />
                                                </div>
                                                <div className={styles['form-group']}>
                                                    <CreateCaptcha value={generatedCaptcha} />
                                                </div>
                                            </div>
                                            
                                            {error !== '' && <div className={`${styles['alert']} ${styles['mb-space-btn']} ${styles['alert-danger']}`}>{error}</div>}
                                            {loginSuccess !== '' && <div className={`${styles['alert']} ${styles['mb-space-btn']} ${styles['alert-success']}`}>{loginSuccess}</div>}
                                            <div className={styles['text-center']}>
                                                <button onClick={loginProccess} type="submit" className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-block']} ${styles['default-btn']}`}>
                                                    {loading ? "Please wait ..." : "Login"}
                                                </button>
                                            </div>
                                        </form>
                                        <div className={`${styles['new-account']} ${styles['mt-3']}`}>
                                            <p>Don't have an account? <a className={styles['text-primary']} href="/register">Sign up</a></p>
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
