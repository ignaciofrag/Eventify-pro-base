import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faCalendar, faPlusSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MyEvents from '../components/MyEvents';
import MyReservations from '../components/MyReservations';
import NewEventModal from '../components/NewEventModal';
import EditEventModal from '../components/EditEventModal';
import UserProfileModal from '../components/UserProfileModal';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';


function UserDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigate('/login');
    } else {
      const fetchUserEvents = async () => {
        try {
          const data = await fetchWithAuth(`http://localhost:5500/user/${user.id}/events`);
          console.log('Datos obtenidos:', data); // Depuración
          if (Array.isArray(data)) {
            setEvents(data);
          } else {
            setEvents([]);
            console.error('Error: Los datos obtenidos no son un array');
          }
        } catch (error) {
          console.error('Error fetching user events:', error);
          setEvents([]);
        }
      };
      fetchUserEvents();
    }
  }, [user, navigate]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    if (Array.isArray(events)) {
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    } else {
      console.error('Error: events no es un array', events);
    }
  };

  const deleteEvent = (eventId) => {
    if (Array.isArray(events)) {
      setEvents(events.filter(event => event.id !== eventId));
    } else {
      console.error('Error: events no es un array', events);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setEditModalShow(true);
  };

  const capitalize = (str) => {
    if (!str) return '';
    const exceptions = ['de', 'la', 'del', 'y', 'en', 'a'];
    return str
      .split(' ')
      .map(word => exceptions.includes(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
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
            <ListGroup.Item className="bg-dark text-light" onClick={() => setProfileModalShow(true)}>
              <span className="text-decoration-none text-light" style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faUser} /> Perfil
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light" onClick={() => navigate('/reservations')}>
              <FontAwesomeIcon icon={faBook} /> Mis Reservas
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faCalendar} /> Mis Eventos {events.length > 0 && <Badge bg="secondary">{events.length}</Badge>}
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
        <Button variant="success" className="m-3" onClick={() => setModalShow(true)}>
          <FontAwesomeIcon icon={faPlusSquare} /> Nuevo Evento
        </Button>
        <Button variant="danger" className="m-3" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
        </Button>
      </div>

      <NewEventModal show={modalShow} onHide={() => setModalShow(false)} addEvent={addEvent} />

      <div className="flex-grow-1 p-3 bg-light">
        <h1 className="text-dark">Dashboard</h1>
        {user ? (
          <h2>
            Bienvenido, {capitalize(user.first_name)} {capitalize(user.last_name)}!
          </h2>
        ) : (
          <h2>No estás logueado</h2>
        )}

        {/* Sección de Eventos Publicados */}
        <h3 className="text-dark">
          Mis Eventos {events.length > 0 && <Badge bg="secondary">{events.length}</Badge>}
        </h3>
        <MyEvents events={events} updateEvent={updateEvent} deleteEvent={deleteEvent} handleEditEvent={handleEditEvent} />

        {/* Sección de Reservas con Proveedores */}
        <MyReservations />
      </div>

      {currentEvent && (
        <EditEventModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          event={currentEvent}
          updateEvent={updateEvent}
        />
      )}

      <UserProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
        user={user}
        updateUser={handleUpdateUser}
      />
    </div>
  );
}

export default UserDashboard;