import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Dropdown } from "react-bootstrap";
import UserProfileModal from './UserProfileModal';
import { useAuth } from '../context/AuthContext';  // Usar el hook useAuth

function UserNavbar() {
  const [showModal, setShowModal] = React.useState(false);
  const { user, logout, setUser } = useAuth();  // Destructurando logout desde useAuth
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Llamada a la función de logout del AuthContext
    localStorage.removeItem('userToken');  // Asegurarse de limpiar el token del almacenamiento local
    navigate('/login');  // Redirigir al usuario a la página de login
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleDashboard = () => {
    if (user?.role === 'Proveedor') {
      navigate('/providerdashboard');  // Navegar al dashboard del proveedor
    } else {
      navigate('/userdashboard');  // Navegar al dashboard del usuario
    }
  };

  return (
    <>
      <header className="p-3 mb-3 border-bottom bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
              <img src={logo} alt="Logo" width="40" height="32" />
            </Link>
            <span className="navbar-logo-text text-light">Eventify Pro</span>
            <Dropdown className="text-end ms-auto">
              <Dropdown.Toggle 
                as="a" 
                className="link-light text-decoration-none"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <img
                  src={user?.profilePic || "https://github.com/mdo.png"}
                  alt="profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
                <span className="ms-2 text-light">{user?.first_name} {user?.last_name}</span> {/* Nombre del usuario logueado */}
              </Dropdown.Toggle>
              <Dropdown.Menu className="text-small bg-dark" style={{ borderColor: 'transparent' }}>
                <Dropdown.Item className="text-light" onClick={() => setShowModal(true)}>Perfil</Dropdown.Item>
                <Dropdown.Item className="text-light" onClick={handleDashboard}>Dashboard</Dropdown.Item>
                <Dropdown.Item className="text-light">Configuración</Dropdown.Item>
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
