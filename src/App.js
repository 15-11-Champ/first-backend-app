import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './unAuth/HomePage';
import Login from './login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Pricing from './unAuth/Pricing';
import PricingPage from './unAuth/PricingPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricingpage" element={<PricingPage />} />
        
        {/* Protect Dashboard Route */}
        <Route 
          path="/pages/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
