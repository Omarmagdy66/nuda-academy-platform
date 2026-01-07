
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  exp: number;
}

const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token'); // Clean up expired token
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token'); // Clean up invalid token
    return null;
  }
};

const ProtectedRoute = () => {
  const decodedToken = getDecodedToken();

  const isAuthenticated = !!decodedToken;
  const isAdmin = decodedToken?.role === 'Admin';

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // If authenticated but not an admin, redirect to a generic 'unauthorized' page
    // or the home page. For now, we'll redirect to the home page.
    // You might want to create a specific 'Unauthorized' component later.
    return <Navigate to="/" replace />;
  }

  // If authenticated and is an admin, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
