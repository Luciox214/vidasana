// Archivo para definir rutas principales y rutas protegidas según el rol del usuario
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './features/Login';
import Dashboard from './features/Dashboard/Dashboard';
import PacientesList from './features/Pacientes/PacientesList';
import ProfesionalesTabs from './features/Profesionales/ProfesionalesTabs';
import Habitos from './features/Habitos/Habitos';
// import Red from './features/Red/Red'; // Importa el módulo de Red médico-paciente
import MainLayout from './components/MainLayout'; // Importa el layout profesional
import Turnos from './features/Turnos/Turnos'; // Importa el módulo de Turnos
import Riesgos from './features/Riesgos/Riesgos'; // Importa el módulo de Riesgos y Recomendaciones
import Register from './features/Register'; // Importa el módulo de registro
import MedicosPaciente from './features/Red/MedicosPaciente'; // Importa el módulo de Médicos para el paciente
import HistoriaClinica from './features/HistoriaClinica/HistoriaClinica'; // Importa el módulo de Historia Clínica
import MedicosList from './features/Medicos/MedicosList'; // Importa el módulo de Médicos

const AppRoutes = () => {
  // Simulación de autenticación (reemplazar por contexto real)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/pacientes" element={isAuthenticated ? <MainLayout><PacientesList /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/profesionales" element={isAuthenticated ? <MainLayout><ProfesionalesTabs /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/habitos" element={isAuthenticated ? <MainLayout><Habitos /></MainLayout> : <Navigate to="/login" />} />
        {/* <Route path="/red" element={isAuthenticated ? <MainLayout><Red /></MainLayout> : <Navigate to="/login" />} /> */}
        <Route path="/turnos" element={isAuthenticated ? <MainLayout><Turnos /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/riesgos" element={isAuthenticated ? <MainLayout><Riesgos /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/medicos" element={isAuthenticated ? <MainLayout><MedicosPaciente /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/historia-clinica" element={isAuthenticated ? <MainLayout><HistoriaClinica /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/todos-medicos" element={isAuthenticated ? <MainLayout><MedicosList /></MainLayout> : <Navigate to="/login" />} />
        {/* Agrega más rutas protegidas aquí */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
