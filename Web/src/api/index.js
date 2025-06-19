// Utilidad para hacer peticiones al backend Java
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Cambia el puerto si tu backend usa otro

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ejemplo de login
export const login = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Agrega más funciones para otros endpoints
