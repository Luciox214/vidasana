// Utilidad para hacer peticiones al backend Java
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Cambia el puerto si tu backend usa otro

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request, excepto login y register
api.interceptors.request.use((config) => {
  if (
    !config.url.includes('/auth/login') &&
    !config.url.includes('/auth/register')
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// LOGIN: enviar email y password como query params en la URL
export const login = async (email, password) => {
  return api.post(`/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
};

// REGISTER: enviar como JSON en el body
export const registerPaciente = async (data) => {
  return api.post('/auth/register/paciente', data, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const registerMedico = async (data) => {
  return api.post('/auth/register/medico', data, {
    headers: { 'Content-Type': 'application/json' }
  });
};

// HABITOS: obtener y registrar hábitos reales del paciente autenticado
export const getHabitos = async () => {
  return api.get('/pacientes/habitos');
};

export const postHabito = async (data) => {
  // El backend espera sintomas como array de string
  return api.post('/pacientes/habitos', {
    ...data,
    sintomas: data.sintomas
      ? data.sintomas.split(',').map(s => s.trim()).filter(Boolean)
      : []
  });
};

// TURNOS: obtener turnos del paciente autenticado
export const getTurnosPaciente = async () => {
  return api.get('/turnos');
};

// MEDICOS: obtener médicos que atienden al paciente autenticado
export const getMedicosPaciente = async () => {
  return api.get('/red/paciente/medicos');
};

// Obtener todos los médicos (para pantallas que lo requieran)
export const getMedicos = async () => {
  return api.get('/medicos');
};

// Agrega más funciones para otros endpoints
