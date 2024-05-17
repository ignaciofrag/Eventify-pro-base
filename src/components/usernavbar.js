// src/components/UserNavbar.js

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Dropdown } from "react-bootstrap";
import UserProfileModal from './UserProfileModal';
import { useAuth } from '../context/AuthContext';

function UserNavbar({ onLoginClick }) {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLoginClick();
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleDashboard = () => {
    if (user?.profile?.role === 'Proveedor') {
      navigate('/providerdashboard');
    } else {
      navigate('/userdashboard');
    }
  };

  const capitalize = (str) => {
    if (!str) return '';
    const exceptions = ['de', 'la', 'del', 'y', 'en', 'a']; // Lista de preposiciones y artículos comunes
    return str
      .split(' ')
      .map(word => exceptions.includes(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      <header className="p-3 mb-3 border-bottom bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
              <img src={logo} alt="Logo" width="40" height="32" />
            </Link>
            <Link to="/" className="navbar-logo-text text-light text-decoration-none ms-2">
              Eventify Pro
            </Link>
            <Dropdown className="text-end ms-auto"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              show={showDropdown}
            >
              <Dropdown.Toggle 
                as="a" 
                className="link-light text-decoration-none"
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={user?.profilePic || "https://github.com/mdo.png"}
                  alt="profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
                <span className="ms-2 text-light">
                {capitalize(user?.first_name)} {capitalize(user?.last_name)}
                  </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="text-small bg-dark" style={{ borderColor: 'transparent' }}>
                <Dropdown.Item className="text-light" onClick={handleDashboard}>Ir a mi Dashboard</Dropdown.Item>
                <Dropdown.Item className="text-light" onClick={() => setShowModal(true)}>Editar mi Perfil</Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
      <UserProfileModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={user}
        updateUser={handleUpdateUser}
      />
    </>
  );
}

export default UserNavbar;
