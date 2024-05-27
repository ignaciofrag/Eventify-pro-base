import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css'; // Asegúrate de importar el archivo CSS

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <Container>
        <Row>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Eventify Pro</h5>
            <p>© 2024 Eventify Pro. Todos los derechos reservados.</p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><Link to="/about" className="footer-link">Sobre nosotros</Link></li>
              <li><a href="mailto:ignaciofrag@gmail.com" className="footer-link">Contacto</a></li> {/* Cambio realizado aquí */}
              <li><Link to="/services" className="footer-link">Servicios</Link></li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>Sígueme</h5>
            <ul className="list-unstyled">
              <li><a href="https://github.com/ignaciofrag" target="_blank" rel="noopener noreferrer" className="footer-link"><FontAwesomeIcon icon={faGithub} /> GitHub</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
