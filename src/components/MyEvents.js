import React from 'react';
import { Table, Button } from 'react-bootstrap';

function MyEvents({ events, deleteEvent }) {
  // Asegurándose de que events siempre es un arreglo antes de intentar mapearlo
  const safeEvents = events || [];

  return (
    <div className="container mt-4">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Evento</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {safeEvents.map((event, index) => (
            <tr key={event.id || index}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>${event.price ? event.price.toFixed(2) : "N/A"}</td>
              <td>
                <Button variant="info" className="me-2">Ver Detalles</Button>
                <Button variant="danger" onClick={() => deleteEvent(event.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {safeEvents.length === 0 && <p className="text-center text-light">No hay eventos listados.</p>}
    </div>
  );
}

export default MyEvents;
