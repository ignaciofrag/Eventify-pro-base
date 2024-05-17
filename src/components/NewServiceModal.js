// src/components/NewServiceModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';

function NewServiceModal({ show, onHide, addService }) {
  const { user } = useAuth();
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWithAuth('http://localhost:5500/services', {
        method: 'POST',
        body: JSON.stringify(newService)
      });
      addService({
        id: data.service_id,
        ...newService
      });
      onHide();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio *</Form.Label>
            <Form.Control type="text" name="name" value={newService.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Servicio *</Form.Label>
            <Form.Control type="text" name="type" value={newService.type} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control type="number" name="price" value={newService.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control type="text" name="description" value={newService.description} onChange={handleChange} required />
          </Form.Group>
          <Button variant="danger" type="submit">
            Crear Servicio
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewServiceModal;
