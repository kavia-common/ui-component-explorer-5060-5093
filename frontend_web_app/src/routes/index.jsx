import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ComponentsPage from '../pages/Components';
import ComponentDetail from '../pages/ComponentDetail';
import Installation from '../pages/Installation';

// PUBLIC_INTERFACE
/**
 * RoutesIndex
 * Central routing table.
 * - /category/:slug -> ComponentsPage (list only)
 * - /component/:id -> ComponentDetail (single item only)
 * - /installation -> Installation guidance page
 */
function RoutesIndex() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<ComponentsPage />} />
        {/* Keep detail and list strictly separate as sibling routes */}
        <Route path="/component/:id" element={<ComponentDetail />} />
        <Route path="/installation" element={<Installation />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RoutesIndex;
