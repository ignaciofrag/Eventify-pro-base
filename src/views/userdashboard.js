import React, { useState } from 'react';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faEnvelope, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import MyReservations from '../components/myreservations';
import NewEventModal from '../components/newevent';

function UserDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos

  // Función para añadir un nuevo evento
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="d-flex">
      {/* Sidebar section */}
      <div className="d-flex flex-column bg-dark text-light" style={{ width: '250px', height: '100vh' }}>
        <Offcanvas.Header className="border-bottom border-secondary">
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex-grow-1">
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faHome} /> Home
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faUser} /> Perfil
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faBook} /> Mis Reservas
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faEnvelope} /> Mensajes
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
        <Button variant="danger" className="m-3" onClick={() => setModalShow(true)}>
          <FontAwesomeIcon icon={faPlusSquare} /> Nuevo Evento
        </Button>
      </div>

      <NewEventModal show={modalShow} onHide={() => setModalShow(false)} addEvent={addEvent} />

      {/* Main content section */}
      <div className="flex-grow-1 p-3 bg-light">
        <h1 className="text-dark">Dashboard</h1>
        <MyReservations events={events} />
      </div>
    </div>
  );
}

export default UserDashboard;