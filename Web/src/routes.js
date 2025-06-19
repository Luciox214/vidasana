// Archivo para definir rutas principales y rutas protegidas según el rol del usuario
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './features/Login';
import Dashboard from './features/Dashboard';
// ...importa más pantallas según las vayas creando

const AppRoutes = () => {
  // Simulación de autenticación (reemplazar por contexto real)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        {/* Agrega más rutas protegidas aquí */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
