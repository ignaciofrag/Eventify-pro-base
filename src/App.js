import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import { AuthProvider } from './context/AuthContext';
import Home from './views/home';
import LoginModal from './components/login';
import Post from './components/post';
import UserDashboard from './views/userdashboard';
import Cityview from './views/Cityview';
import RegistroUsuario from './components/RegistroUsuario';
import ProviderDashboard from './views/ProviderDashboard';
import ClientRoute from './components/ClientRoute';
import ProviderRoute from './components/ProviderRoute';
import UserProfileModal from './components/UserProfileModal';
import ErrorBoundary from './components/ErrorBoundary';
import ServiceTypePage from './components/ServiceTypePage';
import FAQ from './views/faq';
import About from './views/about'; //

import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <MainNavbar onLoginClick={() => setShowLogin(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdashboard" element={<ClientRoute><UserDashboard /></ClientRoute>} />
          <Route path="/providerdashboard" element={<ProviderRoute><ErrorBoundary><ProviderDashboard /></ErrorBoundary></ProviderRoute>} />
          <Route path="/post" element={<Post />} />
          <Route path="/city/:cityName" element={<Cityview />} />
          <Route path="/registrarse" element={<RegistroUsuario />} />
          <Route path="/services/type/:serviceType" element={<ServiceTypePage />} /> {/* Añade esta línea */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} /> {/*ULTIMA RUTA */}


        </Routes>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        <UserProfileModal show={showProfile} onHide={() => setShowProfile(false)} onShowLogin={() => setShowLogin(true)} />
      </AuthProvider>
    </Router>
  );
}

export default App;
