import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserContext'

export default function Authentication() {
	const { user } = useContext(UserAuthContext)

	if (!user) {
		return <Navigate to="/auth/sign-in" />
	}
	return (
			<Outlet />
	)
}