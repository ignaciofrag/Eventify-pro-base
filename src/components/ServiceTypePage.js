import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import serviceImages from '../serviceImages'; // Importar serviceImages
import defaultImage from '../imgs/defaultService.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchWithAuth } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const MySwal = withReactContent(Swal);

const serviceCategories = {
  "Planificación y Coordinación": [
    "Planificación y coordinación de eventos 📋",
    "Planificación de bodas 💍",
    "Planificación de fiestas temáticas 🎉",
    "Planificación de cumpleaños y fiestas infantiles 🎂",
    "Planificación de eventos en cruceros 🚢",
    "Coordinación de conferencias y seminarios 📊",
    "Gestión de eventos corporativos 🏢",
    "Consultoría de eventos 💼",
    "Coordinación de eventos virtuales y webinars 💻",
    "Consultoría de riesgos y seguros para eventos 📑"
  ],
  "Decoración y Servicios": [
    "Decoración de eventos 🎨",
    "Floristería y arreglo de flores 💐",
    "Iluminación y efectos especiales 💡",
    "Diseño de stands y exhibiciones 🖼️",
    "Diseño y producción de invitaciones ✉️",
    "Diseño y producción de merchandising 🎁",
    "Diseño de menús y servicios de chef privado 🍴",
    "Servicios de impresión y señalización 🖨️"
  ],
  "Catering y Bebidas": [
    "Catering y servicios de alimentos 🍽️",
    "Bebidas y bar móvil 🍹",
    "Servicios de catering especializado (vegano, kosher, etc.) 🥗",
    "Food Trucks 🚚"
  ],
  "Arriendo de Equipos y Logística": [
    "Arriendo de mobiliario 🪑",
    "Arriendo de carpas y toldos ⛺",
    "Arriendo de equipos de tecnología 🖥️",
    "Arriendo de escenarios y tarimas 🎪",
    "Transporte y logística 🚚",
    "Control de clima y calefacción ❄️",
    "Servicios de limpieza y mantenimiento 🧹"
  ],
  "Animación y Entretenimiento": [
    "Animación y entretenimiento 🎭",
    "Dj y música en vivo 🎶",
    "Espectáculos de fuegos artificiales 🎆",
    "Producción de espectáculos y shows 🎬",
    "Animación infantil 🤹",
    "Conciertos y festivales 🎤",
    "Eventos deportivos ⚽"
  ],
  "Fotografía y Videografía": [
    "Fotografía profesional 📸",
    "Videografía 🎥"
  ],
  "Servicios Adicionales": [
    "Hostess y personal de recepción 🙋",
    "Seguridad y control de acceso 🔐",
    "Servicios de traducción e interpretación 🌎",
    "Registro y gestión de asistentes 📝",
    "Creación de páginas web para eventos 🌐",
    "Gestión de redes sociales para eventos 📱",
    "Programas de incentivos y team building 🤝",
    "Coordinación de viajes y alojamiento 🛏️",
    "Marketing y promoción de eventos 📢",
    "Servicios de protocolo y etiqueta 🎩",
    "Eventos benéficos y recaudación de fondos 💸",
    "Servicios de maquillaje y peluquería 💄"
  ]
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function capitalizeWords(str) {
  return str.split(' ').map(capitalizeFirstLetter).join(' ');
}

function getCategory(serviceType) {
  for (const category in serviceCategories) {
    if (serviceCategories[category].includes(serviceType)) {
      return category;
    }
  }
  return null;
}

function ServiceTypePage() {
  const { serviceType } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationStatus, setReservationStatus] = useState('Pendiente');
  const [reservationPrice, setReservationPrice] = useState('');

  const { user, setShowLogin } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:5500/services?type=${encodeURIComponent(serviceType)}`);
        const data = await response.json();
        console.log('Fetched services:', data);  // Agrega este console.log para verificar los datos
        if (response.ok) {
          setServices(data);
        } else {
          throw new Error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return;

        const response = await fetch('http://localhost:5500/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserRole(data.role);
          console.log('User role:', data.role);  // Verifica el rol del usuario
        } else {
          throw new Error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchServices();
    fetchUserRole();
  }, [serviceType]);

  const handleReservationClick = (service) => {
    console.log('User role on reservation click:', userRole);  // Verifica el rol del usuario al hacer clic en reservar
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
      MySwal.fire({
        icon: 'error',
        title: '¡Oops!',
        text: 'No puedes reservar servicios como Proveedor. 🚫',
      });
    } else {
      setSelectedService(service);
      setReservationPrice(service.price);
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
          status: statusInEnglish[reservationStatus] || 'PENDING', // Default to PENDING if not found
          date_time_reservation: reservationDate,
          precio: reservationPrice,
          proveedor_id: selectedService.profile_id,
          service_id: selectedService.id,
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
    <Container className="py-5">
      <h2 className="text-center mb-4">Servicios de {serviceType}</h2>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <>
          {services.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {services.map(service => {
                const serviceImage = serviceImages[service.type] || defaultImage;
                const category = getCategory(service.type);
                return (
                  <Col key={service.id}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={serviceImage} />
                      <Card.Body>
                      {category && <h6 className="text-align mb-3"><strong>Categoría:</strong> {category}</h6>}
                        <Card.Title><strong>Servicio:</strong> {capitalizeWords(service.name)}</Card.Title>
                        <Card.Text><strong>Descripción:</strong> {capitalizeWords(service.description)}</Card.Text>
                        <Card.Text><strong>Compañía:</strong> {service.company_name}</Card.Text>
                        <Card.Text><strong>Lugar:</strong> {service.location}</Card.Text>
                        <Button variant="danger" onClick={() => handleReservationClick(service)}>
                          Reservar
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="text-center">
              <h4>😔En estos momentos no hay ningún proveedor disponible 😔 de {serviceType}.</h4>
              <p>🌟 ¡Atención proveedores! 🌟 ¿Quieres que los clientes te encuentren? ¡Es tu momento de brillar! 🚀 Publica tus servicios aquí ✍️ y deja que los clientes vengan a ti para contratarte. 🤝

Y tú, cliente, ¿tienes un evento especial en mente? 🎉 Publica los detalles de tu evento 📆 y deja que nuestros proveedores te contacten para hacerlo realidad. ¡En Eventify Pro haremos que tu evento sea inolvidable! 🥳</p>
              <Button variant="danger" as={Link} to="/">
                Home
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal de Reserva */}
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

export default ServiceTypePage;
