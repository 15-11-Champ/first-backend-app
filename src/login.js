import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTenant, TenantProvider, setTenantId } from './context/TenantContext'; // ✅ correct casing

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setTenantId, setRole } = useTenant(); // ⬅️ Use context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch corresponding Firestore user document
      const userDocRef = doc(db, 'users', uid); // ⬅️ assumes UID is used as document ID
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setTenantId(userData.tenantId);
        setRole(userData.role);

        navigate('/pages/dashboard');
      } else {
        setError('User profile not found in database.');
      }

    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

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
