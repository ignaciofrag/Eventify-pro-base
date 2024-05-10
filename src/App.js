import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Home from './views/home';
import NavigationBar from './components/navbar';
import UserNavbar from './components/usernavbar';
import LoginModal from './components/login';
import Post from './components/post';
import UserDashboard from './views/userdashboard';
import Cityview from './views/Cityview';
import RegistroUsuario from './components/RegistroUsuario';
import ProviderDashboard from './views/ProviderDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  function Layout() {
    const { user } = useAuth(); // Utiliza useAuth para acceder al usuario
    const location = useLocation();

    const shouldShowUserNavbar = user && (location.pathname.includes('/userdashboard') || location.pathname.includes('/providerdashboard'));

    return (
      <>
        {shouldShowUserNavbar ? <UserNavbar /> : <NavigationBar onLoginClick={() => setShowLogin(true)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/providerdashboard" element={<ProviderDashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/city/:cityName" element={<Cityview />} />
          <Route path="/registrarse" element={<RegistroUsuario />} />
        </Routes>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      </>
    );
  }

  return (
    <Router>
      <AuthProvider> {/* Asegúrate de que todo está envuelto correctamente en AuthProvider */}
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
