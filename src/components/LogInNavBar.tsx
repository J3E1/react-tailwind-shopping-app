import { Link } from 'react-router-dom';

type Props = {};
export default function LogInNavBar({}: Props) {
	return (
		<>
			<Link
				to='/signUp'
				className='btn btn-outline rounded-sm active:bg-neutral active:text-gray-100'>
				Sign-Up
			</Link>
			<Link
				to='/signIn'
				className=' btn rounded-sm text-white hover:bg-gray-100 hover:text-slate-900 active:bg-slate-900 active:text-gray-100'>
				Sign-In
			</Link>
		</>
	);
}
