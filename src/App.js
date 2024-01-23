// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Main from './components/Main';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main/>}
          />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
          />
         
        </Routes>
      </div>
    </Router>

  
   
  );
}

export default App;


