import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { authProvider} from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";

export function SignOutWithGoogle(){
    const { user } = useContext( AuthContext );
    const [signIn, setSignIn] = useState(false);

    function signOut(): void {
        firebase.auth().signOut();
        setSignIn(true);
    }

    return(
        <header className='SignOutWithGoogle'>
            <button onClick={ () => signOut() }>Sign out</button>
        </header>
    )
}