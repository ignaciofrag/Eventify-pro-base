import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, FloatingLabel, FormControl, FormCheck } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function LoginModal({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { email, password };
    const result = await login(loginData);

    if (result.success) {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Bienvenido de nuevo.',
        icon: 'success',
        confirmButtonText: '¡Vamos!'
      });
      if (rememberMe) {
        sessionStorage.setItem('userToken', result.token);
        sessionStorage.setItem('user', JSON.stringify(result.user));
      }
      onHide();
      navigate(result.role === "Proveedor" ? '/providerdashboard' : '/userdashboard');
    } else {
      Swal.fire({
        title: '¡Oops!',
        text: 'Tu email y/o contraseña no coinciden. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  };

  const handleRegisterClick = () => {
    onHide();
    navigate('/registrarse');
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-dialog" contentClassName="modal-content rounded-4 shadow" backdrop="static" centered>
      <Modal.Header className="p-5 pb-4 border-bottom-0 bg-dark text-light">
        <Modal.Title className="fw-bold mb-0 fs-2">Iniciar sesión</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={onHide}></Button>
      </Modal.Header>

      <Modal.Body className="p-5 pt-0 bg-dark text-light">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Correo electrónico" className="mb-3 text-dark">
            <FormControl type="email" placeholder="name@example.com" className="form-control rounded-3" onChange={e => setEmail(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3 text-dark">
            <FormControl type="password" placeholder="Password" className="form-control rounded-3" onChange={e => setPassword(e.target.value)} />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <FormCheck type="checkbox" label="Recuerda mi contraseña" checked={rememberMe} onChange={handleRememberMe} />
          </Form.Group>
          <Button variant="danger" className="w-100 mb-2 btn-lg rounded-3" type="submit">
            Iniciar sesión
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <span className="text-light">¿No tienes cuenta? 😊 </span>
          <span className="text-light fw-bold" style={{ cursor: 'pointer' }} onClick={handleRegisterClick}>Regístrate aquí</span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
