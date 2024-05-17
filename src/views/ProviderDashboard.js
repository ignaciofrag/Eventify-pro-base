// src/components/ProviderDashboard.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendar, faEnvelope, faPlusSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MyEvents from '../components/MyEvents';
import NewServiceModal from '../components/NewServiceModal';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function ProviderDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [services, setServices] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigate('/login');
    } else {
      const fetchProviderServices = async () => {
        try {
          const data = await fetchWithAuth(`http://localhost:5500/provider/${user.id}/services`);
          setServices(data);
        } catch (error) {
          console.error('Error fetching provider services:', error);
        }
      };
      fetchProviderServices();
    }
  }, [user, navigate]);

  const addService = (newService) => {
    setServices([...services, newService]);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column bg-dark text-light" style={{ width: '250px', height: '100vh' }}>
        <Offcanvas.Header className="border-bottom border-secondary">
          <Offcanvas.Title>Menú Proveedor</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex-grow-1">
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <Link to="/" className="text-decoration-none text-light">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <Link to="/profile" className="text-decoration-none text-light">
                <FontAwesomeIcon icon={faUser} /> Perfil
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faCalendar} /> Mis Eventos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faEnvelope} /> Mensajes
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
        <Button variant="danger" className="m-3" onClick={() => setModalShow(true)}>
          <FontAwesomeIcon icon={faPlusSquare} /> Nuevo Servicio
        </Button>
        <Button variant="danger" className="m-3" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
        </Button>
      </div>

      <NewServiceModal show={modalShow} onHide={() => setModalShow(false)} addService={addService} />

      <div className="flex-grow-1 p-3 bg-light">
        <h1 className="text-dark">Dashboard del Proveedor</h1>
        {user ? (
          <>
            <h2>Bienvenido, {user.first_name} {user.last_name}!</h2>
          </>
        ) : (
          <h2>No estás logueado</h2>
        )}
        <MyEvents services={services} />
      </div>
    </div>
  );
}

export default ProviderDashboard;
