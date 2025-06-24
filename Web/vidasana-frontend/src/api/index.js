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
  // Si sintomas ya es array, envíalo tal cual; si es string, conviértelo
  let sintomas = data.sintomas;
  if (typeof sintomas === 'string') {
    sintomas = sintomas.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Array.isArray(sintomas) && sintomas.length === 1 && sintomas[0] === '') {
    sintomas = [];
  }
  return api.post('/pacientes/habitos', {
    ...data,
    sintomas
  });
};

// TURNOS: obtener turnos del paciente autenticado
export const getTurnosPaciente = async () => {
  return api.get('/turnos');
};

export const postTurno = async (data) => {
  return api.post('/turnos', data);
};

// TURNOS MÉDICO: obtener turnos asignados al médico autenticado
export const getTurnosMedico = async () => {
  return api.get('/turnos/medico');
};

// MEDICOS: obtener médicos que atienden al paciente autenticado
export const getMedicosPaciente = async () => {
  return api.get('/red/paciente/medicos');
};

// Obtener todos los médicos (para pantallas que lo requieran)
export const getMedicos = async () => {
  return api.get('/medicos');
};

// Obtener y actualizar historia clínica del paciente autenticado
export const getHistoriaClinica = async () => {
  return api.get('/pacientes/historia');
};

export const updateHistoriaClinica = async (data) => {
  return api.put('/pacientes/historia', data);
};

// Obtener el score de riesgo del paciente autenticado
export const getRiesgoPaciente = async () => {
  return api.get('/pacientes/riesgo');
};

// DASHBOARD MÉDICO: obtener datos del dashboard profesional
export const getDashboardMedico = async () => {
  return api.get('/dashboard/medico');
};

// PACIENTES MÉDICO: obtener pacientes asignados al médico autenticado
export const getPacientesMedico = async () => {
  return api.get('/red/medico/pacientes');
};

// Obtener historia clínica de un paciente por ID (para médicos)
export const getHistoriaClinicaPaciente = async (pacienteId) => {
  return api.get(`/pacientes/${pacienteId}/historia`);
};

// Obtener riesgo de un paciente por ID (para médicos)
export const getRiesgoPacienteById = async (pacienteId) => {
  return api.get(`/pacientes/${pacienteId}/riesgo`);
};

// RED MÉDICA: obtener médicos relacionados al médico autenticado
export const getMedicosRelacionados = async () => {
  return api.get('/red/medico/medicos');
};

// Confirmar o rechazar turnos desde el frontend médico
export const confirmarTurno = async (turnoId, confirmar) => {
  return api.put(`/turnos/${turnoId}/confirmar?confirmar=${confirmar}`);
};

// Nuevas funciones para consultar hábitos, historia y riesgo de un paciente por id usando query param
export const getHabitosPacienteById = async (pacienteId) => {
  return api.get(`/pacientes/habitos?id=${pacienteId}`);
};
export const getHistoriaClinicaById = async (pacienteId) => {
  return api.get(`/pacientes/historia?id=${pacienteId}`);
};
export const getRiesgoPacienteByIdQuery = async (pacienteId) => {
  return api.get(`/pacientes/riesgo?id=${pacienteId}`);
};

// Agrega más funciones para otros endpoints
