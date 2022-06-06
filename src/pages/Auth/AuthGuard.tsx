import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserAuthContext'

export default function AuthGuard() {
	const { user } = useContext(UserAuthContext)
console.log(user)
	// if (!user) return <Navigate to="/sign-in" />
	// if(!user.emailVerified) return <Navigate to="/verify" />
	return <Outlet />
}