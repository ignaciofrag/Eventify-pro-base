import React from 'react';
import '../styles/navbar.css'
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavigationBar ({ onLoginClick }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={require("../imgs/logo.png")}
                width="40"
                height="32"
                className="d-inline-block align-top"
                alt="Logo"
              />
             <span className="navbar-logo-text">  Eventify Pro</span> {/* Agregado texto del logo */}

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" className="text-secondary">Home</Nav.Link>
                <Nav.Link href="#">Proveedores</Nav.Link>
                <Nav.Link href="#">Eventos</Nav.Link>
                <Nav.Link href="#">FAQs</Nav.Link>
                <Nav.Link href="#">Acerca de</Nav.Link>
              </Nav>
            
              <Button variant="warning" className="me-2" onClick={onLoginClick}>Iniciar sesión</Button>
              <Button variant="danger">Registrate</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    
    export default NavigationBar;