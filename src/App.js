import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/home';
import NavigationBar from './components/navbar';
import UserNavbar from './components/usernavbar'; // Asegúrate de que este es el nombre correcto y la ruta del archivo
import LoginModal from './components/login'
import UserDashboard from './views/userdashboard';
import Post from './components/post';
import RegistroUsuario from './components/RegistroUsuario';
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
      <Route path="/post" element={<Post />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/registrarse" element={<RegistroUsuario />} /> {/* Usa element en lugar de component */}
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