import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";


export default function AdminHeader () {
    return (
        <header className={`${styles['header']}`}>
            <nav className={`${styles['wrapper']} ${styles['flexbox']}`}>
                <ul className={styles['navbar-list']}>
                    <li>
                        <a>
                            <i className={icons['ti-eye']}></i>
                            <span>Visit Website</span>
                        </a>
                    </li> 
                </ul>
            </nav>
        </header>
    );
}