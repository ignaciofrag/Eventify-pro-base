import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { fetchWithAuth } from '../utils/api';
import { useAuth } from '../context/AuthContext';

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
              const category = getCategory(provider.type);
              return (
                <Col key={provider.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card style={{ backgroundColor: '#333', color: '#fff' }}>
                    <Card.Body>
                      {category && <h5 className="text-center text-light mb-3">{category}</h5>}
                      <p className="card-text">
                        ${formatNumber(provider.price)} {provider.pricingType === 'por hora' ? 'por hora' : 'por evento'}
                      </p>
                      <h5 className="card-title">{capitalizeWords(provider.company_name)}</h5>
                      <p className="card-text">{provider.description}</p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{ backgroundColor: '#333', color: '#fff' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                          </svg> Proveedor de eventos
                        </li>
                        <li className="list-group-item" style={{ backgroundColor: '#333', color: '#fff' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                          </svg>
                          {provider.location || 'Ubicación no especificada'}
                        </li>
                        <li className="list-group-item" style={{ backgroundColor: '#333', color: '#fff' }}>
                          Publicado hace {timeSince(provider.created_at)}
                        </li>
                      </ul>
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
