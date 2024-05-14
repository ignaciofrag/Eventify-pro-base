import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:5500/reservations`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error('Error fetching reservations:', response.statusText);
        }
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
