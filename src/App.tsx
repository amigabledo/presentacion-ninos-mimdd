import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { GestionLogin } from './pages/admin/GestionLogin';
import { GestionPanel } from './pages/admin/GestionPanel';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestion/login" element={<GestionLogin />} />
        <Route path="/gestion" element={<GestionPanel />} />
        <Route path="/admin" element={<Navigate to="/gestion" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
