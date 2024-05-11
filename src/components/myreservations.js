import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiCollection, BiChevronRight } from 'react-icons/bi';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:5500/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  return (
    <Container className="px-4 py-5 bg-dark text-light" id="featured-3">
      <h2 className="pb-2 border-bottom">Mis Reservas</h2>
      <Row className="g-4 py-5" xs={1} lg={3}>
        {reservations.map((reservation, index) => (
          <Col key={index}>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <BiCollection size="1.5em" />
            </div>
            <h3 className="fs-2 text-light">{reservation.name}</h3>
            <p className="text-secondary">Cantidad de invitados: {reservation.guestCount}, Fecha: {reservation.date_time_reservation}</p>
            <a href="/#" className="icon-link">
              Detalles
              <BiChevronRight />
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyReservations;
