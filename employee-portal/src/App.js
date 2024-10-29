import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Payments from './components/Payments';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/payments" element={
        <ProtectedRoute>
          <Payments />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
