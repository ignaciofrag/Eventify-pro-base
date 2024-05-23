import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendar, faEnvelope, faPlusSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MyServices from '../components/MyServices';
import NewServiceModal from '../components/NewServiceModal';
import EditServiceModal from '../components/EditServiceModal';
import UserProfileModal from '../components/UserProfileModal';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function ProviderDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const fetchProviderServices = async () => {
    try {
      const data = await fetchWithAuth(`http://localhost:5500/provider/${user.id}/services`);
      console.log('Datos obtenidos:', data);
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
        console.error('Error: Los datos obtenidos no son un array');
      }
    } catch (error) {
      console.error('Error fetching provider services:', error);
      setServices([]);
    }
  };

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigate('/login');
    } else {
      fetchProviderServices();
    }
  }, [user, navigate]);

  const addService = (newService) => {
    setServices([...services, newService]);
  };

  const updateService = (updatedService) => {
    if (Array.isArray(services)) {
      setServices(services.map(service => service.id === updatedService.id ? updatedService : service));
    } else {
      console.error('Error: services no es un array', services);
    }
    setEditModalShow(false); // Cierra el modal después de la actualización
    fetchProviderServices(); // Refresca la lista de servicios
  };

  const deleteService = (serviceId) => {
    if (Array.isArray(services)) {
      setServices(services.filter(service => service.id !== serviceId));
    } else {
      console.error('Error: services no es un array', services);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditService = (service) => {
    if (service) {
      setCurrentService(service);
      setEditModalShow(true);
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
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faCalendar} /> Mis Servicios {services.length > 0 && <Badge bg="secondary">{services.length}</Badge>}
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <FontAwesomeIcon icon={faEnvelope} /> Mensajes
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
          Mis Servicios Activos {services.length > 0 && <Badge bg="secondary">{services.length}</Badge>}
        </h3>
        <MyServices services={services} updateService={updateService} deleteService={deleteService} handleEditService={handleEditService} />
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
