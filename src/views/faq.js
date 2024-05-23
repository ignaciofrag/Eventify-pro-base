import React from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const faqs = [
  {
    question: "¿Cómo puedo registrarme en la plataforma?",
    answer: "Para registrarte, haz clic en el botón de 'Registrarse' en la parte superior derecha de la página y sigue las instrucciones."
  },
  {
    question: "¿Es gratis usar la plataforma?",
    answer: "Sí, registrarse y buscar proveedores en la plataforma es completamente gratis. Los costos pueden variar según los servicios contratados."
  },
  {
    question: "¿Cómo puedo contactar a un proveedor?",
    answer: "Puedes contactar a un proveedor haciendo clic en el botón 'Contactar' en el perfil del proveedor que deseas contratar."
  },
  {
    question: "¿Qué tipo de servicios puedo encontrar aquí?",
    answer: "Puedes encontrar una amplia variedad de servicios para eventos, incluyendo planificación, catering, decoración, entretenimiento, y más."
  },
  {
    question: "¿Cómo se garantiza la calidad de los proveedores?",
    answer: "Todos los proveedores son verificados y revisados por nuestro equipo para asegurar la mejor calidad en los servicios ofrecidos."
  },
  {
    question: "¿Puedo dejar una reseña de un proveedor?",
    answer: "Sí, después de contratar un servicio, puedes dejar una reseña en el perfil del proveedor."
  },
  {
    question: "¿Cómo puedo convertirme en proveedor?",
    answer: "Para convertirte en proveedor, regístrate en la plataforma y completa el formulario de proveedor con toda la información requerida."
  }
];

function FAQ() {
  return (
    <div>
      <main>
        <section className="py-5 text-center container bg-dark">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">Preguntas Frecuentes (FAQ)</h1>
              <p className="lead text-light">Encuentra respuestas a las preguntas más comunes sobre el uso de nuestra plataforma.</p>
            </div>
          </div>
        </section>

        <Container className="py-5 bg-dark">
          <h2 className="text-center mb-4 text-light">Preguntas Frecuentes</h2>
          <Row>
            <Col>
              <Accordion defaultActiveKey="0" style={{ backgroundColor: '#000', color: '#fff' }}>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header style={{ backgroundColor: '#000', color: '#fff' }}>{faq.question}</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#fff', color: '#000' }}>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default FAQ;
