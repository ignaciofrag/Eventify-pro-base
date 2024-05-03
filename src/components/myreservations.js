import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiCollection, BiUserCircle, BiCog, BiChevronRight } from 'react-icons/bi'; // Cambiado BiToggles2 por BiCog

const MyReservations = () => {
  return (
    <Container className="px-4 py-5 bg-dark text-light" id="featured-3">
      <h2 className="pb-2 border-bottom">Mis Reservas</h2>
      <Row className="g-4 py-5" xs={1} lg={3}>
        <Col>
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <BiCollection size="1.5em" />
          </div>
          <h3 className="fs-2 text-light">El evento</h3>
          <p className="text-secondary">Cantidad de invitados y la fecha del evento en formato de hora, día y mes.</p>
          <a href="/#" className="icon-link">
            Detalles
            <BiChevronRight />
          </a>
        </Col>
        <Col>
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <BiUserCircle size="1.5em" />
          </div>
          <h3 className="fs-2 text-light">El evento</h3>
          <p className="text-secondary">Cantidad de invitados y la fecha del evento en formato de hora, día y mes.</p>
          <a href="/#" className="icon-link">
          Detalles
            <BiChevronRight />
          </a>
        </Col>
        <Col>
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <BiCog size="1.5em" /> {/* Usando BiCog */}
          </div>
          <h3 className="fs-2 text-light">El evento</h3>
          <p className="text-secondary">Cantidad de invitados y la fecha del evento en formato de hora, día y mes.</p>
          <a href="/#" className="icon-link">
          Detalles
            <BiChevronRight />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default MyReservations;
