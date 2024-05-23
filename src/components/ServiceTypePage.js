import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import defaultImage from '../imgs/defaultService.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function ServiceTypePage() {
  const { serviceType } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:5500/services?type=${encodeURIComponent(serviceType)}`);
        const data = await response.json();
        console.log('Fetched services:', data);  // Agrega este console.log para verificar los datos
        if (response.ok) {
          setServices(data);
        } else {
          throw new Error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return;

        const response = await fetch('http://localhost:5500/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserRole(data.role);
          console.log('User role:', data.role);  // Verifica el rol del usuario
        } else {
          throw new Error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchServices();
    fetchUserRole();
  }, [serviceType]);

  const handleReservationClick = (serviceId) => {
    console.log('User role on reservation click:', userRole);  // Verifica el rol del usuario al hacer clic en reservar
    if (userRole === 'Proveedor') {
      MySwal.fire({
        icon: 'error',
        title: '¡Oops!',
        text: 'Parece que estás intentando reservar un servicio de proveedor. Recuerda que las reservas son exclusivas para clientes. Si eres un proveedor, puedes crear estos servicios 📅 para que los Clientes te encuentren y te contraten aquí. ¡Gracias por hacer de nuestra comunidad un lugar mejor! 😊👍',
      });
    } else {
      console.log(`Navigating to /service/${serviceId}`);
      window.location.href = `/service/${serviceId}`;
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Servicios de {serviceType}</h2>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <>
          {services.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {services.map(service => (
                <Col key={service.id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={service.image || defaultImage} />
                    <Card.Body>
                      <Card.Title>Servicio: {service.name}</Card.Title>
                      <Card.Text>Descripción: {service.description}</Card.Text>
                      <Card.Text>Compañía: {service.company_name}</Card.Text>
                      <Card.Text>Lugar: {service.location}</Card.Text>
                      <Button variant="danger" onClick={() => handleReservationClick(service.id)}>
                        Reservar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center">
              <h4>😔En estos momentos no hay ningún proveedor disponible 😔 de {serviceType}.</h4>
              <p>🌟 ¡Atención proveedores! 🌟 ¿Quieres que los clientes te encuentren? ¡Es tu momento de brillar! 🚀 Publica tus servicios aquí ✍️ y deja que los clientes vengan a ti para contratarte. 🤝

Y tú, cliente, ¿tienes un evento especial en mente? 🎉 Publica los detalles de tu evento 📆 y deja que nuestros proveedores te contacten para hacerlo realidad. ¡En Eventify Pro haremos que tu evento sea inolvidable! 🥳</p>
<Button variant="danger" as={Link} to="/">
                Home
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default ServiceTypePage;
