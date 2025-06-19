import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import './ProfesionalesList.css';

const ProfesionalesList = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/medicos')
      .then(res => setProfesionales(res.data))
      .catch(() => setError('Error al cargar profesionales'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando profesionales...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card">
      <h2>Profesionales</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesionales.map(m => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.matricula}</td>
              <td>{m.especialidad}</td>
              <td>
                <button className="btn" onClick={() => setSelected(m)}>Ver Perfil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div className="historia-modal">
          <div className="historia-content">
            <h3>Perfil de {selected.nombre}</h3>
            <ul>
              <li><b>Email:</b> {selected.perfil?.email}</li>
              <li><b>Teléfono:</b> {selected.perfil?.telefono}</li>
              <li><b>Sede:</b> {selected.perfil?.sede}</li>
              <li><b>Pacientes asignados:</b> {selected.perfil?.pacientes?.join(', ')}</li>
            </ul>
            <button className="btn" onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfesionalesList;
