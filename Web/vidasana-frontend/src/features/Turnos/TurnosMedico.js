import React, { useEffect, useState } from 'react';
import { getTurnosMedico, confirmarTurno } from '../../api';
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

  const handleConfirmar = async (turnoId, confirmar) => {
    setError('');
    try {
      await confirmarTurno(turnoId, confirmar);
      setTurnos(turnos => turnos.map(t => t.id === turnoId ? { ...t, estado: confirmar ? 'CONFIRMADO' : 'RECHAZADO' } : t));
    } catch (err) {
      setError('Error al actualizar el turno');
    }
  };

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
                  {t.estado === 'PENDIENTE' && (
                    <>
                      <button className="btn btn-accept" onClick={() => handleConfirmar(t.id, true)}>Aceptar</button>
                      <button className="btn btn-reject" onClick={() => handleConfirmar(t.id, false)}>Rechazar</button>
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
