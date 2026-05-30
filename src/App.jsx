import { useState } from 'react'
import RedirectPage from './pages/RedirectPage'
import ReviewPage from './pages/ReviewPage'
import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/LoginAdmin';
import QRPage from './pages/QRPage';
import { Routes, Route } from "react-router-dom";
import './App.scss'

function App() {

  return (
    <Routes>
      <Route path="/" element={<RedirectPage />} />
      <Route path="/r/google-review" element={<RedirectPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-login" element={<LoginAdmin />} />
      <Route path="/qr" element={<QRPage />} />
    </Routes>
  );
}

export default App;