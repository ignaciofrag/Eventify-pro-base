import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditEventModal({ show, onHide, event, updateEvent }) {
  const [editableEvent, setEditableEvent] = useState(event);

  useEffect(() => {
    setEditableEvent(event);
  }, [event]);

  const handleChange = (e) => {
    setEditableEvent({ ...editableEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/events/${editableEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(editableEvent)
      });
      if (response.ok) {
        const data = await response.json();
        updateEvent(editableEvent); // Actualiza el evento en el estado de UserDashboard
        onHide();
      } else {
        console.error('Error updating event:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const eventTypes = [
    "Concierto",
    "Festival",
    "Conferencia",
    "Seminario",
    "Taller",
    "Meetup",
    "Fiesta",
    "Cena",
    "Gala",
    "Reunión",
    "Exposición",
    "Feria",
    "Lanzamiento de Producto",
    "Torneo",
    "Competencia",
    "Charla",
    "Webinar",
    "Curso",
    "Clase Maestra",
    "Evento Deportivo"
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
        <Modal.Title>Editar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Evento</Form.Label>
            <Form.Control type="text" name="name" value={editableEvent.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" name="date" value={editableEvent.date} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control as="select" name="location" value={editableEvent.location} onChange={handleChange} required>
              <option value="">Selecciona una ubicación</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Control as="select" name="eventype" value={editableEvent.eventype} onChange={handleChange} required>
              <option value="">Selecciona un tipo de evento</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles</Form.Label>
            <Form.Control type="text" name="details" value={editableEvent.details} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Invitados</Form.Label>
            <Form.Control type="number" name="guests" value={editableEvent.guests} onChange={handleChange} required />
          </Form.Group>
          <Button variant="danger" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEventModal;
