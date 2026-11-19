import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(module => ({ default: module.ProjectDetailPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<Suspense fallback={<div className="wrap page-section" role="status">Loading project...</div>}><ProjectDetailPage /></Suspense>} />
      <Route path="/admin/*" element={<Suspense fallback={<div className="legacy-route" role="status">Loading...</div>}><div className="legacy-route"><AdminPage /></div></Suspense>} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
