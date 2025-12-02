import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ComponentDetail from '../pages/ComponentDetail';

/**
 * PUBLIC_INTERFACE
 * RoutesIndex is the central router configuration.
 * It maps application paths to pages wrapped by MainLayout.
 */
function RoutesIndex() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/component/:id" element={<ComponentDetail />} />
      </Route>

      {/* Fallback to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RoutesIndex;
