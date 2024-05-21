// src/components/MyServices.js

import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function MyServices({ services, updateService, deleteService, handleEditService }) {
  return (
    <ListGroup variant="flush">
      {services.length > 0 ? (
        services.map((service) => (
          <ListGroup.Item key={service.id} className="bg-dark text-light">
            <h4>Servicio: {service.name}</h4>
            <p>Tipo: {service.type}</p>
            <p>Precio: {service.price}</p>
            <p>Descripción: {service.description}</p>
            <div className="d-flex justify-content-between">
              <Button variant="warning" className="me-2" onClick={() => handleEditService(service)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={() => deleteService(service.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </ListGroup.Item>
        ))
      ) : (
        <p>No tienes ningún servicio de momento.</p>
      )}
    </ListGroup>
  );
}

export default MyServices;
