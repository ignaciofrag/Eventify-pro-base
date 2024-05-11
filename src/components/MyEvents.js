import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function MyEvents() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5500/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    return (
        <div className="container mt-4">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del Servicio</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id}>
                            <td>{index + 1}</td>
                            <td>{service.name}</td>
                            <td>{service.type}</td>
                            <td>${service.price.toFixed(2)}</td>
                            <td>{service.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MyEvents;
