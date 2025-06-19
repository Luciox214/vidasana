import React, { useEffect, useState } from 'react';
import { getMedicosPaciente } from '../../api';
import { FaUserMd } from 'react-icons/fa';
import '../Red/Red.css';

const MisMedicosTab = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getMedicosPaciente()
      .then(res => setMedicos(res.data))
      .catch(() => setError('Error al cargar médicos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2><FaUserMd style={{ marginRight: 8 }} />Mis Médicos Tratantes</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando médicos...</div>
      ) : medicos.length === 0 ? (
        <div>No tienes médicos asignados actualmente.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m, i) => (
              <tr key={m.id || i}>
                <td>{m.nombre}</td>
                <td>{m.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisMedicosTab;
