import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAdminSession } from '../lib/adminSession';

export default function AdminRouteGuard() {
  const session = getAdminSession();

  if (!session.isAuthenticated) {
    return <Navigate to="/admin/auth" replace />;
  }

  return <Outlet />;
}
