import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UserProfileModal({ show, onHide, user, updateUser }) {
  const [editableUser, setEditableUser] = useState({ ...user });

  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editableUser);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} className="modal-dark">
    <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Perfil de Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={editableUser.first_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="last_Name"
              name="last_Name"
              value={editableUser.last_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Primer campo*/}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editableUser.email || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;