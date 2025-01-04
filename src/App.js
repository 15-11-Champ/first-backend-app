import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePage from './unAuth/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
