import CartSideBar from './CartSideBar';
import Footer from './Footer';
import LeftSideBar from './LeftSideBar';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

type Props = {};
export default function WithNavBar({}: Props) {
	return (
		<>
			<NavBar />
			<main className='container mx-auto my-auto'>
				<LeftSideBar />
				<CartSideBar />
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
