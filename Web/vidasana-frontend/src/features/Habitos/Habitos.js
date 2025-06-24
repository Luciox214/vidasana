import React, { useState, useEffect } from 'react';
import { getHabitos, postHabito } from '../../api';
import './Habitos.css';

const OPCIONES_ALIMENTACION = [
  '3 comidas',
  '2 comidas',
  'salteado',
  'vegetariano'
];
const OPCIONES_SINTOMAS = [
  [],
  ['fiebre'],
  ['dolor de cabeza'],
  ['tos', 'dolor garganta'],
  ['fiebre', 'náuseas']
];

const Habitos = () => {
  const [form, setForm] = useState({ sueno: '', alimentacion: '', sintomas: [] });
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setSuccess('');
    getHabitos()
      .then(res => {
        setRegistros(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar hábitos');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value, type, options } = e.target;
    if (name === 'sintomas') {
      // Para <select multiple>
      const selected = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setForm({ ...form, sintomas: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await postHabito({ ...form, sintomas: form.sintomas });
      setRegistros([res.data, ...registros]);
      setForm({ sueno: '', alimentacion: '', sintomas: [] });
      setSuccess('¡Hábito registrado!');
    } catch {
      setError('Error al registrar hábito');
    }
  };

  return (
    <div className="card habitos-card">
      <h2>Registro Diario de Hábitos y Síntomas</h2>
      <form className="habitos-form" onSubmit={handleSubmit}>
        <div className="habitos-field">
          <label htmlFor="sueno">Horas de sueño <span className="hint">(0 a 24)</span></label>
          <input name="sueno" id="sueno" type="number" min="0" max="24" placeholder="Ej: 7" value={form.sueno} onChange={handleChange} required />
        </div>
        <div className="habitos-field">
          <label htmlFor="alimentacion">Alimentación</label>
          <select name="alimentacion" id="alimentacion" value={form.alimentacion} onChange={handleChange} required className="habitos-select">
            <option value="">Selecciona una opción</option>
            {OPCIONES_ALIMENTACION.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="habitos-field">
          <label htmlFor="sintomas">Síntomas</label>
          <select
            name="sintomas"
            id="sintomas"
            multiple
            value={form.sintomas}
            onChange={handleChange}
            className="habitos-select habitos-select-multiple"
          >
            <option value="">Ninguno</option>
            {Array.from(new Set(OPCIONES_SINTOMAS.flat())).filter(Boolean).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <small className="hint">Ctrl+Click para seleccionar varios</small>
        </div>
        <button className="btn habitos-btn" type="submit">Registrar</button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
      {loading ? (
        <div>Cargando hábitos...</div>
      ) : (
        <table className="table habitos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Sueño (h)</th>
              <th>Alimentación</th>
              <th>Síntomas</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, i) => (
              <tr key={r.id || i}>
                <td>{r.fecha}</td>
                <td>{r.sueno}</td>
                <td>{r.alimentacion}</td>
                <td>{Array.isArray(r.sintomas) ? r.sintomas.join(', ') : r.sintomas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Habitos;
