import { NextResponse } from 'next/server';
import {Helper} from "./services/helper"; 
 

export async function middleware(req) {
    const cookie = req.cookies.get(Helper.user_cookie);
     
    // redirect to login if not exists 
    if (!cookie) {
        return removeCookieAndRedirect(req);
    }
    

    // check for token expiration 
    try {
        
        
        var user_data = JSON.parse(cookie.value);
    
        const response = await fetch(`${req.nextUrl.origin}/api/verify_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: user_data.token }),
        });

        var result = await response.json();
         
        if( result.is_error ) {
            return removeCookieAndRedirect(req);
        }

        // handle expiration 
        var expired_time = result.data.exp;
        var currentTime = Math.floor(Date.now() / 1000);

        if (expired_time < currentTime) {
            console.log('Token has expired.');
            return removeCookieAndRedirect(req);;
        } 

        return NextResponse.next();

    } catch (error) { 
        return removeCookieAndRedirect(req);
    }    

    
} 


function removeCookieAndRedirect(req) {
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.set(Helper.user_cookie, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Expire the cookie
    });
    return res;
}

export const config = {
    matcher: ['/dashboard'], // Apply to specific routes
};
