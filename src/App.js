import React from 'react';
import { useGlobal } from 'reactn'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthHeaderBar } from 'components/shared/AuthHeader'
import { AppRoutes } from 'routes'

function App() {
  const [ loading ] = useGlobal('loading'); 
  return (
    <div className="App">
      {loading && (
      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>
    )}
      <Router>
        <AuthHeaderBar />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
