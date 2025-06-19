import React, { useEffect, useState } from 'react';
import { getTurnosPaciente } from '../../api';
import NuevoTurno from './NuevoTurno';
import './Turnos.css';

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarTurnos = () => {
    setLoading(true);
    getTurnosPaciente()
      .then(res => setTurnos(res.data))
      .catch(() => setError('Error al cargar turnos'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  return (
    <div className="card">
      <NuevoTurno onTurnoCreado={cargarTurnos} />
      <h2>Mis Turnos</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando turnos...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Profesional</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t, i) => {
              const fecha = t.fecha ? t.fecha.split('T')[0] : '';
              const hora = t.fecha ? t.fecha.split('T')[1]?.slice(0,5) : '';
              return (
                <tr key={t.id || i}>
                  <td>{fecha}</td>
                  <td>{hora}</td>
                  <td>{t.medicoId}</td>
                  <td>{t.estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Turnos;
