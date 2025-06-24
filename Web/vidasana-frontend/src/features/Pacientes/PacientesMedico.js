import React, { useEffect, useState } from 'react';
import { getPacientesMedico, getHistoriaClinicaById, getRiesgoPacienteByIdQuery } from '../../api';
import './PacientesMedico.css';

const PacientesMedico = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [detalleLoading, setDetalleLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPacientesMedico()
      .then(res => setPacientes(res.data))
      .catch(() => setError('Error al cargar pacientes'))
      .finally(() => setLoading(false));
  }, []);

  const verDetalle = async (paciente) => {
    setDetalleLoading(true);
    try {
      const [historia, riesgo] = await Promise.all([
        getHistoriaClinicaById(paciente.id),
        getRiesgoPacienteByIdQuery(paciente.id)
      ]);
      setDetalle({ paciente, historia: historia.data, riesgo: riesgo.data });
    } catch {
      setDetalle({ paciente, historia: null, riesgo: null, error: 'Error al obtener detalles' });
    } finally {
      setDetalleLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Mis Pacientes</h2>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Cargando pacientes...</div>
      ) : pacientes.length === 0 ? (
        <div>No tienes pacientes asignados.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={p.id || i}>
                <td>{p.nombre}</td>
                <td>{p.id}</td>
                <td>
                  <button className="btn" onClick={() => verDetalle(p)}>Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {detalle && (
        <div className="paciente-detalle-modal">
          <div className="paciente-detalle-content">
            <h3>Detalle de {detalle.paciente.nombre}</h3>
            {detalleLoading ? (
              <div>Cargando detalle...</div>
            ) : (
              <>
                <div>
                  <b>Historia Clínica:</b>
                  {detalle.historia ? (
                    <ul>
                      {detalle.historia.antecedentes && <li><b>Antecedentes:</b> {detalle.historia.antecedentes}</li>}
                      {detalle.historia.alergias && detalle.historia.alergias.length > 0 && <li><b>Alergias:</b> {detalle.historia.alergias.join(', ')}</li>}
                      {detalle.historia.enfermedadesCronicas && detalle.historia.enfermedadesCronicas.length > 0 && <li><b>Enfermedades crónicas:</b> {detalle.historia.enfermedadesCronicas.join(', ')}</li>}
                      {detalle.historia.antecedentesFamiliares && detalle.historia.antecedentesFamiliares.length > 0 && <li><b>Antecedentes familiares:</b> {detalle.historia.antecedentesFamiliares.join(', ')}</li>}
                      {detalle.historia.imc && <li><b>IMC:</b> {detalle.historia.imc.toFixed(2)}</li>}
                      {detalle.historia.grupoSanguineo && <li><b>Grupo sanguíneo:</b> {detalle.historia.grupoSanguineo}</li>}
                    </ul>
                  ) : ' No disponible'}
                </div>
                <div>
                  <b>Riesgo:</b>
                  {detalle.riesgo ? (
                    <ul>
                      <li><b>Cardiovascular:</b> {detalle.riesgo.riesgoCardiovascular}%</li>
                      <li><b>Diabetes:</b> {detalle.riesgo.riesgoDiabetes}%</li>
                      <li><b>Obesidad:</b> {detalle.riesgo.riesgoObesidad}%</li>
                      <li><b>Nivel:</b> {detalle.riesgo.nivelRiesgo}</li>
                      {detalle.riesgo.recomendaciones && detalle.riesgo.recomendaciones.length > 0 && (
                        <li><b>Recomendaciones:</b>
                          <ul>
                            {detalle.riesgo.recomendaciones.map((rec, idx) => <li key={idx}>{rec}</li>)}
                          </ul>
                        </li>
                      )}
                    </ul>
                  ) : ' No disponible'}
                </div>
                {detalle.error && <div className="error-msg">{detalle.error}</div>}
              </>
            )}
            <button className="btn" onClick={() => setDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientesMedico;
