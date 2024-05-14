import React, { useState } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import EditEventModal from './EditEventModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importamos FontAwesomeIcon
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; 

function MyEvents({ events, updateEvent, deleteEvent }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setShowEditModal(true);
  };

  const handleDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5500/events/${eventToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      if (response.ok) {
        deleteEvent(eventToDelete);
        setShowConfirmModal(false);
      } else {
        console.error('Error deleting event:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h3>Mis Eventos</h3>
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title className='text-danger'>Todos tus Eventos</Card.Title>
          <ListGroup variant="flush">
            {events.length > 0 ? (
              events.map((event) => (
                <ListGroup.Item key={event.id} className="bg-dark text-light">
                  <h4>Evento: {event.name}</h4>
                  <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Tipo de evento: {event.eventype}</p>
                  <p>Ubicación: {event.location.charAt(0).toUpperCase() + event.location.slice(1)}</p> {/* Capitalizando primera letra */}
                  <p>Invitados: {event.guests}</p>
                  <p>Detalle: {event.details}</p>
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(event)}>
                      <FontAwesomeIcon icon={faEdit} /> 
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(event.id)}>
                      <FontAwesomeIcon icon={faTrash} /> 
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>No tienes ninguna reserva de momento.</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      {currentEvent && (
        <EditEventModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          event={currentEvent}
          updateEvent={updateEvent}
        />
      )}

<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
  <Modal.Header closeButton style={{backgroundColor: '#f8d7da'}}>
    <Modal.Title>⚠️ Confirmar Eliminación ⚠️</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{backgroundColor: '#f8d7da'}}>
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