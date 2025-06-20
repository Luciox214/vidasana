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
      <Link to="/dashboard" className="navbar-logo" style={{fontWeight: 'bold', fontSize: '1.7rem', letterSpacing: '1px', color: '#fff', textDecoration: 'none', marginRight: '2.5rem'}}>VidaSana</Link>
      <ul className="navbar-links">
        {role === 'PACIENTE' && <>
          <li><Link to="/profesionales">Profesionales</Link></li>
          <li><Link to="/habitos">Hábitos</Link></li>
          <li><Link to="/turnos">Turnos</Link></li>
          <li><Link to="/riesgos">Riesgos</Link></li>
          <li><Link to="/historia-clinica">Historia Clínica</Link></li>
        </>}
        {role === 'MEDICO' && <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/turnos-medico">Turnos</Link></li>
          <li><Link to="/pacientes">Pacientes</Link></li>
        </>}
        {/* Agrega más links según módulos y roles */}
      </ul>
    </nav>
  );
};

export default NavBar;
