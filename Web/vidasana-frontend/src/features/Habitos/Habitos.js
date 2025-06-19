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
    <div className="card">
      <h2>Registro Diario de Hábitos y Síntomas</h2>
      <form className="habitos-form" onSubmit={handleSubmit}>
        <input name="sueno" type="number" min="0" max="24" placeholder="Horas de sueño" value={form.sueno} onChange={handleChange} required />
        <input name="alimentacion" placeholder="Alimentación" value={form.alimentacion} onChange={handleChange} required />
        <input name="sintomas" placeholder="Síntomas (separados por coma)" value={form.sintomas} onChange={handleChange} />
        <button className="btn" type="submit">Registrar</button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
      {loading ? (
        <div>Cargando hábitos...</div>
      ) : (
        <table className="table">
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
