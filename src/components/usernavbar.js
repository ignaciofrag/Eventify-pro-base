import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Dropdown } from "react-bootstrap";

function UserNavbar() {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none"
          >
            <img src={logo} alt="Logo" width="40" height="32" />
          </Link>
          <span className="navbar-logo-text text-light">Eventify Pro </span>{" "}
          {/* Agregado texto del logo */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="#" className="nav-link px-2 link-secondary text-light">
                Overview
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link px-2 link-dark text-light">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link px-2 link-dark text-light">
                Customers
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link px-2 link-dark text-light">
                Products
              </Link>
            </li>
          </ul>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 text-light"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <Dropdown className="text-end">
            <Dropdown.Toggle
              as={Link}
              to="#"
              id="dropdownUser1"
              className="link-dark text-decoration-none"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="text-small bg-dark"
              aria-labelledby="dropdownUser1"
            >
              <Dropdown.Item as={Link} to="#" className="text-light">
                Nuevo evento
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#" className="text-light">
                Ajustes
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#" className="text-light">
                Perfil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="#" className="text-light">
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
