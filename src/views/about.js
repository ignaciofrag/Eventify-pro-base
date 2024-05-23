import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <div>
      <main>
        <section className="py-5 text-center container bg-dark">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">Acerca de Nosotros</h1>
              <p className="lead text-light">Hecho con ❤️ para proyecto final de 4geeks</p>
            </div>
          </div>
        </section>

        <Container className="py-5 bg-dark">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="bg-secondary text-light">
                <Card.Body>
                  <Card.Text className="text-center">
                    🌟 <strong>Gracias</strong> 🌟
                  </Card.Text>
                  <Card.Text className="text-center">
                    A mi novia, por su infinita paciencia y apoyo incondicional. ❤️
                  </Card.Text>
                  <Card.Text className="text-center">
                    A los profesores de 4geeks, por su enseñanza y paciencia ante los cambios de horario. 🎓
                  </Card.Text>
                  <Card.Text className="text-center">
                    Este proyecto es un testimonio de nuestro esfuerzo y dedicación. ¡Gracias a todos los que hicieron esto posible! 🚀
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default About;
