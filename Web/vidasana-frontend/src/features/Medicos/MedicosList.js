import React, { useEffect, useState } from 'react';
import { getMedicos } from '../../api';
import { FaUserMd } from 'react-icons/fa';
import './MedicosList.css';

const MedicosList = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getMedicos()
      .then(res => setMedicos(res.data))
      .catch(() => setError('Error al cargar médicos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card medicos-card">
      <h2><FaUserMd style={{ marginRight: 8 }} />Todos los Médicos</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando médicos...</div>
      ) : medicos.length === 0 ? (
        <div>No hay médicos registrados.</div>
      ) : (
        <table className="table medicos-table">
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

export default MedicosList;
