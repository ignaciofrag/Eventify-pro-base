import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faEnvelope, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import MyEvents from '../components/MyEvents';
import MyReservations from '../components/MyReservations';
import NewEventModal from '../components/NewEventModal';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:5500/user/${user.id}/events`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error fetching user events:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, [user]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column bg-dark text-light" style={{ width: '250px', height: '100vh' }}>
        <Offcanvas.Header className="border-bottom border-secondary">
          <Offcanvas.Title>Menú</Offcanvas.Title>
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
            <ListGroup.Item className="bg-dark text-light" onClick={() => navigate('/reservations')}>
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

      <div className="flex-grow-1 p-3 bg-light">
        <h1 className="text-dark">Dashboard</h1>
        {user ? (
          <h2>Bienvenido, {user.first_name} {user.last_name}!</h2>
        ) : (
          <h2>No estás logueado</h2>
        )}

        {/* Sección de Eventos Publicados */}
        <MyEvents events={events} updateEvent={updateEvent} deleteEvent={deleteEvent} />

        {/* Sección de Reservas con Proveedores */}
        <MyReservations />
      </div>
    </div>
  );
}

export default UserDashboard;
