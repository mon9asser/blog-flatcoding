
import { useEffect } from "react";
import { Helper } from "../services/helper";
import Cookies from "js-cookie";
export default function () {

    useEffect(() => {
        console.log(Cookies.get(Helper.user_cookie));
       // Cookies.get(Helper.user_cookie);
       // Cookies.remove(Helper.user_cookie);

    }, [])

    return (<b>Dashbaord!!</b>);

}



/* 
    
*/