import React from 'react';
import './Dashboard.css';

// Datos simulados para analítica
const pacientes = 12;
const profesionales = 5;
const turnosHoy = 4;
const alertas = 2;
const habitosStats = [
  { label: 'Sueño óptimo', value: 8 },
  { label: 'Sueño insuficiente', value: 4 },
];
const sintomasStats = [
  { label: 'Sin síntomas', value: 7 },
  { label: 'Con síntomas', value: 5 },
];

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Pacientes activos</h3>
          <div className="dashboard-number">{pacientes}</div>
        </div>
        <div className="dashboard-card">
          <h3>Profesionales</h3>
          <div className="dashboard-number">{profesionales}</div>
        </div>
        <div className="dashboard-card">
          <h3>Turnos hoy</h3>
          <div className="dashboard-number">{turnosHoy}</div>
        </div>
        <div className="dashboard-card dashboard-alert">
          <h3>Alertas de riesgo</h3>
          <div className="dashboard-number">{alertas}</div>
        </div>
      </div>
      <div className="dashboard-analytics">
        <div className="dashboard-analytics-card">
          <h4>Distribución de Sueño</h4>
          <PieChart data={habitosStats} />
        </div>
        <div className="dashboard-analytics-card">
          <h4>Síntomas reportados</h4>
          <PieChart data={sintomasStats} />
        </div>
      </div>
    </div>
  );
};

// Componente simple de gráfico de torta (simulado con CSS)
const PieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 32 32">
      {data.map((d, i) => {
        const start = acc / total;
        acc += d.value;
        const end = acc / total;
        const large = end - start > 0.5 ? 1 : 0;
        const a = 2 * Math.PI * start;
        const b = 2 * Math.PI * end;
        const x1 = 16 + 16 * Math.sin(a);
        const y1 = 16 - 16 * Math.cos(a);
        const x2 = 16 + 16 * Math.sin(b);
        const y2 = 16 - 16 * Math.cos(b);
        const color = i % 2 === 0 ? '#1976d2' : '#ff9800';
        return (
          <path
            key={i}
            d={`M16,16 L${x1},${y1} A16,16 0 ${large} 1 ${x2},${y2} Z`}
            fill={color}
            stroke="#fff"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
};

export default Dashboard;
