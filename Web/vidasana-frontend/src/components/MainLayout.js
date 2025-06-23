import React from 'react';
import NavBar from './NavBar';
import './MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <NavBar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

export default MainLayout;
