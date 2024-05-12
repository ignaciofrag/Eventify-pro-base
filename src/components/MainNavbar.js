import React from 'react';
import { useAuth } from '../context/AuthContext';  // Asegúrate de que esta es la ruta correcta al archivo AuthContext
import UserNavbar from '../components/usernavbar';
import NavigationBar from '../components/navbar';

function MainNavbar({ onLoginClick }) {
    const { user } = useAuth();
    return user ? <UserNavbar /> : <NavigationBar onLoginClick={onLoginClick} />;

}

export default MainNavbar;