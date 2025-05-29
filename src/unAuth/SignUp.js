import React, { useState } from 'react';
import './SignUp.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tenantName: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    return setError('Passwords do not match.');
  }

  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // 2. Create a new tenant document
    const tenantDoc = await addDoc(collection(db, 'tenants'), {
      ...formData,
      tenantName: formData.tenantName,
      createdAt: new Date(),
    });

    const tenantId = tenantDoc.id;

    // 3. Add the user to the "users" collection
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: 'Manager',
      tenantId: tenantId,
      createdAt: new Date(),
    });

    // 4. Redirect to login page
    navigate('/login');
  } catch (err) {
    console.error(err);
    setError('Signup failed: ' + err.message);
  }
};


  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Clinic Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="tenantName"
          placeholder="Clinic/Store Name"
          value={formData.tenantName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
