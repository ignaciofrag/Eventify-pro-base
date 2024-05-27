import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth } from '../utils/api';
import { timeSince, daysUntil } from '../utils/timeUtils';

function MyEvents({ events, updateEvent, deleteEvent, handleEditEvent }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now()); // Actualizar el tiempo para forzar re-renderización
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchWithAuth(`http://localhost:5500/events/${eventToDelete}`, {
        method: 'DELETE'
      });
      deleteEvent(eventToDelete);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title className='text-danger'>Todos tus Eventos</Card.Title>
          <ListGroup variant="flush">
            {events.map((event) => {
              const isEventFinished = daysUntil(event.date) === "Evento finalizado";
              return (
                <ListGroup.Item key={event.id} className="bg-dark text-light">
                  <h4>Evento: {event.name}</h4>
                  <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Tipo de evento: {event.eventype}</p>
                  <p>Ubicación: {event.location.charAt(0).toUpperCase() + event.location.slice(1)}</p>
                  <p>Invitados: {event.guests}</p>
                  <p>Detalle: {event.details}</p>
                  <p>Publicado: {timeSince(event.created_at)}</p>
                  <p className={isEventFinished ? 'text-danger' : 'text-success'}>
                    {daysUntil(event.date)}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" className="me-2" onClick={() => handleEditEvent(event)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(event.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: '#f8d7da' }}>
          <Modal.Title>⚠️ Confirmar Eliminación ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f8d7da' }}>
          <p>🚫 ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer. 🚫</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyEvents;
