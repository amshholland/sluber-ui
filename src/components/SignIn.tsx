import React from 'react';
import { signInWithGoogle } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInWIthGoogle.css"

function SignIn() {
    const { user } = useContext( AuthContext );
    console.log(user)

    return (
        <div className="SignIn"> 
            <button onClick={ signInWithGoogle }>Sign in</button>
        </div>
    );
}

export default SignIn;