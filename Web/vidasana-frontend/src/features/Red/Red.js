import React from 'react';
import './Red.css';

const medicos = [
  { nombre: 'Dra. Ana Torres', pacientes: ['Juan Pérez', 'María Gómez'] },
  { nombre: 'Lic. Pablo Ruiz', pacientes: ['Juan Pérez'] },
];

const pacientes = [
  { nombre: 'Juan Pérez', medicos: ['Dra. Ana Torres', 'Lic. Pablo Ruiz'] },
  { nombre: 'María Gómez', medicos: ['Dra. Ana Torres'] },
];

const Red = () => (
  <div className="card">
    <h2>Red Médico-Paciente</h2>
    <div className="red-grid">
      <div>
        <h3>Médicos y sus pacientes</h3>
        <ul>
          {medicos.map((m, i) => (
            <li key={i}><b>{m.nombre}:</b> {m.pacientes.join(', ')}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Pacientes y sus médicos</h3>
        <ul>
          {pacientes.map((p, i) => (
            <li key={i}><b>{p.nombre}:</b> {p.medicos.join(', ')}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Red;
