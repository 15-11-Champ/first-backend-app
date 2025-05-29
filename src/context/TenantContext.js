// src/context/TenantContext.js
import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantId, setTenantId] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <TenantContext.Provider value={{ tenantId, setTenantId, role, setRole }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
