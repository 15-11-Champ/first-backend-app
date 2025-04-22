import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePage from './unAuth/HomePage';
import Login from './login';
import Dashboard from './pages/Dashboard';




function App() {
  return (
    <div className="App">

      
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/pages/dashboard" element={<Dashboard />} />
      </Routes>
      


    </div>
  );
}

export default App;
