import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

function NewEventModal({ show, onHide, addEvent }) {
  const [serviceName, setServiceName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [profileId, setProfileId] = useState('');  // Asumiendo que se requiere el ID del perfil

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = {
      name: serviceName,
      type: serviceType,
      price: parseFloat(servicePrice),
      description: serviceDescription,
      profile_id: parseInt(profileId),  // Asegúrate de que el ID del perfil es un número
    };

    try {
      const response = await fetch('http://localhost:5500/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService)
      });

      const responseData = await response.json();
      if (response.ok) {
        alert('Servicio creado con éxito!');
        addEvent(responseData);  // Si quieres actualizar el estado global o algo similar
      } else {
        alert(`Error al crear servicio: ${responseData.message}`);
      }
    } catch (error) {
      alert('Error al conectarse al servidor');
    }

    onHide(); // Cerrar el modal después de enviar el formulario
    // Limpiar los campos del formulario
    setServiceName('');
    setServiceType('');
    setServicePrice('');
    setServiceDescription('');
    setProfileId('');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Publicar Servicio Necesitado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="serviceName" label="Nombre o título del Servicio" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre o título del Servicio"
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="serviceType" label="Tipo de Evento" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Tipo de Evento o lugar que se necesita"
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="servicePrice" label="Precio" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Precio"
              value={servicePrice}
              onChange={e => setServicePrice(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="serviceDescription" label="Descripción del Servicio" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Descripción del Servicio"
              style={{ height: '100px' }}
              value={serviceDescription}
              onChange={e => setServiceDescription(e.target.value)}
              required
            />
          </FloatingLabel>
          
          <Button variant="primary" type="submit">
            Añadir Servicio
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewEventModal;
