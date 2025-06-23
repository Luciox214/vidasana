import React, { useState, useEffect } from 'react';
import { getHabitos, postHabito } from '../../api';
import './Habitos.css';

const Habitos = () => {
  const [form, setForm] = useState({ sueno: '', alimentacion: '', sintomas: '' });
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
        console.log('GET hábitos OK', res.data);
      })
      .catch(err => {
        setError('Error al cargar hábitos');
        setLoading(false);
        console.error('Error GET hábitos', err);
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await postHabito(form);
      setRegistros([res.data, ...registros]);
      setForm({ sueno: '', alimentacion: '', sintomas: '' });
      setSuccess('¡Hábito registrado!');
      console.log('POST hábito OK', res.data);
    } catch (err) {
      setError('Error al registrar hábito');
      console.error('Error POST hábito', err);
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
          <label htmlFor="alimentacion">Alimentación <span className="hint">(¿Qué comiste hoy?)</span></label>
          <input name="alimentacion" id="alimentacion" placeholder="Ej: Ensalada, pollo, arroz..." value={form.alimentacion} onChange={handleChange} required />
        </div>
        <div className="habitos-field">
          <label htmlFor="sintomas">Síntomas <span className="hint">(separados por coma, si tuviste)</span></label>
          <input name="sintomas" id="sintomas" placeholder="Ej: dolor de cabeza, tos" value={form.sintomas} onChange={handleChange} />
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
