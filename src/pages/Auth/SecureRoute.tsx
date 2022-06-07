import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { RoutesCompletePath } from '../../types/router'

const SecureRoute:React.FC = () =>{
	const { user } = useContext(UserAuthContext)

	if (!user) return <Navigate to={RoutesCompletePath.SIGN_IN} />
	if(!user.emailVerified) return <Navigate to={RoutesCompletePath.VERIFY} />
	return <Outlet />
}

export default SecureRoute