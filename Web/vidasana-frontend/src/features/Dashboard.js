// Pantalla de Dashboard inicial
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 32 }}>
      <h1>Bienvenido a VidaSana</h1>
      <div style={{ display: 'flex', gap: 32, marginTop: 40, justifyContent: 'center' }}>
        <div
          style={{
            width: 180,
            height: 180,
            background: '#f0f4fa',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(25,118,210,0.08)',
            transition: 'box-shadow 0.2s',
            fontSize: 48,
          }}
          onClick={() => navigate('/habitos')}
          title="Registrar hábitos o síntomas"
        >
          <FaPlus size={56} color="#1976d2" />
          <div style={{ marginTop: 16, fontSize: 18, color: '#1976d2', fontWeight: 500 }}>Registrar Hábitos</div>
        </div>
        <div
          style={{
            width: 180,
            height: 180,
            background: '#f0f4fa',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(25,118,210,0.08)',
            transition: 'box-shadow 0.2s',
            fontSize: 48,
          }}
          onClick={() => navigate('/turnos')}
          title="Ver mis turnos"
        >
          <FaCalendarAlt size={56} color="#1976d2" />
          <div style={{ marginTop: 16, fontSize: 18, color: '#1976d2', fontWeight: 500 }}>Mis Turnos</div>
        </div>
        <div
          style={{
            width: 180,
            height: 180,
            background: '#f0f4fa',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(25,118,210,0.08)',
            transition: 'box-shadow 0.2s',
            fontSize: 48,
          }}
          onClick={() => navigate('/medicos')}
          title="Ver mis médicos tratantes"
        >
          <FaUserMd size={56} color="#1976d2" />
          <div style={{ marginTop: 16, fontSize: 18, color: '#1976d2', fontWeight: 500 }}>Mis Médicos</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
