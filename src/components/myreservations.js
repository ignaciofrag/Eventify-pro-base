// src/components/MyReservations.js

import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;
      try {
        const data = await fetchWithAuth('http://localhost:5500/reservations');
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [user]);

  return (
    <div>
      <h3>Mis Reservas con Proveedores</h3>
      <ListGroup>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ListGroup.Item key={reservation.id}>
              <h4>{reservation.name}</h4>
              <p>Fecha: {new Date(reservation.date_time).toLocaleDateString()}</p>
              <p>Estado: {reservation.status}</p>
            </ListGroup.Item>
          ))
        ) : (
          <p>No tienes ninguna reserva de momento.</p>
        )}
      </ListGroup>
    </div>
  );
}

export default MyReservations;
