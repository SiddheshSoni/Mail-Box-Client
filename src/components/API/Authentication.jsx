import React from "react";

const API_key = "AIzaSyC_T56zHD0P7_bI1MwqhUjBNCpO46JlbC8";

const Authenticate= async (email, password, authmode )=>{
    let authEndpoint = authmode? "signUp" :"signInWithPassword";
    
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${authEndpoint}?key=${API_key}`, {
            method:'POST',
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        
        const data = await res.json();
        if(res.ok){
            localStorage.setItem('idToken', data.idToken);
            return {data: data, ok: true};
        }else{
            let errorMessage = "Authentication Failed!";
            if(data && data.error.message){
                errorMessage = data.error.message;
            }
            return { error: errorMessage, ok: false};
        }

    }catch(err){
        console.log(err);
        return{error: err.message || "A network error occurred!", ok: false};
    }
}


export default Authenticate;