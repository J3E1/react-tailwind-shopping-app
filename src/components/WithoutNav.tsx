import { Outlet } from 'react-router';

type Props = {};
export default function WithoutNav({}: Props) {
	return (
		<main className='container mx-auto my-auto'>
			<Outlet />
		</main>
	);
}
