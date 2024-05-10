import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

function NewServiceModal({ show, onHide, addService }) {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setServiceData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addService(serviceData);  // revisar Función para añadir el nuevo servicio
    onHide();  // Cierra la modal
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" className="text-light" contentClassName="bg-dark">
      <Modal.Header closeButton className="border-bottom border-secondary">
        <Modal.Title>Añadir Nuevo Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="serviceName" label="Nombre del Servicio" className="mb-3 text-dark">
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre del Servicio"
              value={serviceData.name}
              onChange={handleChange}
              className="bg-dark text-light"
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="serviceDescription" label="Descripción del Servicio" className="mb-3 text-dark">
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Descripción del Servicio"
              style={{ height: '100px' }}
              value={serviceData.description}
              onChange={handleChange}
              className="bg-dark text-light"
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="servicePrice" label="Precio" className="mb-3 text-dark">
            <Form.Control
              type="number"
              name="price"
              placeholder="Precio"
              value={serviceData.price}
              onChange={handleChange}
              className="bg-dark text-light"
              required
            />
          </FloatingLabel>
          <Button variant="danger" type="submit">
            Añadir Servicio
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewServiceModal;
