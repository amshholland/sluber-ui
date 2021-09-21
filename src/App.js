import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import './App.css';
import { LoginWithGoogle } from "./components/LoginWithGoogle";
import PageTemplate from './containers/PageTemplate';

function App() {
    return (
        <div className='App'>
            <Router>
                <PageTemplate>
                    <LoginWithGoogle />
                </PageTemplate>
            </Router>
        </div>
    );
}

export default App;

