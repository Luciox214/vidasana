import React, { useState } from 'react';
import ProfesionalesList from './ProfesionalesList';
import MisMedicosTab from './MisMedicosTab';
import './ProfesionalesList.css';

const Tabs = [
  { label: 'Todos los Profesionales', key: 'profesionales' },
  { label: 'Mis Médicos', key: 'medicos' },
];

const ProfesionalesTabs = () => {
  const [active, setActive] = useState('profesionales');

  return (
    <div className="card">
      <div className="tabs">
        {Tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn${active === tab.key ? ' active' : ''}`}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {active === 'profesionales' && <ProfesionalesList />}
        {active === 'medicos' && <MisMedicosTab />}
      </div>
    </div>
  );
};

export default ProfesionalesTabs;
