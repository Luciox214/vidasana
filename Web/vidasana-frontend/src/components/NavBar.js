import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

// Utilidad para obtener el rol desde el JWT guardado
function getUserRole() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}

const NavBar = () => {
  const role = getUserRole();
  return (
    <nav className="navbar">
      <div className="navbar-logo">VidaSana</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/* Solo para médicos/admins */}
        {role !== 'PACIENTE' && <li><Link to="/pacientes">Pacientes</Link></li>}
        <li><Link to="/profesionales">Profesionales</Link></li>
        <li><Link to="/habitos">Hábitos</Link></li>
        <li><Link to="/red">Red</Link></li>
        <li><Link to="/turnos">Turnos</Link></li>
        <li><Link to="/riesgos">Riesgos</Link></li>
        {/* Agrega más links según módulos */}
      </ul>
    </nav>
  );
};

export default NavBar;
