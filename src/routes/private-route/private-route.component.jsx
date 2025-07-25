import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import Spinner from '../../components/spinner/spinner.component';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
