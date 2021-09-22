import React from 'react';
import { signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInWIthGoogle.css"
import { Link } from 'react-router-dom';

function SignOut() {
    const { user } = useContext( AuthContext );

    return (
        <Link to="/FindRidePage"> 
            <button onClick={signOut}>Sign out</button>
        </Link>
    );
}

export default SignOut;