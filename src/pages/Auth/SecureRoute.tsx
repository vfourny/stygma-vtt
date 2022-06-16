import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { RoutesCompletePath } from '../../types/router';

const SecureRoute: React.FC = () => {
  const { user } = useSession();

  if (!user) return <Navigate to={RoutesCompletePath.SIGN_IN} />;
  return <Outlet />;
};

export default SecureRoute;
