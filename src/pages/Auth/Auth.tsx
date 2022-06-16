import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { RoutesCompletePath } from '../../types/router';

const Auth: React.FC = () => {
  const { user } = useSession();

  if (user) return <Navigate to={RoutesCompletePath.PARTIES} />;
  return <Outlet />;
};

export default Auth;
