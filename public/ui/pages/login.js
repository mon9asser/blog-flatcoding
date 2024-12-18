import {useState, useEffect, useRef } from 'react';
// import style from './../public/css/admin.module.css';
import styles from "@/public/css/admin.module.css";
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
        <div className={`${styles['authincation']} ${styles['h-100']} ${styles['mt-10']}`}>
            <div className={`${styles['container-fluid']} ${styles['h-100']}`}>
                <div className={`${styles['row']} ${styles['justify-content-center']} ${styles['h-100']} ${styles['align-items-center']}`}>
                    <div className={styles['col-md-6']}>
                        <div className={styles['authincation-content']}>
                            <div className={`${styles['row']} ${styles['no-gutters']}`}>
                                <div className={styles['col-xl-12']}>
                                    <div className={styles['auth-form']}>
                                        <h4 className={`${styles['text-center']} ${styles['mb-4']}`}>Sign in your account</h4>
                                        <form>
                                            <div className={styles['form-group']}>
                                                <label><strong>Email</strong></label>
                                                <input 
                                                    type="email" 
                                                    placeholder="Email"
                                                    className={styles['form-control']}
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label><strong>Password</strong></label>
                                                <input 
                                                    type="password" 
                                                    placeholder="Password"
                                                    className={styles['form-control']}
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className={`${styles['form-inline']} ${styles['d-flex']} ${styles['justify-content-between']} ${styles['mt-4']} ${styles['mb-2']}`}>
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
                                            <div className={`${styles['form-row']} ${styles['d-flex']} ${styles['justify-content-between']} ${styles['mt-4']} ${styles['mb-2']}`}>
                                                <div className={styles['form-group']}>
                                                    <div className={`${styles['form-check']} ${styles['ml-2']}`}>
                                                        <input className={styles['form-check-input']} type="checkbox" id="basic_checkbox_1" />
                                                        <label className={styles['form-check-label']} htmlFor="basic_checkbox_1">Remember me</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {error !== '' && <div className={`${styles['alert']} ${styles['alert-danger']}`}>{error}</div>}
                                            {loginSuccess !== '' && <div className={`${styles['alert']} ${styles['alert-success']}`}>{loginSuccess}</div>}
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
