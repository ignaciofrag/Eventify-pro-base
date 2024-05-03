import React from "react";
import { Form, Button } from "react-bootstrap";

function RegistroUsuario() {
  return (
    <div className="container bg-dark text-light py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="registrarse" className="contenedor-formularios">
            <h1 className="text-center">Registrarse</h1>
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Nombre y apellido</Form.Label>
                    <Form.Control type="text" required placeholder="Introduce tu nombre" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" required placeholder="Introduce tu apellido" />
                  </Form.Group>
                </div>
              </div>
              <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" required placeholder="Nombre de usuario" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required placeholder="Introduce tu correo electrónico" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" required placeholder="Introduce tu ciudad" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control as="select" required>
                  <option value="">Selecciona...</option>
                  <option value="Proveedor">Proveedor</option>
                  <option value="Cliente">Cliente</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" required placeholder="Introduce tu contraseña" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control type="password" required placeholder="Repite tu contraseña" />
              </Form.Group>
              <Button variant="primary" type="submit" className="btn-danger">
                Registrarse
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;