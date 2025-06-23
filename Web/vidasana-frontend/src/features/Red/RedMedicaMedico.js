import React, { useEffect, useState } from 'react';
import { getMedicosRelacionados } from '../../api';
import './Red.css';

const RedMedicaMedico = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getMedicosRelacionados()
      .then(res => setMedicos(res.data))
      .catch(() => setError('Error al cargar la red médica'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Red Médica</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando red médica...</div>
      ) : medicos.length === 0 ? (
        <div>No tienes médicos relacionados.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m, i) => (
              <tr key={m.id || i}>
                <td>{m.nombre}</td>
                <td>{m.especialidad}</td>
                <td>{m.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RedMedicaMedico;
