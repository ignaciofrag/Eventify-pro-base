import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import Swal from 'sweetalert2';

function NewServiceModal({ show, onHide, addService }) {
  const { user } = useAuth();
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    location: '',
    pricingType: '',
    createdAt: '' // Añadir el campo createdAt
  });
  const [charCount, setCharCount] = useState(0);

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
    "Planificación de bodas 💍",
    "Planificación de cumpleaños y fiestas infantiles 🎂",
    "Catering y servicios de alimentos 🍽️",
    "DJ y música en vivo 🎶",
    "Fotografía profesional 📸",
    "Videografía 🎥",
    "Animación infantil 🤹",
    "Servicios de maquillaje y peluquería 💄",
    "Planificación y coordinación de eventos 📋",
    "Decoración de eventos 🎨",
    "Floristería y arreglo de flores 💐",
    "Planificación de fiestas temáticas 🎉",
    "Gestión de eventos corporativos 🏢",
    "Animación y entretenimiento 🎭",
    "Conciertos y festivales 🎤",
    "Producción de espectáculos y shows 🎬",
    "Coordinación de conferencias y seminarios 📊",
    "Bebidas y bar móvil 🍹",
    "Food Trucks 🚚",
    "Arriendo de mobiliario 🪑",
    "Iluminación y efectos especiales 💡",
    "Planificación de eventos en cruceros 🚢",
    "Coordinación de eventos virtuales y webinars 💻",
    "Consultoría de eventos 💼",
    "Consultoría de riesgos y seguros para eventos 📑",
    "Diseño de stands y exhibiciones 🖼️",
    "Diseño y producción de invitaciones ✉️",
    "Diseño y producción de merchandising 🎁",
    "Diseño de menús y servicios de chef privado 🍴",
    "Servicios de catering especializado (vegano, kosher, etc.) 🥗",
    "Arriendo de carpas y toldos ⛺",
    "Arriendo de equipos de tecnología 🖥️",
    "Arriendo de escenarios y tarimas 🎪",
    "Transporte y logística 🚚",
    "Control de clima y calefacción ❄️",
    "Servicios de limpieza y mantenimiento 🧹",
    "Espectáculos de fuegos artificiales 🎆",
    "Eventos deportivos ⚽",
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
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = capitalizeFirstLetter(value);
    if (name === 'description') {
      setCharCount(capitalizedValue.length);
    }
    setNewService({ ...newService, [name]: capitalizedValue });
  };

  const handlePricingTypeChange = (e) => {
    setNewService({ ...newService, pricingType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.profile && user.profile.role !== 'Proveedor') {
      Swal.fire('Error', 'User is not a provider', 'error');
      return;
    }
    if (charCount < 25 || charCount > 100) {
      Swal.fire('Error', 'La descripción debe tener entre 25 y 100 caracteres.', 'error');
      return;
    }
    try {
      newService.createdAt = new Date().toISOString(); // agregando la fecha de creación al servicio
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
            <Form.Control 
              type="text" 
              name="description"
              placeholder="Mi servicio consiste en..." 
              value={newService.description} 
              onChange={handleChange} 
              required 
              minLength={25} 
              maxLength={100}
            />
            <div style={{ color: charCount < 25 ? 'red' : 'green' }}>
              {charCount < 25 ? `${charCount}/25` : `${charCount}/100`}
            </div>
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
