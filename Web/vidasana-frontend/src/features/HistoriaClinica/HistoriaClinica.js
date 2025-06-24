import React, { useState, useEffect } from 'react';
import { getHistoriaClinica, updateHistoriaClinica } from '../../api';
import './HistoriaClinica.css';

const emptyForm = {
  alergias: [],
  enfermedadesCronicas: [],
  antecedentesFamiliares: [],
  imc: '',
  grupoSanguineo: '',
};

const GRUPOS_SANGUINEOS = [
  '', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const HistoriaClinica = () => {
  const [historia, setHistoria] = useState(emptyForm);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHistoriaClinica()
      .then(res => {
        const data = {
          ...emptyForm,
          ...res.data,
          alergias: res.data?.alergias || [],
          enfermedadesCronicas: res.data?.enfermedadesCronicas || [],
          antecedentesFamiliares: res.data?.antecedentesFamiliares || [],
          imc: res.data?.imc || '',
          grupoSanguineo: res.data?.grupoSanguineo || '',
        };
        setHistoria(data);
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar historia clínica');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setForm({ ...form, [name]: value.split(',').map(s => s.trim()).filter(Boolean) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updateHistoriaClinica({
        ...form,
        alergias: typeof form.alergias === 'string' ? form.alergias.split(',').map(s => s.trim()).filter(Boolean) : form.alergias,
        enfermedadesCronicas: typeof form.enfermedadesCronicas === 'string' ? form.enfermedadesCronicas.split(',').map(s => s.trim()).filter(Boolean) : form.enfermedadesCronicas,
        antecedentesFamiliares: typeof form.antecedentesFamiliares === 'string' ? form.antecedentesFamiliares.split(',').map(s => s.trim()).filter(Boolean) : form.antecedentesFamiliares,
      });
      setHistoria(form);
      setSuccess('¡Historia clínica actualizada!');
      setEditMode(false);
    } catch {
      setError('Error al guardar historia clínica');
    }
  };

  return (
    <div className="card">
      <h2>Mi Historia Clínica</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : (
        <>
          {editMode ? (
            <form className="historia-form" onSubmit={handleSubmit}>
              <label>Alergias (separadas por coma)</label>
              <input
                name="alergias"
                type="text"
                value={Array.isArray(form.alergias) ? form.alergias.join(', ') : form.alergias}
                onChange={e => handleArrayChange('alergias', e.target.value)}
                placeholder="Ej: polen, penicilina"
              />
              <label>Enfermedades Crónicas (separadas por coma)</label>
              <input
                name="enfermedadesCronicas"
                type="text"
                value={Array.isArray(form.enfermedadesCronicas) ? form.enfermedadesCronicas.join(', ') : form.enfermedadesCronicas}
                onChange={e => handleArrayChange('enfermedadesCronicas', e.target.value)}
                placeholder="Ej: diabetes, hipertensión"
              />
              <label>Antecedentes Familiares (separados por coma)</label>
              <input
                name="antecedentesFamiliares"
                type="text"
                value={Array.isArray(form.antecedentesFamiliares) ? form.antecedentesFamiliares.join(', ') : form.antecedentesFamiliares}
                onChange={e => handleArrayChange('antecedentesFamiliares', e.target.value)}
                placeholder="Ej: cáncer, asma"
              />
              <label>IMC</label>
              <input
                name="imc"
                type="number"
                min="0"
                step="0.01"
                value={form.imc}
                onChange={handleChange}
                placeholder="Ej: 22.5"
              />
              <label>Grupo Sanguíneo</label>
              <select name="grupoSanguineo" value={form.grupoSanguineo} onChange={handleChange} required>
                {GRUPOS_SANGUINEOS.map(g => (
                  <option key={g} value={g}>{g || 'Selecciona'}</option>
                ))}
              </select>
              <button className="btn" type="submit">Guardar</button>
              <button className="btn" type="button" onClick={() => { setEditMode(false); setForm(historia); }}>Cancelar</button>
              {error && <div className="error-msg">{error}</div>}
              {success && <div className="success-msg">{success}</div>}
            </form>
          ) : (
            <div className="historia-view">
              <div><b>Alergias:</b> {historia.alergias.join(', ') || 'Ninguna'}</div>
              <div><b>Enfermedades Crónicas:</b> {historia.enfermedadesCronicas.join(', ') || 'Ninguna'}</div>
              <div><b>Antecedentes Familiares:</b> {historia.antecedentesFamiliares.join(', ') || 'Ninguno'}</div>
              <div><b>IMC:</b> {historia.imc || 'No registrado'}</div>
              <div><b>Grupo Sanguíneo:</b> {historia.grupoSanguineo || 'No registrado'}</div>
              <button className="btn" onClick={() => setEditMode(true)} style={{marginTop: 16}}>Editar / Agregar</button>
              {success && <div className="success-msg">{success}</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoriaClinica;
