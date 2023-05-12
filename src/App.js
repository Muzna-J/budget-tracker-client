import React from 'react';
import {  Routes, Route, Navigate  } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from "./components/Navbar";
//import Dashboard from './components/Dashboard';
//import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';



function App() {
  return (
    
    <div className="App">
      <Navbar />
    
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
          <Route path="/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />
          
          
        </Routes>
      
      
    </div>
  
  );
}

export default App;
