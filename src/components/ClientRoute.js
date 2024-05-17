// src/components/ClientRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ClientRoute({ children }) {
  const { user } = useAuth();
  return user && user.isAuthenticated && user.profile.role === 'Cliente' ? children : <Navigate to="/" />;
}

export default ClientRoute;
