import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { fetchWithAuth } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import defaultImage from '../imgs/defaultService.png';
import Map from '../components/Map'; // Asegúrate de importar el componente Map

const cityCoordinatesMap = {
  "Antofagasta": { lat: -23.6500, lng: -70.4000 },
  "Viña del Mar": { lat: -33.0245, lng: -71.5518 },
  "Concón": { lat: -32.9333, lng: -71.5333 },
  "Iquique": { lat: -20.2307, lng: -70.1357 },
  "Concepción": { lat: -36.8269, lng: -73.0498 },
  "Rancagua": { lat: -34.1654, lng: -70.7399 },
  "Santiago": { lat: -33.4489, lng: -70.6693 },
  "Valdivia": { lat: -39.8196, lng: -73.2454 },
  "Temuco": { lat: -38.7359, lng: -72.5904 },
  "Coquimbo": { lat: -29.9533, lng: -71.3436 },
  "La Serena": { lat: -29.9045, lng: -71.2489 },
  "Valparaíso": { lat: -33.0472, lng: -71.6127 },
  "Pucón": { lat: -39.2708, lng: -71.9535 },
  "Puerto Varas": { lat: -41.3208, lng: -72.9854 }
};

function Cityview() {
  const { cityName } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationStatus, setReservationStatus] = useState('PENDING');
  const [reservationPrice, setReservationPrice] = useState('');
  const [cityCoordinates, setCityCoordinates] = useState({ lat: 0, lng: 0 });
  const { user, setShowLogin } = useAuth();

  useEffect(() => {
    const fetchCityCoordinates = () => {
      const location = cityCoordinatesMap[cityName];
      if (location) {
        setCityCoordinates(location);
      } else {
        console.error('No coordinates found for city:', cityName);
      }
    };

    const fetchProviders = async () => {
      try {
        const response = await fetch('http://localhost:5500/services');
        const data = await response.json();
        if (response.ok) {
          const filteredProviders = data.filter(provider => provider.location.toLowerCase() === cityName.toLowerCase());
          setProviders(filteredProviders);
        } else {
          throw new Error('Failed to fetch providers');
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityCoordinates();
    fetchProviders();
  }, [cityName]);

  const handleReservationClick = (provider) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para reservar un proveedor debes ser Cliente.',
        footer: '🔒 Si no tienes una cuenta| <a href="/registrarse">Registrate aquí</a>',
      });

      setTimeout(() => {
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
          loginLink.onclick = (e) => {
            e.preventDefault();
            setShowLogin(true);
            Swal.close();
          };
        }
      }, 100);

    } else if (user.profile.role === 'Proveedor') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes reservar Servicios como Proveedor. 🚫',
      });
    } else {
      setSelectedProvider(provider);
      setReservationPrice(provider.price);
      setShowModal(true);
    }
  };

  const handleReserve = async () => {
    if (!reservationDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecciona una fecha para la reserva.',
      });
      return;
    }

    const statusInEnglish = {
      "Pendiente": "PENDING",
      "Confirmada": "CONFIRMED",
      "Cancelada": "CANCELLED",
      "Finalizada": "COMPLETED"
    };

    try {
      const response = await fetchWithAuth('http://localhost:5500/reservations', {
        method: 'POST',
        body: JSON.stringify({
          status: statusInEnglish[reservationStatus] || 'PENDING',
          date_time_reservation: reservationDate,
          precio: reservationPrice,
          proveedor_id: selectedProvider.profile_id,
          service_id: selectedProvider.id,
          paquete_evento_id: null
        })
      });

      if (response) {
        setShowModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Reserva exitosa',
          text: '¡Tu reserva se ha realizado correctamente! 🎉',
        }).then(() => {
          window.location.href = '/userdashboard';
        });
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Hubo un problema al realizar la reserva. Por favor, intenta nuevamente. Error: ${error.message}`,
      });
    }
  };

  return (
    <Container className="py-5 bg-dark">
      <h2 className="text-center text-light mb-4">Proveedores en {cityName}</h2>
      {loading ? (
        <p className="text-center text-light">Cargando proveedores...</p>
      ) : (
        <>
          <Map center={cityCoordinates} markers={providers.map(provider => provider.coordinates)} />

          {providers.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {providers.map(provider => (
                <Col key={provider.id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={provider.image || defaultImage} />
                    <Card.Body>
                      <Card.Title>Servicio: <strong>{provider.company_name}</strong></Card.Title>
                      <Card.Text>Descripción: {provider.description}</Card.Text>
                      <Card.Text><strong>Empresa</strong>: {provider.company_name}</Card.Text>
                      <Card.Text><strong>Lugar:</strong> {provider.location}</Card.Text>
                      <Card.Text><strong>Precio: </strong>${provider.price} {provider.pricingType === 'por hora' ? 'por hora' : 'por evento'}</Card.Text>
                      <Button variant="danger" onClick={() => handleReservationClick(provider)}>Reservar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center text-light">
              <h4>¡Hola! 👋 Lamentablemente, en este momento no contamos con proveedores disponibles en tu área. 😔</h4>
              <p>Pero no te preocupes, ¡estamos trabajando para ampliar nuestra cobertura! Por favor, revisa de nuevo más tarde. 🕒 ¡Gracias por tu paciencia y comprensión! 🌟</p>
              <Button variant="danger" as={Link} to="/">Home</Button>
            </div>
          )}
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reservar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reservationDate">
              <Form.Label>📅 Fecha y Hora de tu Evento</Form.Label>
              <Form.Control 
                type="datetime-local" 
                value={reservationDate} 
                onChange={(e) => setReservationDate(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="reservationStatus">
              <Form.Label>Estado</Form.Label>
              <Form.Control 
                as="select" 
                value={reservationStatus} 
                onChange={(e) => setReservationStatus(e.target.value)} 
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Finalizada">Finalizada</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="reservationPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="text" 
                value={reservationPrice} 
                onChange={(e) => setReservationPrice(e.target.value)} 
                disabled
              />
            </Form.Group>
            <Button variant="danger" onClick={handleReserve} className="mt-3 w-100">
              Confirmar Reserva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Cityview;
