import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/pages/Dashboard'); // go to dashboard on success
      } catch (err) {
        setError('Invalid credentials');
        console.error(err);
      }
    }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' , paddingBottom: '50px' , color: 'white' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginTop:'3rem' , marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '8px 16px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;