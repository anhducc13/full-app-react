import React from 'react';
import { useGlobal, setGlobal } from 'reactn'
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthHeaderBar } from 'components/shared/AuthHeader';
import { AppRoutes } from 'routes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure()

function App() {
  const [loading] = useGlobal('loading');
  
  setGlobal({
    initTextField: {
      value: '',
      error: '',
      valid: false,
    },
  });

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
