import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';

function ReservationsModal({ show, onHide, reservations, handleAccept, handleReject, updateReservations }) {
  const formatDate = (dateString) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(undefined, optionsDate),
      time: date.toLocaleTimeString(undefined, optionsTime),
    };
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleAcceptClick = async (reservationId) => {
    await handleAccept(reservationId);
    updateReservations(); // Llamar a la función de actualización después de aceptar
    onHide(); // Cerrar el modal
  };

  const handleRejectClick = async (reservationId) => {
    await handleReject(reservationId);
    updateReservations(); // Llamar a la función de actualización después de rechazar
    onHide(); // Cerrar el modal
  };
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Reservas Recibidas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {reservations.map((reservation) => {
            const { date, time } = formatDate(reservation.date_time_reservation);
            return (
              <ListGroup.Item key={reservation.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{reservation.service_name}</h5>
                  <p className="mb-1">Cliente: {reservation.client_initials}</p>
                  <p className="mb-1 dateStyle">Fecha: {date}</p>
                  <p className="mb-1 dateStyle">Hora: {time}</p>
                  <p className="mb-1">Precio: ${formatNumber(reservation.precio)}</p>
                  <p className="mb-1">Estado: <Badge bg={reservation.status === 'Pendiente' ? 'warning' : reservation.status === 'Confirmada' ? 'success' : 'danger'}>{reservation.status}</Badge></p>
                </div>
                <div>
                  {reservation.status === 'Pendiente' && (
                    <>
                      <Button variant="success" className="me-2" onClick={() => handleAcceptClick(reservation.id)}>Aceptar</Button>
                      <Button variant="danger" onClick={() => handleRejectClick(reservation.id)}>Rechazar</Button>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReservationsModal;
