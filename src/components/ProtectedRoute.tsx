import { ReactComponentElement, ReactNode, useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UserContext from '../context/User/UserContext';

type Props = {};
export default function ProtectedRoute({}: Props) {
	const { user, loading } = useContext(UserContext);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900'></div>
			</div>
		);
	}

	const isAuthenticated = user !== null;
	//

	return isAuthenticated ? <Outlet /> : <Navigate to='/signIn' />;
}
