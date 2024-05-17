
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function UserProfileModal({ show, onHide }) {
  const { user, updateUser, logout } = useAuth();
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
    if (user && user.id) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('userToken');
          if (!token) {
            throw new Error('No se encontró el token de usuario');
          }

          const response = await fetch(`http://localhost:5500/user/${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }

          const data = await response.json();
          setEditableUser({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            profile: {
              phone_number: data.profile.phone_number || '',
              company_name: data.profile.company_name || '',
              url_portfolio: data.profile.url_portfolio || '',
              role: data.profile.role || ''
            },
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Entendido',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['phone_number', 'company_name', 'url_portfolio', 'role'].includes(name)) {
      setEditableUser((prevState) => ({
        ...prevState,
        profile: { ...prevState.profile, [name]: value }
      }));
    } else {
      setEditableUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableUser.newPassword && editableUser.newPassword !== editableUser.confirmPassword) {
      Swal.fire({
        title: '¡Oops!',
        text: 'Las contraseñas no coinciden.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    const updatedInfo = {
      ...editableUser,
      password: editableUser.newPassword ? editableUser.newPassword : undefined
    };

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No se encontró el token de usuario');
      }

      const response = await fetch(`http://localhost:5500/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedInfo)
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar el perfil',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        throw new Error(errorData.message || 'Error al actualizar el perfil');
      }

      const data = await response.json();
      Swal.fire({
        title: '¡Perfil Actualizado Exitosamente! 🎉',
        text: '¡Tus cambios se han guardado correctamente!',
        icon: 'success',
        confirmButtonText: 'Genial',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      updateUser(data.user);

      if (editableUser.newPassword) {
        Swal.fire({
          title: 'Contraseña actualizada',
          text: 'Debes volver a iniciar sesión con tu nueva contraseña.',
          icon: 'info',
          confirmButtonText: 'Entendido',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then(() => {
          logout();
          onHide();
          window.location.href = '/';  // Redirige al usuario a la página de inicio
        });
      } else {
        onHide();
      }
    } catch (error) {
      Swal.fire({
        title: '¡Oops! 😢',
        text: error.message || 'Algo salió mal. ¡Inténtalo de nuevo!',
        icon: 'error',
        confirmButtonText: 'Reintentar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
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
          <Form.Group className="mb-3">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control type="password" name="currentPassword" value={editableUser.currentPassword} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control type="password" name="newPassword" value={editableUser.newPassword} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={editableUser.confirmPassword} onChange={handleChange} />
          </Form.Group>
          <Button variant="danger" type="submit">Guardar Cambios</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;