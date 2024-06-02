import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { fetchWithAuth } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import serviceImages from '../serviceImages';
import defaultImage from '../imgs/defaultService.png';


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
    "DJ y música en vivo 🎶",
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

function timeSince(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Fecha inválida';
  }

  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} segundos`;
  }
  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} minutos`;
  }
  if (secondsPast < 86400) {
    return `${Math.round(secondsPast / 3600)} horas`;
  }
  if (secondsPast < 31536000) {
    return `${Math.round(secondsPast / 86400)} días`;
  }
  return `${Math.round(secondsPast / 31536000)} años`;
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Post() {
  const { user, setShowLogin } = useAuth();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationStatus, setReservationStatus] = useState('PENDING');
  const [reservationPrice, setReservationPrice] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('http://localhost:5500/services');
        const data = await response.json();
        if (response.ok) {
          setProviders(data);
        } else {
          throw new Error('Failed to fetch providers');
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

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
          status: statusInEnglish[reservationStatus] || 'PENDING', // Default to PENDING if not found
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
    <div className="bg-dark text-light py-5">
<Container>
  <div className="text-center mb-4">
    <Link to="/" className="btn btn-danger">Volver al inicio</Link>
  </div>
  {loading ? (
    <p className="text-center">Cargando proveedores...</p>
  ) : (
    <Row className="justify-content-center">
      {providers.map(provider => {
        const serviceImage = serviceImages[provider.type] || defaultImage;
        console.log('Provider type:', provider.type);
        console.log('Mapped image:', serviceImage);
        const category = getCategory(provider.type);
        return (
          <Col key={provider.id} xs={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem', backgroundColor: '#333', color: '#fff' }}>
              <Card.Img variant="top" src={serviceImage} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                {category && <h5 className="text-center text-light mb-3">{category}</h5>}
                <p className="card-text">
                  ${formatNumber(provider.price)} {provider.pricingType === 'por hora' ? 'por hora' : 'por evento'}
                </p>
                <h5 className="card-title">{capitalizeWords(provider.company_name)}</h5>
                <p className="card-text">{capitalizeFirstLetter(provider.description)}</p>
                <Button variant="danger" className="w-100 mt-3" onClick={() => handleReservationClick(provider)}>Reservar</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  )}
</Container>

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
    </div>
  );
}

export default Post;
