import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImage from '../imgs/defaultService.png';

// Importar imágenes
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

const categories = {
  "Planificación y Coordinación": [
    "Planificación y coordinación de eventos 📋",
    "Planificación de bodas 💍",
    "Planificación de fiestas temáticas 🎉",
    "Planificación de cumpleaños y fiestas infantiles 🎂",
    "Planificación de eventos en cruceros 🚢",
    "Coordinación de conferencias y seminarios 📊",
    "Gestión de eventos corporativos 🏢",
    "Consultoría de eventos 💼",
    "Coordinación de eventos virtuales y webinars 💻",
    "Consultoría de riesgos y seguros para eventos 📑"
  ],
  "Decoración y Servicios": [
    "Decoración de eventos 🎨",
    "Floristería y arreglo de flores 💐",
    "Iluminación y efectos especiales 💡",
    "Diseño de stands y exhibiciones 🖼️",
    "Diseño y producción de invitaciones ✉️",
    "Diseño y producción de merchandising 🎁",
    "Diseño de menús y servicios de chef privado 🍴",
    "Servicios de impresión y señalización 🖨️"
  ],
  "Catering y Bebidas": [
    "Catering y servicios de alimentos 🍽️",
    "Bebidas y bar móvil 🍹",
    "Servicios de catering especializado (vegano, kosher, etc.) 🥗",
    "Food Trucks 🚚"
  ],
  "Arriendo de Equipos y Logística": [
    "Arriendo de mobiliario 🪑",
    "Arriendo de carpas y toldos ⛺",
    "Arriendo de equipos de tecnología 🖥️",
    "Arriendo de escenarios y tarimas 🎪",
    "Transporte y logística 🚚",
    "Control de clima y calefacción ❄️",
    "Servicios de limpieza y mantenimiento 🧹"
  ],
  "Animación y Entretenimiento": [
    "Animación y entretenimiento 🎭",
    "DJ y música en vivo 🎶",
    "Espectáculos de fuegos artificiales 🎆",
    "Producción de espectáculos y shows 🎬",
    "Animación infantil 🤹",
    "Conciertos y festivales 🎤",
    "Eventos deportivos ⚽"
  ],
  "Fotografía y Videografía": [
    "Fotografía profesional 📸",
    "Videografía 🎥"
  ],
  "Servicios Adicionales": [
    "Hostess y personal de recepción 🙋",
    "Seguridad y control de acceso 🔐",
    "Servicios de traducción e interpretación 🌎",
    "Registro y gestión de asistentes 📝",
    "Creación de páginas web para eventos 🌐",
    "Gestión de redes sociales para eventos 📱",
    "Programas de incentivos y team building 🤝",
    "Coordinación de viajes y alojamiento 🛏️",
    "Marketing y promoción de eventos 📢",
    "Servicios de protocolo y etiqueta 🎩",
    "Eventos benéficos y recaudación de fondos 💸",
    "Servicios de maquillaje y peluquería 💄"
  ]
};

function Home() {
  const [services, setServices] = useState([]);  // Estado para almacenar los servicios disponibles
  const [visited, setVisited] = useState([]);   // Estado para manejar las opciones visitadas
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5500/services');
        const data = await response.json();
        if (response.ok) {
          setServices(data);  // Carga los servicios en el estado
        } else {
          throw new Error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleAccordionItemClick = (type) => {
    setVisited([...visited, type]);
    navigate(`/services/type/${encodeURIComponent(type)}`);
  };

  const limitedServices = services.slice(0, 3);

 

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
              <Accordion defaultActiveKey="-1" style={{ backgroundColor: '#000', color: '#fff' }}>
                {Object.entries(categories).map(([category, types], index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header style={{ backgroundColor: '#000', color: '#fff', fontWeight: 'bold' }}>
                      {category}
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#fff', color: '#000' }}>
                      {types.map((type, idx) => (
                        <Button 
                          key={idx} 
                          variant="link" 
                          onClick={() => handleAccordionItemClick(type)} 
                          className={`text-decoration-none ${visited.includes(type) ? 'text-primary' : 'text-black'}`}
                          style={{ textDecoration: 'none', color: visited.includes(type) ? 'blue' : 'black' }}
                          onMouseEnter={(e) => e.target.style.color = 'red'}
                          onMouseLeave={(e) => e.target.style.color = visited.includes(type) ? 'blue' : 'black'}
                        >
                          {type}
                        </Button>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        <Container className="py-5 bg-dark">
          <h2 className="text-center mb-4 text-light">Servicios buscados por los clientes ⭐</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {limitedServices.map(service => (
              <Col key={service.id}>
                <Card style={{ width: '18rem', backgroundColor: '#333', color: '#fff' }}>
                  <Card.Img variant="top" src={service.image || defaultImage} />
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="danger" onClick={() => navigate('/post')}>Ver más</Button>
          </div>
        </Container>

        <Container className="py-5 bg-dark">
          <h2 className="text-center mb-4 text-light">Proveedores de Eventos en todo Chile 🗺️</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {properties.map((property, index) => (
              <Col key={index}>
                <Card style={{ width: '18rem', backgroundColor: '#333', color: '#fff' }}>
                  <Card.Img variant="top" src={property.img} />
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>
                      Encuentra el proveedor perfecto para tus eventos y celebraciones ubicado en {property.city}.
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
        
      </main>
    </div>
  );
}



export default Home;
