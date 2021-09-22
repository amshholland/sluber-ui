import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import './App.css';
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut"
import PageTemplate from './containers/PageTemplate';
import { useContext } from "react";
import { AuthContext } from "../src/context/auth-context.tsx";

function App() {
    const { user } = useContext( AuthContext );
    const signInOrSignOutButton = user ? <SignOut /> : <SignIn />;
    return (
        <div className='App'>
            <Router>
                {signInOrSignOutButton}
                <PageTemplate>
                </PageTemplate>
            </Router>
        </div>
    );
}

export default App;

