import React from 'react';
import { signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInWIthGoogle.css"

function SignOut() {
    const { user } = useContext( AuthContext );

    // const determineRouteAfterSignIn = (userID: User.id) => {
    //     //Check userdb
    //     let route = userInDB ? 'xs/FindRidePage' : '/Account'
    // }

    return (
        <div className="SignOut"> 
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}

export default SignOut;