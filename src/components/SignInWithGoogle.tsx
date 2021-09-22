import React from 'react';
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInWIthGoogle.css"

function SignInWithGoogle() {
    console.log('signinwithgoogle')
    const { user } = useContext( AuthContext );
    console.log( user );

    return (
        <div className="SignInWithGoogle"> 
            <button onClick={ signInWithGoogle }>Sign in</button>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}

export default SignInWithGoogle;