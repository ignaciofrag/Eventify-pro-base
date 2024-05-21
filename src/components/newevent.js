import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function NewEventModal(props) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventType, setEventType] = useState(""); // Estado para el tipo de evento
  

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    const newEvent = {
      name: e.target.formEventName.value,
      eventType: eventType,
      date: new Date().toLocaleString(), // Ejemplo de fecha
      guestCount: 50, // Ejemplo de cantidad de invitados
    };
    props.addEvent(newEvent); // Agrega el evento al estado en UserDashboard
    props.onHide(); // Cierra el modal
  };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="bg-dark text-white"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title id="contained-modal-title-vcenter">
          Crear y Buscar Proveedores de Eventos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEventName">
            <Form.Label>Nombre del Evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre del evento"
            />
          </Form.Group>
          <Form.Group controlId="formEventType">
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Control
              as="select"
              value={eventType}
              onChange={handleEventTypeChange}
            >
              <option>Cumpleaños</option>
              <option>Matrimonio</option>
              <option>Bautizo</option>
              <option>Aniversario</option>
              <option>Cena formal</option>
              <option>Asado</option>
              <option>Despedida de soltera/o</option>
              <option>Otro</option>
            </Form.Control>
          </Form.Group>
          {eventType === "Otro" && (
            <Form.Group controlId="formCustomEvent">
              <Form.Label>Especifica el Evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el tipo de evento"
              />
            </Form.Group>
          )}
          <Form.Group controlId="formLocation">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              as="select"
              onChange={handleLocationChange}
              value={selectedLocation}
            >
              <option value="">Selecciona una ubicación</option>
              <option>Santiago</option>
              <option>Antofagasta</option>
              <option>Iquique</option>
              <option>La Serena</option>
              <option>Rancagua</option>
              <option>Viña del Mar</option>
              <option>Valparaíso</option>
              <option>Talca</option>
              <option>Concepción</option>
              <option>Temuco</option>
              <option>Osorno</option>
              <option>Valdivia</option>
              <option>Puerto Montt</option>
              <option>Chiloé</option>
              <option>Frutillar</option>
              <option>Puerto Natales</option>
              {/* Añadir más opciones de ubicación si es necesario */}
            </Form.Control>
          </Form.Group>
          {selectedLocation === "Santiago" && (
            <Form.Group controlId="formComuna">
              <Form.Label>Comuna</Form.Label>
              <Form.Control as="select">
                <option value="Providencia">Providencia</option>
                <option value="Cerrillos">Cerrillos</option>
                <option value="Cerro Navia">Cerro Navia</option>
                <option value="Conchalí">Conchalí</option>
                <option value="El Bosque">El Bosque</option>
                <option value="Estación Central">Estación Central</option>
                <option value="Huechuraba">Huechuraba</option>
                <option value="Independencia">Independencia</option>
                <option value="La Cisterna">La Cisterna</option>
                <option value="La Florida">La Florida</option>
                <option value="La Granja">La Granja</option>
                <option value="La Pintana">La Pintana</option>
                <option value="La Reina">La Reina</option>
                <option value="Las Condes">Las Condes</option>
                <option value="Lo Barnechea">Lo Barnechea</option>
                <option value="Lo Espejo">Lo Espejo</option>
                <option value="Lo Prado">Lo Prado</option>
                <option value="Macul">Macul</option>
                <option value="Maipú">Maipú</option>
                <option value="Ñuñoa">Ñuñoa</option>
                <option value="Padre Hurtado">Padre Hurtado</option>
                <option value="Peñaflor">Peñaflor</option>
                <option value="Peñalolén">Peñalolén</option>
                <option value="Pirque">Pirque</option>
                <option value="Providencia">Providencia</option>
                <option value="Puente Alto">Puente Alto</option>
                <option value="Quilicura">Quilicura</option>
                <option value="Quinta Normal">Quinta Normal</option>
                <option value="Recoleta">Recoleta</option>
                <option value="Renca">Renca</option>
                <option value="San Bernardo">San Bernardo</option>
                <option value="San Joaquín">San Joaquín</option>
                <option value="San José de Maipo">San José de Maipo</option>
                <option value="San Miguel">San Miguel</option>
                <option value="San Ramón">San Ramón</option>
                <option value="Talagante">Talagante</option>
                <option value="Vitacura">Vitacura</option>
                {/* Añadir el resto de comunas aquí */}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group controlId="formGroupName">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa nombre del proveedor"
            />
          </Form.Group>
          <Form.Group controlId="formGroupType">
            <Form.Label>Tipo de Servicio</Form.Label>
            <Form.Control type="text" placeholder="Tipo de servicio" />
          </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white">
        <Button variant="danger" type="submit">
          Crear evento
        </Button>
        <Button variant="warning" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewEventModal;
