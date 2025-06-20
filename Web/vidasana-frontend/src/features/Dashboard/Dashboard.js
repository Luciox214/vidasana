import React, { useEffect, useState } from 'react';
import { getHabitos, getTurnosPaciente, getHistoriaClinica } from '../../api';
import './Dashboard.css';
import DashboardMedico from './DashboardMedico';

const Dashboard = () => {
  const [habitos, setHabitos] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [historia, setHistoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getHabitos(),
      getTurnosPaciente(),
      getHistoriaClinica()
    ]).then(([habitosRes, turnosRes, historiaRes]) => {
      setHabitos(habitosRes.data || []);
      setTurnos(turnosRes.data || []);
      setHistoria(historiaRes.data || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Analítica simple
  const suenoOptimo = habitos.filter(h => Number(h.sueno) >= 7).length;
  const suenoInsuficiente = habitos.length - suenoOptimo;
  const sintomas = habitos.reduce((acc, h) => acc + (h.sintomas && h.sintomas.length > 0 ? 1 : 0), 0);
  const sinSintomas = habitos.length - sintomas;

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
  const role = getUserRole();
  if (role === 'MEDICO') {
    return <DashboardMedico />;
  }

  return (
    <div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Hábitos registrados</h3>
          <div className="dashboard-number">{habitos.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Turnos solicitados</h3>
          <div className="dashboard-number">{turnos.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>IMC</h3>
          <div className="dashboard-number">{historia?.imc ? historia.imc.toFixed(1) : '—'}</div>
        </div>
        <div className="dashboard-card dashboard-alert">
          <h3>Grupo Sanguíneo</h3>
          <div className="dashboard-number">{historia?.grupoSanguineo || '—'}</div>
        </div>
      </div>
      <div className="dashboard-analytics">
        <div className="dashboard-analytics-card">
          <h4>Distribución de Sueño</h4>
          <PieChart data={[
            { label: 'Sueño óptimo (≥7h)', value: suenoOptimo },
            { label: 'Sueño insuficiente', value: suenoInsuficiente }
          ]} />
        </div>
        <div className="dashboard-analytics-card">
          <h4>Síntomas reportados</h4>
          <PieChart data={[
            { label: 'Sin síntomas', value: sinSintomas },
            { label: 'Con síntomas', value: sintomas }
          ]} />
        </div>
      </div>
      {loading && <div style={{marginTop: 24}}>Cargando datos...</div>}
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
