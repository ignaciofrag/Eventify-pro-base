import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendar, faEnvelope, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import MyEvents from '../components/MyEvents';  // Componente para eventos
import NewServiceModal from '../components/NewServiceModal';  // Componente para añadir servicios
import { useAuth } from '../context/AuthContext';

function ProviderDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [services, setServices] = useState([]); // Estado para almacenar los servicios
  const { user } = useAuth(); // Utiliza el hook useAuth para acceder a los datos del usuario

  // Función para añadir un nuevo servicio
  const addService = (newService) => {
    setServices([...services, newService]);
  };

  return (
    <div className="d-flex">
      {/* Sidebar section */}
      <div className="d-flex flex-column bg-dark text-light" style={{ width: '250px', height: '100vh' }}>
        <Offcanvas.Header className="border-bottom border-secondary">
          <Offcanvas.Title>Menú Proveedor</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex-grow-1">
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <Link to="/#" className="text-decoration-none text-light">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faUser} /> Perfil
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
      </div>

      <NewServiceModal show={modalShow} onHide={() => setModalShow(false)} addService={addService} />

      {/* Main content section */}
      <div className="flex-grow-1 p-3 bg-light">
        <h1 className="text-dark">Dashboard del Proveedor</h1>
        {user ? (
          <h2>Bienvenido, {user.first_name} {user.last_name}!</h2>
        ) : (
          <h2>No estás logueado</h2>
        )}
        <MyEvents services={services} />
      </div>
    </div>
  );
}

export default ProviderDashboard;
