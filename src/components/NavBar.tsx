import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactIcon from '../assets/react.svg';
import CartContext from '../context/Cart/CartContext';
import { SideBarContext } from '../context/SideBarContext';
import UserContext from '../context/User/UserContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import ButtonBlack from './ButtonBlack';
import LogInNavBar from './LogInNavBar';
import NavBarLink from './NavBarLink';
import UserNavBar from './UserNavBar';
import currencySymbol from '../data/CurrencySymbols';
import CountrySelect from './CountrySelect';
import currencySymbols from '../data/CurrencySymbols';

export const linksArray = ['Home', 'About', 'Contact'];
type Props = {};
export default function NavBar({}: Props) {
	const { toggleSideBar, toggleCartSideBar, toggleProfileSideBar } =
		useContext(SideBarContext);
	const { totalQuantity } = useContext(CartContext);
	const { changeBasePrice } = useShoppingCart();
	const { user } = useContext(UserContext);

	const currencySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const selectedCurr = e.target.value.toLowerCase();
		changeBasePrice(selectedCurr);
	};

	const isLoggedIn = user;
	const options = Object.keys(currencySymbols);
	return (
		<div className='navbar bg-base-200/60 fixed z-30'>
			<div className='container mx-auto'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<label
							tabIndex={0}
							className='btn btn-ghost lg:hidden'
							onClick={() => toggleSideBar()}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</label>
					</div>
					<Link
						to='/'
						className='max-[360px]:hidden btn btn-ghost normal-case text-xl rounded-sm'>
						RizzShop
					</Link>
				</div>
				{/* Main Navigation */}
				<div className='navbar-center hidden lg:flex lg:gap-4'>
					<NavLink
						to='/'
						className='btn btn-outline rounded-sm border-none min-h-6 h-10 '>
						Home
					</NavLink>
					<NavLink
						to='/About'
						className='btn btn-outline rounded-sm border-none min-h-6 h-10'>
						About
					</NavLink>
					<NavLink
						to='/Contact'
						className='btn btn-outline rounded-sm border-none min-h-6 h-10'>
						Contact
					</NavLink>
				</div>

				{/* Buttons at last */}
				<div className='navbar-end h-full'>
					<div className='flex justify-end items-center gap-2'>
						<CountrySelect options={options} />
						{isLoggedIn ? <UserNavBar /> : <LogInNavBar />}
					</div>
				</div>
			</div>
		</div>
	);
}
