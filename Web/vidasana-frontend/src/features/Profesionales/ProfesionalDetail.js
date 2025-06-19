import React, { useEffect, useState } from 'react';
import { getMedicos } from '../../api';
import { useParams, Link } from 'react-router-dom';
import './ProfesionalesList.css';

const ProfesionalDetail = () => {
  const { id } = useParams();
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMedicos()
      .then(res => {
        const found = res.data.find(m => m.id === id);
        setMedico(found);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el profesional');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando profesional...</div>;
  if (error) return <div>{error}</div>;
  if (!medico) return <div>No se encontró el profesional.</div>;

  return (
    <div className="card">
      <h2>Perfil de {medico.nombre}</h2>
      <ul>
        <li><b>Email:</b> {medico.email}</li>
        <li><b>Especialidad:</b> {medico.especialidad}</li>
        <li><b>Matrícula:</b> {medico.matricula}</li>
        {/* Agrega más campos si existen */}
      </ul>
      <Link className="btn" to="/turnos">Volver a turnos</Link>
    </div>
  );
};

export default ProfesionalDetail;
