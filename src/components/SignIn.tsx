import React from 'react';
import { signInWithGoogle } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInWIthGoogle.css"
import { Link } from 'react-router-dom';

function SignIn() {
    const { user } = useContext( AuthContext );
    console.log(user)

    // Must set up get to check DB for existing user
    // Will change second route after set up
    const signInRoute = user?.uid ? '/Account' : '/FindRidePage';

    return (
        <Link to={signInRoute} > 
            <button onClick={ signInWithGoogle }>Sign in</button>
        </Link>
    );
}

export default SignIn;