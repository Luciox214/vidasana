import React, { useEffect, useState } from 'react';
import { getDashboardMedico } from '../../api';
import './Dashboard.css';

const DashboardMedico = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getDashboardMedico()
      .then(res => setData(res.data))
      .catch(() => setError('Error al cargar el dashboard profesional'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Cargando dashboard profesional...</div>;
  if (error) return <div className="card error-msg">{error}</div>;
  if (!data) return <div className="card">No hay datos para mostrar.</div>;

  // Filtrar y mostrar solo los datos relevantes
  const {
    totalPacientes,
    pacientesRiesgoAlto,
    riesgoPromedio,
    promedioIMC,
    sintomasFrecuentes
  } = data;

  return (
    <div className="card">
      <h2>Dashboard Profesional</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Pacientes</h3>
          <div className="dashboard-number">{totalPacientes ?? '—'}</div>
        </div>
        <div className="dashboard-card">
          <h3>Pacientes Riesgo Alto</h3>
          <div className="dashboard-number">{pacientesRiesgoAlto ?? '—'}</div>
        </div>
        <div className="dashboard-card">
          <h3>Riesgo Promedio</h3>
          <div className="dashboard-number">{riesgoPromedio ?? '—'}</div>
        </div>
        <div className="dashboard-card">
          <h3>Promedio IMC</h3>
          <div className="dashboard-number">{promedioIMC ?? '—'}</div>
        </div>
      </div>
      <div className="dashboard-analytics" style={{marginTop: 32}}>
        <div className="dashboard-analytics-card">
          <h4>Síntomas Frecuentes</h4>
          {sintomasFrecuentes && sintomasFrecuentes.length > 0 ? (
            <ul style={{textAlign: 'left'}}>
              {sintomasFrecuentes.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          ) : (
            <div>No hay síntomas frecuentes reportados.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMedico;
