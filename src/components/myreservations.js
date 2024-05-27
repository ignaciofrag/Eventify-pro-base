import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth } from '../utils/api';
import { timeSince, daysUntil } from '../utils/timeUtils';
import '../styles/MyReservations.css';

function MyReservations({ reservations = [], deleteReservation }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [time, setTime] = useState(Date.now());
  const [error, setError] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now()); // Actualizar el tiempo para forzar re-renderización
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleDelete = (reservationId) => {
    setReservationToDelete(reservationId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchWithAuth(`http://localhost:5500/reservations/${reservationToDelete}`, {
        method: 'DELETE'
      });
      deleteReservation(reservationToDelete); // Asegúrate de que deleteReservation se pasa como prop
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('Error eliminando la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'warning';
      case 'Confirmada':
        return 'success';
      case 'Cancelada':
        return 'danger';
      case 'Finalizada':
        return 'success';
      default:
        return 'light';
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title className='text-danger'>Todas tus Reservas</Card.Title>
          <ListGroup variant="flush">
            {reservations.map((reservation) => {
              const isReservationFinished = daysUntil(reservation.date_time_reservation) === "Evento finalizado";
              return (
                <ListGroup.Item key={reservation.id} className="bg-dark text-light">
                  <h4>Reserva con Proveedor: {reservation.company_name}</h4>
                  <p>Servicio: {reservation.service_name}</p> {/* Título del servicio */}
                  <p>Tipo: {reservation.service_type}</p> {/* Tipo de evento */}
                  <p className={`text-${getStatusVariant(reservation.status)}`}>
                    Estado: <span className={`badge badge-${getStatusVariant(reservation.status)}`}>{reservation.status}</span>
                  </p>
                  <p className="dateStyle">Fecha: {formatDate(reservation.date_time_reservation)}</p> {/* Aplica la clase CSS */}
                  <p className={isReservationFinished ? 'text-danger' : 'text-success'}>
                    {daysUntil(reservation.date_time_reservation)}
                  </p>
                  <p>Precio: ${formatNumber(reservation.precio)}</p> {/* Formatea el precio */}
                  <p><strong>Se cobra por: {capitalizeFirstLetter(reservation.pricingType === 'por hora' ? 'por hora' : 'por evento')}</strong></p> {/* Tipo de cobro */}
                  <p>Email de Contacto: {reservation.email_contacto}</p>
                  <p>Teléfono: {reservation.phone_number}</p>
                  <p>Ubicación: {reservation.address}</p>
    
                  <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => handleDelete(reservation.id)}>
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
          <p>🚫 ¿Estás seguro de que quieres eliminar esta reserva? Esta acción no se puede deshacer. 🚫</p>
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

export default MyReservations;
