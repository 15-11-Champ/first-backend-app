import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { useTenant, TenantProvider } from './context/TenantContext'; // ✅ correct casing
import HomePage from './unAuth/HomePage';
import Login from './login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Pricing from './unAuth/Pricing';
import PricingPage from './unAuth/PricingPage';
import SignUp from './unAuth/SignUp';


function App() {
  return (
    <TenantProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricingpage" element={<PricingPage />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </TenantProvider>
  );
}

export default App;
