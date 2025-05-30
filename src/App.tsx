import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Callback from './pages/Callback';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="callback" element={<Callback />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}