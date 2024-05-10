import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function UserProfileModal({ show, onHide, user }) {
  const { updateUser } = useAuth();
  const [editableUser, setEditableUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile: {
      phone_number: '',
      company_name: '',
      url_portfolio: '',
      role: '',
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user && user.profile) {
      setEditableUser({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        profile: {
          phone_number: user.profile.phone_number || '',
          company_name: user.profile.company_name || '',
          url_portfolio: user.profile.url_portfolio || '',
          role: user.profile.role || ''
        },
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    if (['phone_number', 'company_name', 'url_portfolio', 'role'].includes(e.target.name)) {
      setEditableUser({
        ...editableUser,
        profile: { ...editableUser.profile, [e.target.name]: e.target.value }
      });
    } else {
      setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableUser.newPassword && editableUser.newPassword !== editableUser.confirmPassword) {
      alert('Las nuevas contraseñas no coinciden.');
      return;
    }

    const updatedInfo = {
      ...editableUser,
      password: editableUser.newPassword ? editableUser.newPassword : undefined // Sólo actualiza la contraseña si se ha proporcionado una nueva
    };

    try {
      const response = await fetch(`http://localhost:5500/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInfo)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Perfil actualizado exitosamente');
        updateUser(data.user); // Asegúrate de que esta función maneje correctamente los datos actualizados
        onHide();
      } else {
        alert(data.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="bg-dark text-dark">
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control type="text" name="first_name" value={editableUser.first_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido *</Form.Label>
            <Form.Control type="text" name="last_name" value={editableUser.last_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control type="email" name="email" value={editableUser.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" name="phone_number" value={editableUser.profile.phone_number} onChange={handleChange} />
          </Form.Group>
          {editableUser.profile.role === 'Proveedor' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Empresa</Form.Label>
                <Form.Control type="text" name="company_name" value={editableUser.profile.company_name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>URL del Portafolio</Form.Label>
                <Form.Control type="url" name="url_portfolio" value={editableUser.profile.url_portfolio} onChange={handleChange} />
              </Form.Group>
            </>
          )}
          <Button variant="danger" type="submit">Guardar Cambios</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;
