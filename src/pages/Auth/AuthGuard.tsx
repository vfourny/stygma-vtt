import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserAuthContext'

export default function AuthGuard() {
	const { user,isLoading } = useContext(UserAuthContext)
console.log(user)
if(isLoading){
	return <div>Loading</div>	
}
	if (!user) return <Navigate to="/sign-in" />
	if(!user.emailVerified) return <Navigate to="/verify" />
	return <Outlet />
}