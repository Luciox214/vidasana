import React from 'react';
import './Riesgos.css';

const perfiles = [
  {
    nombre: 'Juan Pérez',
    riesgo: 7.5,
    recomendaciones: 'Reducir sal, control mensual de presión.',
    antecedentesFamiliares: 'Padre hipertenso',
  },
  {
    nombre: 'María Gómez',
    riesgo: 4.2,
    recomendaciones: 'Evitar alérgenos, seguimiento respiratorio.',
    antecedentesFamiliares: 'Madre asmática',
  },
];

const Riesgos = () => (
  <div className="card">
    <h2>Evaluación de Riesgos y Recomendaciones</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Score de Riesgo</th>
          <th>Recomendaciones</th>
          <th>Antecedentes Familiares</th>
        </tr>
      </thead>
      <tbody>
        {perfiles.map((p, i) => (
          <tr key={i}>
            <td>{p.nombre}</td>
            <td>{p.riesgo}</td>
            <td>{p.recomendaciones}</td>
            <td>{p.antecedentesFamiliares}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Riesgos;
