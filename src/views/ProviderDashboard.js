import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup, Button, Badge, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendar, faPlusSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MyServices from '../components/MyServices';
import NewServiceModal from '../components/NewServiceModal';
import EditServiceModal from '../components/EditServiceModal';
import UserProfileModal from '../components/UserProfileModal';
import ReservationsModal from '../components/ReservationsModal';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function ProviderDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [reservationsModalShow, setReservationsModalShow] = useState(false);
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigate('/login');
    } else {
      const fetchProviderServices = async () => {
        try {
          const data = await fetchWithAuth(`http://localhost:5500/provider/${user.id}/services`);
          if (Array.isArray(data)) {
            setServices(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
          } else {
            setServices([]);
            console.error('Error: Los datos obtenidos no son un array');
          }
        } catch (error) {
          console.error('Error fetching provider services:', error);
          setServices([]);
        }
      };

      const fetchProviderReservations = async () => {
        try {
          const data = await fetchWithAuth(`http://localhost:5500/provider/${user.id}/reservations`);
          if (Array.isArray(data)) {
            setReservations(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            setConfirmedReservations(data.filter(reservation => reservation.status === 'Confirmada'));
          } else {
            setReservations([]);
            setConfirmedReservations([]);
            console.error('Error: Los datos obtenidos no son un array');
          }
        } catch (error) {
          console.error('Error fetching provider reservations:', error);
          setReservations([]);
          setConfirmedReservations([]);
        }
      };

      fetchProviderServices();
      fetchProviderReservations();
    }
  }, [user, navigate]);

  const addService = (newService) => {
    setServices(prevServices => [newService, ...prevServices]);
  };

  const updateService = (updatedService) => {
    setServices(prevServices => prevServices.map(service => service.id === updatedService.id ? updatedService : service));
    setEditModalShow(false);
  };

  const deleteService = (serviceId) => {
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    setEditModalShow(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleAcceptReservation = async (reservationId) => {
    try {
      await fetchWithAuth(`http://localhost:5500/reservations/${reservationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'CONFIRMED' })
      });
      setReservations(prevReservations =>
        prevReservations.map(reservation => reservation.id === reservationId ? { ...reservation, status: 'Confirmada' } : reservation)
      );
      setConfirmedReservations(prevConfirmedReservations => 
        [...prevConfirmedReservations, reservations.find(reservation => reservation.id === reservationId)]
      );
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleRejectReservation = async (reservationId) => {
    try {
      await fetchWithAuth(`http://localhost:5500/reservations/${reservationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'CANCELLED' })
      });
      setReservations(prevReservations =>
        prevReservations.map(reservation => reservation.id === reservationId ? { ...reservation, status: 'Cancelada' } : reservation)
      );
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
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

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faCalendar} /> Mis Servicios {services.length > 0 && <Badge bg="secondary">{services.length}</Badge>}
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light" onClick={() => setReservationsModalShow(true)}>
              <span className="text-decoration-none text-light" style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faCalendar} /> Reservas {reservations.length > 0 && <Badge bg="secondary">{reservations.length}</Badge>}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
        <Button variant="success" className="m-3" onClick={() => setModalShow(true)}>
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
          <h2>
            Bienvenido, {capitalize(user.first_name)} {capitalize(user.last_name)}!
          </h2>
        ) : (
          <h2>No estás logueado</h2>
        )}

        {/* Sección de Servicios Publicados */}
        <h3 className="text-dark">
          Mis Servicios {services.length > 0 && <Badge bg="secondary">{services.length}</Badge>}
        </h3>
        <MyServices services={services} updateService={updateService} deleteService={deleteService} handleEditService={handleEditService} />

        {/* Sección de Reservas Confirmadas */}
        <h3 className="text-dark mt-4">
          Mis Reservas {confirmedReservations.length > 0 && <Badge bg="secondary">{confirmedReservations.length}</Badge>}
        </h3>
        <Card bg="dark" text="light">
          <Card.Body>
            <ListGroup variant="flush">
              {confirmedReservations.map((reservation) => (
                <ListGroup.Item key={reservation.id} className="bg-dark text-light">
                  <h5>{reservation.service_name}</h5>
                  <p className="mb-1 dateStyle">Fecha: {reservation.date_time_reservation.split('T')[0]}</p>
                  <p className="mb-1">Precio: ${formatNumber(reservation.precio)}</p>
                  <p className="mb-1">Cliente: {reservation.client_name}</p>
                  <p className="mb-1">Correo electrónico: {reservation.client_email}</p>
                  <p className="mb-1">Número de teléfono: {reservation.client_phone}</p>
                  <p className="mb-1">Estado: <Badge bg={reservation.status === 'Confirmada' ? 'success' : 'warning'}>{reservation.status}</Badge></p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Modal de Reservas Recibidas */}
        <ReservationsModal
          show={reservationsModalShow}
          onHide={() => setReservationsModalShow(false)}
          reservations={reservations}
          handleAccept={handleAcceptReservation}
          handleReject={handleRejectReservation}
        />
      </div>

      {currentService && (
        <EditServiceModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          service={currentService}
          updateService={updateService}
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

export default ProviderDashboard;
