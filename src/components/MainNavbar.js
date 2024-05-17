// src/components/MainNavbar.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserNavbar from '../components/usernavbar';
import NavigationBar from '../components/navbar';

function MainNavbar({ onLoginClick }) {
  const { user } = useAuth();
  return user ? <UserNavbar onLoginClick={onLoginClick} /> : <NavigationBar onLoginClick={onLoginClick} />;
}

export default MainNavbar;
