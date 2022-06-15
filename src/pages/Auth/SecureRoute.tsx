import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { RoutesCompletePath } from '../../types/router';

const SecureRoute: React.FC = () => {
  const { user } = useSession();

  if (!user) return <Navigate to={RoutesCompletePath.SIGN_IN} />;
  if (!user.emailVerified) return <Navigate to={RoutesCompletePath.VERIFY} />;
  return <Outlet />;
};

export default SecureRoute;
