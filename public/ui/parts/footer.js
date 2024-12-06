import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../public/css/index.module.css'; 
import { Helper } from '@/services/helper';


export default function Footer({ footer_options, company_links, follow_links, nav_links }) {
    
     
    
    var SubscribeComponents = () => {
         
        var [email, setEmail] = useState('')
            var [result, setRestult] = useState({
                message: '',
                cls: '', // show
                type: '',  // error - success
                is_pressed: false
            });
            
            var response_results_callback = (obj) => {
                var old_objec = {...result};
                var __keys = Object.keys(obj);
                __keys.map(x => {
                    old_objec[x] = obj[x]
                }); 
                setRestult(old_objec);
            } 

            var send_data = (e) => {
            
                e.preventDefault();
            
                response_results_callback({ 
                is_pressed: true
                }); 
            
                Helper.sendRequest({
                api: 'user/subscribe',
                data: {
                    email: email
                },
                method: 'post'
                }).then( async row => {
                
                var res =  await row.json(); 
                var to_be_state = {};
                to_be_state.message= res.data;
                to_be_state.cls= 'show';
                to_be_state.is_pressed= false;
            
                if( res.is_error ) { 
                    to_be_state.type= 'error';
                } else {
                    to_be_state.type= 'success';
                }
                
                response_results_callback(to_be_state);
            
                setTimeout(() => {
                    response_results_callback({
                    message: '',
                    cls: '',
                    type: ''
                    });
                }, 3000)
            
                });
            
            
            }
        return (
            <div>
                <h2 className={styles['title']}>{footer_options.subscribe_title}</h2>
                <p className={`${styles["font-16"]} ${styles["pb-15"]}`}>{footer_options.subscribe_description}</p>
                <div style={{ margin: '0 auto' }}>
                <div className={`${styles['response-msg']} ${styles[result.cls]} ${styles[result.type]}`}>{result.message}</div>
                    <form className={`${styles["set-center"]} ${styles["form-group"]} ${styles["set-focus"]}`} action="/" method="get">
                        <input type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="example@email.com" />
                        <button onClick={send_data} className={`${styles["btn"]} ${styles["primary-btn"]}`} type="submit">
                            {
                                result.is_pressed ?
                                <span className={styles["loader"]}></span>: 
                                'Subscribe'
                            }
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <footer className={`${styles["wrapper"]} ${styles["white-bg"]} ${styles["plr-0"]} ${styles["footer"]}`}>
            <div className={`${styles["wrapper"]} ${styles["offset-left"]} ${styles["offset-right"]} ${styles["plr-15"]} ${styles["max-1170"]} ${styles["ptb-25"]}`}>
                <div className={`${styles["row"]} ${styles["mlr--15"]}`}>
                    {company_links.length ? (
                        <div className={`${styles["lg-2"]} ${styles["md-3"]} ${styles["sm-6"]} ${styles["plr-15"]} ${styles["ptb-15"]}`}>
                            <h2 className={styles["title"]}>Company</h2>
                            <ul className={`${styles["block-list"]} ${styles["custom-widget-links"]} ${styles["font-14"]} ${styles["no-borders-list"]} ${styles["no-effect"]}`}>
                                {company_links.map((x) => (
                                    <li key={x._id}>
                                        <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                            {x.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}

                    {follow_links.length ? (
                        <div className={`${styles["lg-2"]} ${styles["md-3"]} ${styles["sm-6"]} ${styles["plr-15"]} ${styles["ptb-15"]}`}>
                            <h2 className={styles["title"]}>Follow Us</h2>
                            <ul className={`${styles["block-list"]} ${styles["custom-widget-links"]} ${styles["font-14"]} ${styles["no-borders-list"]} ${styles["no-effect"]}`}>
                                {follow_links.map((x) => (
                                    <li key={x._id}>
                                        <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                            {x.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}

                    {nav_links.length ? (
                        <div className={`${styles["lg-4"]} ${styles["md-6"]} ${styles["plr-15"]} ${styles["ptb-15"]}`}>
                            <h2 className={styles["title"]}>Tags</h2>
                            <ul className={`${styles["inline-list"]} ${styles["tag-list"]} ${styles["custom-widget-links"]} ${styles["font-14"]} ${styles["no-borders-list"]} ${styles["no-effect"]} ${styles["flex-wrap"]}`}>
                                {nav_links.map((x) => (
                                    <li key={x._id}>
                                        <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                                            {x.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className={`${styles["lg-4"]} ${styles["md-6"]} ${styles["plr-15"]} ${styles["ptb-15"]}`}>
                        <SubscribeComponents />
                    </div>
                </div>
            </div>
        </footer>
    );
}
