import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { authProvider} from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth"

export function LoginWithGoogle(){
    const { user } = useContext( AuthContext );

    function signIn(): void {
        firebase.auth().signInWithPopup(authProvider);
    }

    return(
        <header className='LoginWithGoogle'>
            <button onClick={() => signIn()}>Sign in with Google</button>
        </header>
    )
}