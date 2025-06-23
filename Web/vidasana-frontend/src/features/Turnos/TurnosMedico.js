import React, { useEffect, useState } from 'react';
import { getTurnosMedico } from '../../api';
import './Turnos.css';

const TurnosMedico = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getTurnosMedico()
      .then(res => setTurnos(res.data))
      .catch(() => setError('Error al cargar los turnos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Mis Turnos Asignados</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando turnos...</div>
      ) : turnos.length === 0 ? (
        <div>No tienes turnos asignados.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t, i) => (
              <tr key={t.id || i}>
                <td>{t.pacienteNombre || t.pacienteId}</td>
                <td>{t.fecha}</td>
                <td>{t.estado}</td>
                <td>
                  {/* Aquí puedes agregar botones para aceptar/rechazar si corresponde */}
                  {t.estado === 'PENDIENTE' && (
                    <>
                      <button className="btn btn-accept">Aceptar</button>
                      <button className="btn btn-reject">Rechazar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TurnosMedico;
