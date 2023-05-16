import React from 'react';
import {  Routes, Route, Navigate  } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';
import Balance from './components/Balance';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import Category from './components/Category';



function App() {
  return (
    
    <div className="App">
      <Navbar />
    
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/auth/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
          <Route path="/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
          <Route path="/income" element={<IsPrivate><IncomeList /></IsPrivate>} />
          <Route path="/income/new" element={<IsPrivate><IncomeForm /></IsPrivate>} />
          <Route path="/expense/new" element={<IsPrivate><ExpenseForm /></IsPrivate>} />
          <Route path="/expense" element={<IsPrivate><ExpenseList /></IsPrivate>} />
          <Route path="/balance" element={<IsPrivate><Balance /></IsPrivate>} />
          <Route path="/category" element={<IsPrivate><Category /></IsPrivate>} />
          
          
        </Routes>
      
      
    </div>
  
  );
}

export default App;
