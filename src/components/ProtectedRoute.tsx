
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // FIX: Use the correct localStorage key 'token' to match what's set in LoginPage.
  const token = localStorage.getItem('token');

  // If token exists, allow access to the nested routes (e.g., the admin dashboard)
  // Otherwise, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
