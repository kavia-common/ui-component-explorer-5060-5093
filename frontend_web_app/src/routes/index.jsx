import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ComponentsPage from '../pages/Components';
import ComponentDetail from '../pages/ComponentDetail';

/**
 * PUBLIC_INTERFACE
 * RoutesIndex is the central router configuration.
 * It maps application paths to pages wrapped by MainLayout.
 * Rules:
 * - Category listings route to /category/:slug and mount ComponentsPage only (no detail logic here).
 * - Single component details route to /component/:id and mount ComponentDetail only (no list logic here).
 */
function RoutesIndex() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<ComponentsPage />} />
        {/* Ensure detail and list are never mounted together; keep them as sibling routes (no nested Outlet stacking) */}
        <Route path="/component/:id" element={<ComponentDetail />} />
      </Route>

      {/* Fallback to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RoutesIndex;
