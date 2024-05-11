import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProviderRoute({ children }) {
  const { user } = useAuth();
  return user && user.isAuthenticated && user.role === 'Proveedor' ? children : <Navigate to="/" />;
}

export default ProviderRoute;