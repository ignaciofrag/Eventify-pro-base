// src/components/EditServiceModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function EditServiceModal({ show, onHide, service, updateService }) {
  const [editableService, setEditableService] = useState(service);

  useEffect(() => {
    setEditableService(service);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableService({ ...editableService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWithAuth(`http://localhost:5500/services/${editableService.id}`, {
        method: 'PUT',
        body: JSON.stringify(editableService),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateService(data);
      onHide();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

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

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio *</Form.Label>
            <Form.Control type="text" name="name" value={editableService.name || ''} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Servicio *</Form.Label>
            <Form.Control as="select" name="type" value={editableService.type || ''} onChange={handleChange} required>
              <option value="">Selecciona el tipo de servicio</option>
              {serviceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control type="number" name="price" value={editableService.price || ''} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={editableService.description || ''} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lugar *</Form.Label>
            <Form.Control as="select" name="location" value={editableService.location || ''} onChange={handleChange} required>
              <option value="">Selecciona la ciudad</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditServiceModal;
