import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem('admin_token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (jwtToken, adminEmail) => {
    localStorage.setItem('admin_token', jwtToken);
    localStorage.setItem('admin_email', adminEmail);
    setTokenState(jwtToken);
    setUser({ email: adminEmail });
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setTokenState(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ email: localStorage.getItem('admin_email') || 'admin' });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  return (
    <AdminContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
