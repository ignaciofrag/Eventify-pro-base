import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function NewServiceModal({ show, onHide, addService }) {
  const { user } = useAuth();
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    location: '',
    pricingType: ''
  });

  useEffect(() => {
    if (user && user.profile) {
      console.log('User profile:', user.profile); // Depuración
    }
  }, [user]);

  const cities = [
    "Antofagasta",
    "Viña del Mar",
    "Concón",
    "Iquique",
    "Concepción",
    "Rancagua",
    "Santiago",
    "Valdivia",
    "Temuco",
    "Coquimbo",
    "La Serena",
    "Valparaíso",
    "Pucón",
    "Puerto Varas"
  ];

  const serviceTypes = [
    "Planificación y coordinación de eventos 📋",
    "Planificación de bodas 💍",
    "Planificación de fiestas temáticas 🎉",
    "Planificación de cumpleaños y fiestas infantiles 🎂",
    "Planificación de eventos en cruceros 🚢",
    "Coordinación de conferencias y seminarios 📊",
    "Gestión de eventos corporativos 🏢",
    "Consultoría de eventos 💼",
    "Coordinación de eventos virtuales y webinars 💻",
    "Consultoría de riesgos y seguros para eventos 📑",
    "Decoración de eventos 🎨",
    "Floristería y arreglo de flores 💐",
    "Iluminación y efectos especiales 💡",
    "Diseño de stands y exhibiciones 🖼️",
    "Diseño y producción de invitaciones ✉️",
    "Diseño y producción de merchandising 🎁",
    "Diseño de menús y servicios de chef privado 🍴",
    "Servicios de impresión y señalización 🖨️",
    "Catering y servicios de alimentos 🍽️",
    "Bebidas y bar móvil 🍹",
    "Servicios de catering especializado (vegano, kosher, etc.) 🥗",
    "Food Trucks 🚚",
    "Arriendo de mobiliario 🪑",
    "Arriendo de carpas y toldos ⛺",
    "Arriendo de equipos de tecnología 🖥️",
    "Arriendo de escenarios y tarimas 🎪",
    "Transporte y logística 🚚",
    "Control de clima y calefacción ❄️",
    "Servicios de limpieza y mantenimiento 🧹",
    "Animación y entretenimiento 🎭",
    "DJ y música en vivo 🎶",
    "Espectáculos de fuegos artificiales 🎆",
    "Producción de espectáculos y shows 🎬",
    "Animación infantil 🤹",
    "Conciertos y festivales 🎤",
    "Eventos deportivos ⚽",
    "Fotografía profesional 📸",
    "Videografía 🎥",
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
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handlePricingTypeChange = (e) => {
    setNewService({ ...newService, pricingType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.profile && user.profile.role !== 'Proveedor') {
      console.error('User is not a provider');
      return;
    }
    try {
      console.log('Sending request to create service:', newService);
      const data = await fetchWithAuth('http://localhost:5500/services', {
        method: 'POST',
        body: JSON.stringify(newService),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Service created successfully:', data);

      addService({
        id: data.service_id,
        ...newService
      });
      onHide();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio *</Form.Label>
            <Form.Control type="text" name="name" value={newService.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Servicio *</Form.Label>
            <Form.Control as="select" name="type" value={newService.type} onChange={handleChange} required>
              <option value="">Selecciona el tipo de servicio</option>
              {serviceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control type="number" name="price" value={newService.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Precio *</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Por evento"
                name="pricingType"
                value="por evento"
                checked={newService.pricingType === 'por evento'}
                onChange={handlePricingTypeChange}
                required
              />
              <Form.Check
                inline
                type="radio"
                label="Por hora"
                name="pricingType"
                value="por hora"
                checked={newService.pricingType === 'por hora'}
                onChange={handlePricingTypeChange}
                required
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control type="text" name="description" value={newService.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación *</Form.Label>
            <Form.Control as="select" name="location" value={newService.location} onChange={handleChange} required>
              <option value="">Selecciona una ciudad</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="submit">
            Crear Servicio
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewServiceModal;
