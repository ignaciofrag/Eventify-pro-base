import React, { useState } from 'react';
import { Dropdown, DropdownButton, Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import CityView from './Cityview';
// Imporcionde imágenes
import antofagasta from '../imgs/antofagasta.jpg';
import vinaDelMar from '../imgs/viñadelmar.jpg';
import concon from '../imgs/concon.jpg';
import iquique from '../imgs/iquique.jpg';
import concepcion from '../imgs/concepcion.jpg';
import rancagua from '../imgs/Rancagua.JPG';
import santiago from '../imgs/SantiagodeChile.jpg';
import valdivia from '../imgs/Valdivia.png';
import temuco from '../imgs/Temuco.jpg';
import coquimbo from '../imgs/Coquimbo.jpg';
import laSerena from '../imgs/LaSerena.jpg';
import valparaiso from '../imgs/Valparaiso.jpg';
import pucon from '../imgs/Pucon.JPG';
import puertoVaras from '../imgs/PuertoVaras.jpg';


function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const handleToggleDropdown = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const featuredProviders = [
    { id: 1, name: "Banquete Palace", location: "Santiago", timesHired: 150 },
    { id: 2, name: "Sonido Boom", location: "Viña del Mar", timesHired: 90 },
    { id: 3, name: "Flores del Campo", location: "Concepción", timesHired: 120 },
  ];

  const properties = [
    { city: "Antofagasta", title: "Lugares en Antofagasta", img: antofagasta },
    { city: "Viña del Mar", title: "Lugares en Viña del Mar", img: vinaDelMar },
    { city: "Concón", title: "Lugares en Concón", img: concon },
    { city: "Iquique", title: "Lugares en Iquique", img: iquique },
    { city: "Concepción", title: "Lugares en Concepción", img: concepcion },
    { city: "Rancagua", title: "Lugares en Rancagua", img: rancagua },
    { city: "Santiago", title: "Lugares en Santiago", img: santiago },
    { city: "Valdivia", title: "Lugares en Valdivia", img: valdivia },
    { city: "Temuco", title: "Lugares en Temuco", img: temuco },
    { city: "Coquimbo", title: "Lugares en Coquimbo", img: coquimbo },
    { city: "La Serena", title: "Lugares en La Serena", img: laSerena },
    { city: "Valparaíso", title: "Lugares en Valparaíso", img: valparaiso },
    { city: "Pucón", title: "Lugares en Pucón", img: pucon },
    { city: "Puerto Varas", title: "Lugares en Puerto Varas", img: puertoVaras }
  ];
  
  const handleMoreInfoClick = (city) => {
    navigate(`/city/${city}`);
  };


  return (
    <div>
      <main>
        <section className="py-5 text-center container bg-dark">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">Encuentra y reserva proveedores de eventos</h1>
              <p className="lead text-light">Cubrimos todos los aspectos de tu evento, desde la selección del lugar perfecto hasta los fotógrafos más destacados. Reserva aquí y asegura un evento inolvidable.</p>
              <DropdownButton
                as={Dropdown.MenuShow}
                align="end"
                title="Busca un proveedor"
                id="dropdown-custom-components"
                variant="danger"
                show={showDropdown}
                onToggle={handleToggleDropdown}
              >
                <Dropdown.Item eventKey="1">Lugares para eventos</Dropdown.Item>
                <Dropdown.Item eventKey="2">Catering</Dropdown.Item>
                <Dropdown.Item eventKey="3">Música y entretenimiento</Dropdown.Item>
                <Dropdown.Item eventKey="4">Decoración</Dropdown.Item>
                <Dropdown.Item eventKey="5">Iluminación</Dropdown.Item>
                <Dropdown.Item eventKey="6">DJ</Dropdown.Item>
                <Dropdown.Item eventKey="7">Mueblería</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </section>

        <Container className="py-5 bg-dark">
          <h2 className="text-center mb-4 text-light">Lugares de Eventos en Chile</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {properties.map((property, index) => (
              <Col key={index}>
    <Card style={{ width: '18rem', backgroundColor: '#333', color: '#fff' }}>
                <Card.Img variant="top" src={property.img} />
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>
                      Encuentra el lugar perfecto para tus eventos y celebraciones ubicado en {property.city}.
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleMoreInfoClick(property.city)}>
                    Más información
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Container className="py-5 bg-dark">
          <h2 className="text-center mb-4 text-light">Proveedores Destacados ⭐ </h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {featuredProviders.map(provider => (
              <Col key={provider.id}>
                <ProviderCard name={provider.name} location={provider.location} timesHired={provider.timesHired} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
}

const ProviderCard = ({ name, location, timesHired }) => {
  return (
    <Card style={{ backgroundColor: '#333', color: '#fff' }}>
      <Card.Body>
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-light">{location}</h6>
        <p className="card-text">Este proveedor ha sido contratado <Badge bg="secondary">{timesHired} veces</Badge>.</p>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="danger">Ver más</Button>
          <small className="text-light">Actualizado hace 9 mins</small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Home;
