import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { RoutesCompletePath } from '../../types/router';

const Auth: React.FC = () => {
  const { user } = useSession();
  const location = useLocation();
  console.log(location);

  if (user && user.emailVerified) return <Navigate to={RoutesCompletePath.PARTIES} />;
  if (user && !user.emailVerified) return <Navigate to={RoutesCompletePath.VERIFY} />;
  return <Outlet />;
};

export default Auth;
