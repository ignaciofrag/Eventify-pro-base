// src/components/RegistroUsuario.js

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';


function RegistroUsuario() {
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
  const { setUser } = useAuth();

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
      Swal.fire({
        title: '¡Oops!',
        text: `Por favor completa los campos requeridos: ${missingFields.join(", ")}`,
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


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        title: '¡Oops!',
        text: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.',
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

    if (formData.password !== formData.confirmPassword) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: '¡Oops!',
        text: 'Por favor introduce un correo electrónico válido.',
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
        sessionStorage.setItem('userToken', data.access_token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        setUser({ ...data.user, isAuthenticated: true });
        Swal.fire({
          title: '¡Registro exitoso! 🎉',
          text: '¡Bienvenido a nuestra plataforma!',
          icon: 'success',
          confirmButtonText: 'Vamos allá',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        navigate(data.user.profile.role === "Proveedor" ? '/providerdashboard' : '/userdashboard');
      } else if (response.status === 409) {
        Swal.fire({
          title: '¡Correo ya registrado! 📧',
          text: 'Por favor, inicie sesión.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
            } else {
        const errorData = await response.json();
        Swal.fire({
          title: '¡Error en el registro! 😢',
          text: `Error: ${errorData.msg}`,
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
    } catch (error) {
      Swal.fire({
        title: '¡Error en el registro! 😢',
        text: `Error: ${error.message}`,
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.isAuthenticated) {
        navigate(parsedUser.profile.role === "Proveedor" ? '/providerdashboard' : '/userdashboard');
      }
    }
  }, [navigate]);

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
