import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    ciudad: "",
    tipoUsuario: "",
    password: "",
    confirmPassword: "",
    telefono: "",  // Asegúrate de agregar los campos adicionales como teléfono si es necesario
    descripcion: "",
    companyName: "",
    portfolioURL: ""
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const userToRegister = {
        email: formData.email,
        password: formData.password,
        profile: {
          phone_number: formData.telefono,
          address: formData.ciudad,
          description: formData.descripcion,
          company_name: formData.companyName,
          url_portfolio: formData.portfolioURL,
          role: formData.tipoUsuario,
        }
      };

      try {
        const response = await fetch("http://localhost:5500/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include', // Esto es crucial si estás manejando cookies o autenticación basada en sesiones
          body: JSON.stringify(userToRegister)
        });
      
        if (response.ok) {
          const data = await response.json();
          alert("Registro exitoso!");
        } else {
          const errorData = await response.json();
          alert("Error en el registro: " + errorData.message);
        }
      } catch (error) {
        alert("Error en el registro: " + error.message);
      }
  };

  return (
    <div className="container bg-dark text-light py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="registrarse" className="contenedor-formularios">
            <h1 className="text-center">Registrarse</h1>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      required
                      placeholder="Introduce tu nombre"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      required
                      placeholder="Introduce tu apellido"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  required
                  placeholder="Nombre de usuario"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Crea una Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  required
                  placeholder="Introduce tu contraseña"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Repite tu contraseña"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  placeholder="Introduce tu correo electrónico"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudad"
                  required
                  placeholder="Introduce tu ciudad"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoUsuario"
                  required
                  onChange={handleChange}
                >
                  <option value="">Selecciona...</option>
                  <option value="Proveedor">Proveedor</option>
                  <option value="Cliente">Cliente</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  required
                  placeholder="Introduce tu número de teléfono"
                  onChange={handleChange}
                />
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
