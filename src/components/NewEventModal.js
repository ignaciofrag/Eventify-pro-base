import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function NewEventModal({ show, onHide, addEvent }) {
  const { user } = useAuth();
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    details: '',
    guests: '',
    eventype: ''
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(newEvent)
      });
      if (response.ok) {
        const data = await response.json();
        addEvent({
          id: data.event_id,
          ...newEvent
        });
        onHide();
      } else {
        console.error('Error creating event:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const eventTypes = [
    "Cumpleaños",
    "Matrimonio",
    "Aniversario",
    "Año Nuevo",
    "Baby shower",
    "Bautizo",
    "Bodas de oro",
    "Bodas de plata",
    "Compromiso",
    "Cena",
    "Eventos de empresa",
    "Fiesta de amigos",
    "Fiesta de bienvenida",
    "Fiesta de despedida",
    "Graduación",
    "Halloween",
    "Inauguración de casa",
    "Jubilación",
    "Navidad",
    "Primera comunión",
    "Reunión de exalumnos",
    "Reunión familiar",
    "San Valentín",
    "Seminario",
    "Taller",
    "Team building",
    "Torneo",
    "Webinar",
    "Workshop",
    "Otro, especificar en detalles"
    
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
        <Modal.Title>Nuevo Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Evento *</Form.Label>
            <Form.Control type="text" name="name" value={newEvent.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha *</Form.Label>
            <Form.Control type="date" name="date" value={newEvent.date} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación *</Form.Label>
            <Form.Control as="select" name="location" value={newEvent.location} onChange={handleChange} required>
              <option value="">Selecciona una ubicación</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Evento *</Form.Label>
            <Form.Control as="select" name="eventype" value={newEvent.eventype} onChange={handleChange} required>
              <option value="">Selecciona un tipo de evento</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles</Form.Label>
            <Form.Control type="text" name="details" value={newEvent.details} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Invitados</Form.Label>
            <Form.Control type="number" name="guests" value={newEvent.guests} onChange={handleChange} required />
          </Form.Group>
          <Button variant="danger" type="submit">
            Crear Evento
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewEventModal;
