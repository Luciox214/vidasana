import React, { useEffect, useState } from 'react';
import { getRiesgoPaciente } from '../../api';
import './Riesgos.css';

function hexToRgb(hex) {
  // Convierte #rrggbb a [r,g,b]
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

function rgbToHex([r, g, b]) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      })
      .join('')
  );
}

function interpolateColor(color1, color2, t) {
  // t: 0 a 1
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const rgb = rgb1.map((c, i) => Math.round(c + (rgb2[i] - c) * t));
  return rgbToHex(rgb);
}

function getGradientColor(percent) {
  // percent: 0 (verde) -> 0.5 (naranja) -> 1 (rojo)
  if (percent === null || percent === undefined) return '#1976d2';
  const green = '#2e7d32';
  const orange = '#ff9800';
  const red = '#e53935';
  if (percent <= 0.01) return green;
  if (percent < 0.5) {
    // Verde a naranja
    return interpolateColor(green, orange, percent / 0.5);
  }
  // Naranja a rojo
  return interpolateColor(orange, red, (percent - 0.5) / 0.5);
}

const getColorByNivel = (nivel) => {
  switch (nivel) {
    case 'ALTO': return '#e53935';
    case 'MEDIO': return '#ffb300';
    case 'BAJO': return '#43a047';
    default: return '#1976d2';
  }
};

const Riesgos = () => {
  const [riesgo, setRiesgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getRiesgoPaciente()
      .then(res => {
        setRiesgo(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener el riesgo');
        setLoading(false);
      });
  }, []);

  // Normaliza a 0-1 para gradiente
  const norm = v => v === null || v === undefined ? 0 : Math.max(0, Math.min(1, v / 100));

  return (
    <div className="card">
      <h2>Mi Evaluación de Riesgo</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : riesgo ? (
        <div className="riesgo-view">
          <div className="riesgo-score" style={{color: getGradientColor(norm(riesgo.riesgoCardiovascular))}}>
            <b>Riesgo Cardiovascular:</b> {riesgo.riesgoCardiovascular ?? '—'}%
          </div>
          <div className="riesgo-score" style={{color: getGradientColor(norm(riesgo.riesgoDiabetes))}}>
            <b>Riesgo Diabetes:</b> {riesgo.riesgoDiabetes ?? '—'}%
          </div>
          <div className="riesgo-score" style={{color: getGradientColor(norm(riesgo.riesgoObesidad))}}>
            <b>Riesgo Obesidad:</b> {riesgo.riesgoObesidad ?? '—'}%
          </div>
          <div className="riesgo-nivel" style={{background: getColorByNivel(riesgo.nivelRiesgo), color: '#fff', padding: '8px 16px', borderRadius: 8, display: 'inline-block', margin: '12px 0'}}>
            Nivel: {riesgo.nivelRiesgo ?? '—'}
          </div>
          <div className="riesgo-recomendaciones"><b>Recomendaciones:</b> {riesgo.recomendaciones ?? '—'}</div>
          <div><b>Fecha de cálculo:</b> {riesgo.fechaCalculo ? new Date(riesgo.fechaCalculo).toLocaleDateString() : '—'}</div>
          {riesgo.detalles && (
            <div className="riesgo-detalles">
              <h4>Detalles</h4>
              <div className="riesgo-detalle-bloque">
                <b>Hábitos:</b>
                <ul>
                  <li><b>Sueño promedio:</b> {riesgo.detalles.habitos?.suenoPromedio ?? '—'} h</li>
                  <li><b>Alimentación:</b> {riesgo.detalles.habitos?.alimentacion ?? '—'}</li>
                  <li><b>Síntomas frecuentes:</b> {(riesgo.detalles.habitos?.sintomasFrecuentes || []).join(', ') || 'Ninguno'}</li>
                </ul>
              </div>
              <div className="riesgo-detalle-bloque">
                <b>Historia Clínica:</b>
                <ul>
                  <li><b>Alergias:</b> {(riesgo.detalles.historiaClinica?.alergias || []).join(', ') || 'Ninguna'}</li>
                  <li><b>Enfermedades crónicas:</b> {(riesgo.detalles.historiaClinica?.enfermedadesCronicas || []).join(', ') || 'Ninguna'}</li>
                  <li><b>Antecedentes familiares:</b> {(riesgo.detalles.historiaClinica?.antecedentesFamiliares || []).join(', ') || 'Ninguno'}</li>
                  <li><b>IMC:</b> {riesgo.detalles.historiaClinica?.imc ?? '—'}</li>
                  <li><b>Grupo sanguíneo:</b> {riesgo.detalles.historiaClinica?.grupoSanguineo ?? '—'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No hay información de riesgo disponible.</div>
      )}
    </div>
  );
};

export default Riesgos;
