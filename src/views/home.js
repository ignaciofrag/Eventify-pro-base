import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSearch = (e) => {
    console.log("Buscando:", e.target.value);
  };

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <FormControl
      ref={ref}
      className="form-control me-2"
      type="search"
      placeholder="Busca un proveedor"
      aria-label="Search"
      onClick={onClick} // Para abrir el dropdown al hacer clic en el input
      onChange={handleSearch} // Para manejar la búsqueda al escribir
      onFocus={() => setShowDropdown(true)}
    />
  ));

  const CustomMenu = React.forwardRef(
    ({ style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className + " d-block"}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled mb-0">
          <li><a className="dropdown-item" href="/#">Lugares para eventos</a></li>
          <li><a className="dropdown-item" href="/#">Catering</a></li>
          <li><a className="dropdown-item" href="/#">Música y entretenimiento</a></li>
          <li><a className="dropdown-item" href="/#">Decoración</a></li>
          <li><a className="dropdown-item" href="/#">Iluminación</a></li>
          <li><a className="dropdown-item" href="/#">DJ</a></li>
          <li><a className="dropdown-item" href="/#">Mueblería</a></li>
            {/* Más items según sea necesario */}
          </ul>
        </div>
      );
    },
  );

  return (
    <div ref={dropdownRef}>
      <main>
        <section className="py-5 text-center container bg-dark">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">Encuentra y reserva proveedores de eventos</h1>
              <p className="lead text-light">Cubrimos todos los aspectos de tu evento, desde la selección del lugar perfecto y el servicio de catering, hasta los fotógrafos más destacados. Reserva aquí y asegura un evento inolvidable.</p>
              <p>
                <Dropdown onToggle={handleToggleDropdown} show={showDropdown}>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                  <Dropdown.Menu as={CustomMenu}></Dropdown.Menu>
                </Dropdown>
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
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
