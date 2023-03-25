import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import CartSideBar from './CartSideBar';
import Footer from './Footer';
import LeftSideBar from './LeftSideBar';
import NavBar from './NavBar';

type Props = { children: ReactNode };
export default function NavFoot({ children }: Props) {
	const location = useLocation();
	console.log('🚀 ~ file: NavFoot.tsx:11 ~ NavFoot ~ pathname:', location);
	const locationIsException =
		location.pathname === '/' ||
		location.pathname === '/About' ||
		location.pathname === '/Contact' ||
		location.pathname === '/products' ||
		location.pathname === '/product/*' ||
		location.pathname === '/category/:type';
	if (locationIsException)
		return (
			<>
				<NavBar />
				<LeftSideBar />
				<CartSideBar />
				{children}
				<Footer />
			</>
		);

	return <>{children}</>;
}
