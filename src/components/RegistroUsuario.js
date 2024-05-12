
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function RegistroUsuario({onUserExists}) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    ciudad: "",
    tipoUsuario: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    descripcion: "",
    companyName: "",
    portfolioURL: "",
  });

  const navigate = useNavigate(); // Hook para la navegación

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que todas las campos requeridos estén presentes
    const requiredFields = ["nombre", "apellido", "username", "email", "ciudad", "tipoUsuario", "password", "confirmPassword", "telefono"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Por favor completa los campos requeridos: ${missingFields.join(", ")}`);
      return;
    }

    // Validar que la contraseña cumpla con los requisitos
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.");
      return;
    }

    // Validar que la confirmación de contraseña coincida
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor introduce un correo electrónico válido.");
      return;
    }

    // Si todas las validaciones pasan, proceder a registrar al usuario
    const userToRegister = {
      email: formData.email,
      password: formData.password,
      first_name: formData.nombre,
      last_name: formData.apellido,
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
        navigate('/userdashboard');  // Cambia según el rol si es necesario
      } else if (response.status === 409) {
        alert("Correo electrónico ya registrado. Por favor inicie sesión.");
        onUserExists()  // Usa lafuncion para redirigir
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
