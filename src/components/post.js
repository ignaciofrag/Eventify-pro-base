import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function Post() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 col-sm-8">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cdn0.matrimonios.cl/article-real-wedding/303/3_2/960/jpg/410041.jpeg"
                                alt="Primera diapositiva"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Xdkm_D-Ma8kq26Oip2h4CjgjyYbr1c4cQi3qXpmVUw&s"
                                alt="Segunda diapositiva"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.zankyou.cl/images/mag-card-c/fc2/80b6/878/623/-/cl/wp-content/uploads/2018/07/befunky-collage-8-1.jpg"
                                alt="Tercera diapositiva"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <h3>Información</h3>
                    <p>
                        Daniella Pilpintu es una maestra de ceremonias simbólicas apasionada por crear momentos únicos y auténticos en cada etapa de la vida, especialmente en bodas. Su objetivo es brindarles una experiencia llena de emociones y significados duraderos. Desde festejos íntimos hasta grandes celebraciones, ella ofrece una guía cálida y profesional en cada paso del camino.
                    </p>
                    <h3>Servicios que ofrece</h3>
                    <p>Se especializa en rituales simbólicos y alternativos. Puede diseñar cuidadosamente cada aspecto de este día de acuerdo a sus deseos y necesidades. El proceso involucra una o dos entrevistas previas. El tipo de ceremonias que brinda son:</p>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Entre 100 y 300 invitados</td>
                                    <td>Ceremonia</td>
                                    <td>Ecológicas</td>
                                    <td>Al aire libre</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-sm-4">
                    <div className="mb-3">
                        <Link to="/" className="btn btn-danger">Volver al atrás</Link>
                    </div>
                    <div className="mb-3">
                        <a href="#!" className="btn btn-danger">Enviar Mensaje</a>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Daniela paz</h5>
                            <p className="card-text">$500000</p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                </svg> Sin Opiniones
                            </li>
                            <li className="list-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </li>
                            <li className="list-group-item"><i className="fa fa-mobile" aria-hidden="true"></i> 12345678</li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-danger">Reservar</button>
                </div>
            </div>
        </div>
    );
}

export default Post