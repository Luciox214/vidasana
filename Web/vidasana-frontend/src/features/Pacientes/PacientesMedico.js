import React, { useEffect, useState } from 'react';
import { getPacientesMedico, getHistoriaClinicaPaciente, getRiesgoPacienteById } from '../../api';
import './PacientesMedico.css';

const PacientesMedico = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [detalleLoading, setDetalleLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPacientesMedico()
      .then(res => setPacientes(res.data))
      .catch(() => setError('Error al cargar pacientes'))
      .finally(() => setLoading(false));
  }, []);

  const verDetalle = async (paciente) => {
    setDetalleLoading(true);
    try {
      const [historia, riesgo] = await Promise.all([
        getHistoriaClinicaPaciente(paciente.id),
        getRiesgoPacienteById(paciente.id)
      ]);
      setDetalle({ paciente, historia: historia.data, riesgo: riesgo.data });
    } catch {
      setDetalle({ paciente, historia: null, riesgo: null, error: 'Error al obtener detalles' });
    } finally {
      setDetalleLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Mis Pacientes</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando pacientes...</div>
      ) : pacientes.length === 0 ? (
        <div>No tienes pacientes asignados.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={p.id || i}>
                <td>{p.nombre}</td>
                <td>{p.id}</td>
                <td>
                  <button className="btn" onClick={() => verDetalle(p)}>Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {detalle && (
        <div className="paciente-detalle-modal">
          <div className="paciente-detalle-content">
            <h3>Detalle de {detalle.paciente.nombre}</h3>
            {detalleLoading ? <div>Cargando detalle...</div> : (
              <>
                <div><b>Historia Clínica:</b> {detalle.historia ? JSON.stringify(detalle.historia) : 'No disponible'}</div>
                <div><b>Riesgo:</b> {detalle.riesgo ? JSON.stringify(detalle.riesgo) : 'No disponible'}</div>
                {detalle.error && <div className="error-msg">{detalle.error}</div>}
              </>
            )}
            <button className="btn" onClick={() => setDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientesMedico;
