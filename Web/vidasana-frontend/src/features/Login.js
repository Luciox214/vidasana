// Pantalla de Login básica
import React, { useState } from 'react';
import { login } from '../api';
import './LoginRegister.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      localStorage.setItem('token', res.data);
      if (onLogin) onLogin();
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Iniciar Sesión</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div className="auth-link">¿No tienes cuenta? <a href="/register">Registrate</a></div>
    </div>
  );
};

export default Login;
