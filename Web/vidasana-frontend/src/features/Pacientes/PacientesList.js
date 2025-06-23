import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import './PacientesList.css';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/pacientes')
      .then(res => setPacientes(res.data))
      .catch(() => setError('Error al cargar pacientes'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando pacientes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card">
      <h2>Pacientes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.dni}</td>
              <td>
                <button className="btn" onClick={() => setSelected(p)}>Ver Historia Clínica</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div className="historia-modal">
          <div className="historia-content">
            <h3>Historia Clínica de {selected.nombre}</h3>
            <ul>
              <li><b>Edad:</b> {selected.historiaClinica?.edad}</li>
              <li><b>Género:</b> {selected.historiaClinica?.genero}</li>
              <li><b>Antecedentes:</b> {selected.historiaClinica?.antecedentes}</li>
              <li><b>Alergias:</b> {selected.historiaClinica?.alergias}</li>
              <li><b>Notas:</b> {selected.historiaClinica?.notas}</li>
            </ul>
            <button className="btn" onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientesList;
