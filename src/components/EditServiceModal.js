// src/components/EditServiceModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchWithAuth } from '../utils/api';

function EditServiceModal({ show, onHide, service, updateService }) {
  const [editableService, setEditableService] = useState(service);

  useEffect(() => {
    setEditableService(service);
  }, [service]);

  const handleChange = (e) => {
    setEditableService({ ...editableService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth(`http://localhost:5500/services/${editableService.id}`, {
        method: 'PUT',
        body: JSON.stringify(editableService),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      updateService(data);
      onHide();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio *</Form.Label>
            <Form.Control type="text" name="name" value={editableService.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Servicio *</Form.Label>
            <Form.Control type="text" name="type" value={editableService.type} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control type="number" name="price" value={editableService.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control type="text" name="description" value={editableService.description} onChange={handleChange} required />
          </Form.Group>
          <Button variant="danger" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditServiceModal;
