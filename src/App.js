import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/home';
import NavigationBar from './components/navbar';
import UserNavbar from './components/usernavbar'; // Asegúrate de que este es el nombre correcto y la ruta del archivo
import LoginModal from './components/login'
import UserDashboard from './views/userdashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  function Layout() {
    const location = useLocation();

   return (
      <>
        {location.pathname.includes('/userdashboard') ? <UserNavbar /> : <NavigationBar onLoginClick={() => setShowLogin(true)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          {/* Agregar más rutas aquí */}
        </Routes>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      </>
    );
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;