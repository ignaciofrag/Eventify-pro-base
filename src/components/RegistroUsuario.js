import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegistroUsuario({ onUserExists }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
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

  const navigate = useNavigate();
  const [isProveedor, setIsProveedor] = useState(false);
  const { user, setUser } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tipoUsuario") {
      setIsProveedor(value === "Proveedor");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = ["nombre", "apellido", "email", "ciudad", "tipoUsuario", "password", "confirmPassword", "telefono"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Por favor completa los campos requeridos: ${missingFields.join(", ")}`);
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor introduce un correo electrónico válido.");
      return;
    }

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
        body: JSON.stringify(userToRegister)
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser({ ...data.user, isAuthenticated: true });
        console.log('User data:', data.user); // Verificar datos del usuario
        console.log('Access token:', data.access_token); // Verificar token
        alert("Registro exitoso!");
      } else if (response.status === 409) {
        alert("Correo electrónico ya registrado. Por favor inicie sesión.");
      } else {
        const errorData = await response.json();
        alert("Error en el registro: " + errorData.msg);
      }
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  };
  

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate(user.profile.role === "Proveedor" ? '/providerdashboard' : '/userdashboard');
    }
  }, [user, navigate]);

  const cities = [
    "Santiago",
    "Viña del Mar",
    "Concón",
    "Iquique",
    "Concepción",
    "Rancagua",
    "Valdivia",
    "Temuco",
    "Coquimbo",
    "La Serena",
    "Valparaíso",
    "Pucón",
    "Puerto Varas",
    "Antofagasta"
  ];

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
                  as="select"
                  name="ciudad"
                  required
                  onChange={handleChange}
                >
                  <option value="">Selecciona una ciudad</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Form.Control>
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
              {isProveedor && (
                <>
                  <Form.Group>
                    <Form.Label>Descripción de tu empresa</Form.Label>
                    <Form.Control
                      type="text"
                      name="descripcion"
                      placeholder="Describe tu perfil o empresa"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nombre de la Compañía</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      placeholder="Introduce el nombre de tu compañía"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>URL del Portafolio</Form.Label>
                    <Form.Control
                      type="text"
                      name="portfolioURL"
                      placeholder="Introduce la URL de tu portafolio"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}
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
