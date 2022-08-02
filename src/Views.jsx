import React from 'react';
import LoginPage from './Pages/LoginPage';
import Initialisation from './Pages/Initialisation';
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

const Views = () => {
  return (
    <Routes>
      <Route index element={<Initialisation />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default Views;
