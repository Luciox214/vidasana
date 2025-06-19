// Obtener todos los pacientes
export const getPacientes = async () => {
  return api.get('/pacientes');
};

// Obtener todos los médicos
export const getMedicos = async () => {
  return api.get('/medicos');
};
