import React, { useState } from 'react';
import { registerPaciente, registerMedico } from '../api';
import './LoginRegister.css';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    tipo: 'paciente',
    especialidad: '', // solo para médicos
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      if (form.tipo === 'paciente') {
        await registerPaciente({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password
        });
      } else {
        await registerMedico({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
          especialidad: form.especialidad
        });
      }
      setSuccess(true);
      setForm({ nombre: '', apellido: '', email: '', password: '', tipo: form.tipo, especialidad: '' });
    } catch (err) {
      setError('Error al registrar. Email ya registrado o datos inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Registro</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        {form.tipo === 'medico' && (
          <input name="especialidad" placeholder="Especialidad" value={form.especialidad} onChange={handleChange} required />
        )}
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">¡Registro exitoso! Ahora puedes iniciar sesión.</div>}
      </form>
      <div className="auth-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></div>
    </div>
  );
};

export default Register;
