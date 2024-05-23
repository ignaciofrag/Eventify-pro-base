import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function Post() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://localhost:5500/services');
                const data = await response.json();
                if (response.ok) {
                    setProviders(data);
                } else {
                    throw new Error('Failed to fetch providers');
                }
            } catch (error) {
                console.error('Error fetching providers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return (
        <div className="bg-dark text-light py-5">
            <Container>
                <div className="text-center mb-4">
                    <Link to="/" className="btn btn-danger">Volver al inicio</Link>
                </div>
                {loading ? (
                    <p className="text-center">Cargando proveedores...</p>
                ) : (
                    <Row className="justify-content-center">
                        {providers.map(provider => (
                            <Col key={provider.id} xs={12} md={6} lg={4} className="mb-4">
                                <Card style={{ backgroundColor: '#333', color: '#fff' }}>
                                    <Card.Body>
                                        <h5 className="card-title">{provider.company_name}</h5>
                                        <p className="card-text">{provider.description}</p>
                                        <p className="card-text">
                                            ${provider.price} {provider.pricingType === 'por hora' ? 'por hora' : 'por evento'}
                                        </p>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item" style={{ backgroundColor: '#333', color: '#fff' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                                </svg> Sin Opiniones
                                            </li>
                                            <li className="list-group-item" style={{ backgroundColor: '#333', color: '#fff' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                </svg>
                                                {provider.location || 'Ubicación no especificada'}
                                            </li>
                                        </ul>
                                        <Button variant="danger" className="w-100 mt-3">Reservar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Post;
