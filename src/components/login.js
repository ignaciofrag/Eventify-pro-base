import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Button,
  Form,
  FloatingLabel,
  FormControl,
  FormCheck
} from "react-bootstrap";
import { useAuth } from '../context/AuthContext';


function LoginModal({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { email, password, rememberMe };

    try {
        const response = await fetch("http://localhost:5500/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login exitoso!");
            login(data.user);  // Actualiza el contexto de autenticación
            onHide();          // Cierra el modal
            navigate('/userdashboard');  // Redirige al dashboard
        } else {
            alert("Error en el inicio de sesión: " + data.message);
        }
    } catch (error) {
        alert("Error en el inicio de sesión: " + error.message);
    }
};
const handleRememberMe = () => {
  setRememberMe(!rememberMe);
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
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
