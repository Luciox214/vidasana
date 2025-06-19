import React, { useState, useEffect } from 'react';
import { getHistoriaClinica } from '../../api';
import './HistoriaClinica.css';

const emptyForm = {
  alergias: [],
  enfermedadesCronicas: [],
  antecedentesFamiliares: [],
  imc: '',
  grupoSanguineo: '',
};

const HistoriaClinica = () => {
  const [historia, setHistoria] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getHistoriaClinica()
      .then(res => {
        setHistoria({
          ...emptyForm,
          ...res.data,
          alergias: res.data?.alergias || [],
          enfermedadesCronicas: res.data?.enfermedadesCronicas || [],
          antecedentesFamiliares: res.data?.antecedentesFamiliares || [],
          imc: res.data?.imc || '',
          grupoSanguineo: res.data?.grupoSanguineo || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar historia clínica');
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <h2>Mi Historia Clínica</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : (
        <div className="historia-view">
          <div><b>Alergias:</b> {historia.alergias.join(', ') || 'Ninguna'}</div>
          <div><b>Enfermedades Crónicas:</b> {historia.enfermedadesCronicas.join(', ') || 'Ninguna'}</div>
          <div><b>Antecedentes Familiares:</b> {historia.antecedentesFamiliares.join(', ') || 'Ninguno'}</div>
          <div><b>IMC:</b> {historia.imc || 'No registrado'}</div>
          <div><b>Grupo Sanguíneo:</b> {historia.grupoSanguineo || 'No registrado'}</div>
        </div>
      )}
    </div>
  );
};

export default HistoriaClinica;
