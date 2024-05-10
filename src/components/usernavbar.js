import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Dropdown } from "react-bootstrap";
import UserProfileModal from './UserProfileModal';
import { useAuth } from '../context/AuthContext';  // Corregido para usar el hook que sí exportas

function UserNavbar() {
  const [showModal, setShowModal] = React.useState(false);
  const { user, setUser } = useAuth();  // Usando useAuth para acceder a los detalles del usuario y funciones

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
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
              className="link-light text-decoration-none"  // Cambié aquí de 'link-dark' a 'link-light'
              style={{ backgroundColor: 'transparent', border: 'none' }}  // Asegura que el botón no tenga estilos de fondo ni borde
            >
              <img
                src={user?.profilePic || "https://github.com/mdo.png"}
                alt="profile"
                className="rounded-circle"
                width="32"
                height="32"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-small bg-dark" style={{ borderColor: 'transparent' }}>
              <Dropdown.Item className="text-light" onClick={() => setShowModal(true)}>Perfil</Dropdown.Item>
              <Dropdown.Item className="text-light">Configuración</Dropdown.Item>
              <Dropdown.Item className="text-danger">Cerrar sesión</Dropdown.Item>
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