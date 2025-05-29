import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useTenant } from '../context/TenantContext';

function PrivateRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const { tenantId, role } = useTenant(); // 👈 Grab from context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  // Wait until Firebase Auth AND TenantContext are both ready
  if (!authChecked || !tenantId || !role) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
