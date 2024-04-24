import React from "react";
import {
  Modal,
  Button,
  Form,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";

function LoginModal({ show, onHide }) {
  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog"
      contentClassName="modal-content rounded-4 shadow"
      backdrop="static"
      centered
    >
      <Modal.Header className="p-5 pb-4 border-bottom-0 bg-dark text-light">
        <Modal.Title className="fw-bold mb-0 fs-2">Iniciar sesión</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={onHide}></Button>
      </Modal.Header>

      <Modal.Body className="p-5 pt-0 bg-dark text-light">
        <Form>
          <Button
            variant="outline-primary"
            className="w-100 py-2 mb-2 rounded-3"
            type="submit"
          >
            <svg className="bi me-1" width="16" height="16">
              <use xlinkHref="#facebook"></use>
            </svg>
            Inicia con Facebook
          </Button>
          <Button
            variant="outline-secondary"
            className="w-100 py-2 mb-2 rounded-3"
            type="submit"
          >
            <svg className="bi me-1" width="16" height="16">
              <use xlinkHref="#github"></use>
            </svg>
            Inicia con Google
          </Button>
          <h2 className="fs-5 fw-bold mb-3 text-center text-light">O</h2>
          <FloatingLabel
            controlId="floatingInput"
            label="Correo electrónico"
            className="mb-3 text-dark"
          >
            <FormControl
              type="email"
              placeholder="name@example.com"
              className="form-control rounded-3"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Contraseña"
            className="mb-3 text-dark"
          >
            <FormControl
              type="password"
              placeholder="Password"
              className="form-control rounded-3"
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Recuerda mi contraseña" />
          </Form.Group>
          <Button
            variant="danger"
            className="w-100 mb-2 btn-lg rounded-3"
            type="submit"
          >
            Iniciar sesión
          </Button>
          <div className="text-center">
  <span>Olvidaste tu contraseña? </span>
  <a href="/#" className="text-primary">
    <u>Haz click aquí</u>
  </a>
</div>
<div className="text-center mt-3">
  <span>¿No tienes cuenta? Registrate </span>
  <a href="/#" className="text-primary">
    <u>aquí</u>
  </a>
</div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
