import React, { useState } from 'react';
import './login.css';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTenant } from './context/TenantContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setTenantId, setRole } = useTenant(); // 🔥 useTenant hook from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User data not found.');
      }

      const userData = querySnapshot.docs[0].data();

      // Save tenantId and role to context
      setTenantId(userData.tenantId);
      setRole(userData.role);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Clinic Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
