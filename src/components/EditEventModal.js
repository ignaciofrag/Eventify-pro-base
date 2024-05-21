import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function EditEventModal({ show, onHide, event, updateEvent }) {
  const [editableEvent, setEditableEvent] = useState(event);

  useEffect(() => {
    if (event && event.date) {
      const formattedDate = new Date(event.date).toISOString().split('T')[0];
      setEditableEvent({ ...event, date: formattedDate });
    } else {
      setEditableEvent(event);
    }
  }, [event]);

  const handleChange = (e) => {
    setEditableEvent({ ...editableEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando datos:', JSON.stringify(editableEvent));

      const response = await fetchWithAuth(`http://localhost:5500/events/${editableEvent.id}`, {
        method: 'PUT',
        body: JSON.stringify(editableEvent),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta del servidor:', response);

      const result = response; // ya está en formato JSON
      console.log('Evento actualizado:', result);

      const updatedEvent = {
        ...editableEvent,
        id: result.event_id
      };

      updateEvent(updatedEvent); // Actualiza el estado con el evento actualizado
      onHide(); // Cierra el modal
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const eventTypes = [
    'Cumpleaños', 'Matrimonio', 'Aniversario', 'Año Nuevo', 'Baby shower',
    'Bautizo', 'Bodas de oro', 'Bodas de plata', 'Compromiso', 'Cena',
    'Eventos de empresa', 'Fiesta de amigos', 'Fiesta de bienvenida',
    'Fiesta de despedida', 'Graduación', 'Halloween', 'Inauguración de casa',
    'Jubilación', 'Navidad', 'Primera comunión', 'Reunión de exalumnos',
    'Reunión familiar', 'San Valentín', 'Seminario', 'Taller', 'Team building',
    'Torneo', 'Webinar', 'Workshop', 'Otro, especificar en detalles'
  ];

  const cities = [
    'Antofagasta', 'Viña del Mar', 'Concón', 'Iquique', 'Concepción', 'Rancagua',
    'Santiago', 'Valdivia', 'Temuco', 'Coquimbo', 'La Serena', 'Valparaíso',
    'Pucón', 'Puerto Varas'
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
            <Form.Control
              type="text"
              name="name"
              value={editableEvent.name || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editableEvent.date || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              as="select"
              name="location"
              value={editableEvent.location || ''}
              onChange={handleChange}
              required
            >
              <option>Selecciona una ubicación</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Control
              as="select"
              name="eventype"
              value={editableEvent.eventype || ''}
              onChange={handleChange}
              required
            >
              <option>Selecciona tu categoría de evento</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles *</Form.Label>
            <Form.Control
              type="text"
              name="details"
              value={editableEvent.details || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nº de Invitados</Form.Label>
            <Form.Control
              type="number"
              name="guests"
              value={editableEvent.guests || ''}
              onChange={handleChange}
              required
            />
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
