import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css';
import PageTemplate from './containers/PageTemplate';

function App() {
  return (
    <div className='App'>
      <Router>
        <PageTemplate></PageTemplate>
      </Router>
    </div>
  );
}

export default App;
