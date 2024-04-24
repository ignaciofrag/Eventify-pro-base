import React from 'react';


function Home() {
  return (
    <div>
      <main>
        <section className="py-5 text-center container bg-dark">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">Encuentra y reserva proveedores de eventos</h1>
              <p className="lead text-light">Cubrimos todos los aspectos de tu evento, desde la selección del lugar perfecto y el servicio de catering, hasta los fotógrafos más destacados. Reserva con nosotros y asegura un evento inolvidable.</p>
              <p>
              <form className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Busca un proveedor" aria-label="Search" />
                <button className="btn btn-danger" type="submit">Buscar</button>
              </form>
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {/* Aquí irían los componentes de las tarjetas */}
              {/* Repite el componente de la tarjeta según sea necesario */}
              <Card />
              <Card />
              {/* ... */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Card = () => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        {/* Aquí podrías poner una imagen en lugar de un SVG */}
        <div className="card-body">
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;