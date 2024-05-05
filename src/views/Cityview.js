import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Cityview() {
  const { cityName } = useParams();
  
  // posiblemente tendremos que integrar desde desde un API.
  const cityData = {
    title: `Lugares en ${cityName}`,
    description: `Información detallada sobre eventos y locales en ${cityName}. Ideal para todo tipo de celebraciones y eventos.`,
    imgSrc: `/path/to/images/${cityName}.jpg`//revisar****la logica para recarga de imagenes está fija a nombrede ciudad
  };

  return (
    <main>
      <section className="py-5 text-center container bg-dark text-light">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light text-light">{cityData.title}</h1> {/* Utilizando el título de cityData */}
            <p className="lead">{cityData.description}</p>

          </div>
        </div>
      </section>

      <div className="album py-5 bg-dark">
        <Container>
          <Row xs={1} sm={2} md={3} className="g-3">
            {[...Array(9)].map((_, index) => (
              <Col key={index}>
                <Card className="shadow-sm">
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                  <Card.Body>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Button variant="outline-secondary" size="sm">View</Button>{' '}
                        <Button variant="outline-secondary" size="sm">Edit</Button>
                      </div>
                      <small className="text-body-secondary">9 mins</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </main>
  );
}

export default Cityview;