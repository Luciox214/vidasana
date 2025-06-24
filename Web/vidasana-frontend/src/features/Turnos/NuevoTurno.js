import React, { useEffect, useState } from 'react';
import { getMedicosPaciente, getMedicos, postTurno } from '../../api';
import { FaUserMd } from 'react-icons/fa';
import './NuevoTurno.css';

const NuevoTurno = ({ onTurnoCreado }) => {
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({ medicoId: '', fecha: '', hora: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setLoading(true);
    getMedicos()
      .then(res => setMedicos(res.data))
      .catch(() => setError('Error al cargar médicos'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await postTurno({ ...form, fecha: `${form.fecha}T${form.hora}` });
      setSuccess('¡Turno solicitado!');
      setForm({ medicoId: '', fecha: '', hora: '' });
      if (onTurnoCreado) onTurnoCreado();
    } catch (err) {
      setError('Error al solicitar turno');
    }
  };

  return (
    <div className="nuevo-turno-card">
      <h3><FaUserMd style={{ marginRight: 8 }} />Solicitar Nuevo Turno</h3>
      <form className="nuevo-turno-form" onSubmit={handleSubmit}>
        <div className="nuevo-turno-field">
          <label htmlFor="medicoId">Médico</label>
          <select name="medicoId" id="medicoId" value={form.medicoId} onChange={handleChange} required>
            <option value="">Selecciona un médico</option>
            {medicos.map(m => (
              <option key={m.id} value={m.id}>{m.nombre} ({m.especialidad})</option>
            ))}
          </select>
        </div>
        <div className="nuevo-turno-field">
          <label htmlFor="fecha">Fecha</label>
          <input name="fecha" id="fecha" type="date" value={form.fecha} onChange={handleChange} required />
        </div>
        <div className="nuevo-turno-field">
          <label htmlFor="hora">Hora</label>
          <input name="hora" id="hora" type="time" value={form.hora} onChange={handleChange} required />
        </div>
        <button className="btn nuevo-turno-btn" type="submit">Solicitar Turno</button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
    </div>
  );
};

export default NuevoTurno;
