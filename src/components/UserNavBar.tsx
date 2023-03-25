import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOutFun } from '../../utils/firebaseConfig';
import ProductContext from '../context/products/ProductContext';
import { SideBarContext } from '../context/SideBarContext';
import UserContext from '../context/User/UserContext';

import { useShoppingCart } from '../context/WDS/ShoppingCartContext';

type Props = {};
export default function UserNavBar({}: Props) {
	const [cartIsHighlighted, setCartIsHighlighted] = useState(false);
	const { toggleCartSideBar, toggleProfileSideBar } =
		useContext(SideBarContext);
	const { setUserFun, user } = useContext(UserContext);
	const { setIsLoadingState } = useContext(ProductContext);
	const { cartQuantity, setCartItemFun } = useShoppingCart();
	const navigate = useNavigate();
	useEffect(() => {
		if (cartQuantity === 0) return;
		setCartIsHighlighted(true);

		const timer = setTimeout(() => {
			setCartIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartQuantity]);

	const cartIconClass = `btn btn-ghost btn-circle ${
		cartIsHighlighted ? 'animate-bump' : ''
	}`;
	const signOut = async () => {
		setIsLoadingState(true);
		// debugger;
		await signOutFun();
		setUserFun(null);
		setCartItemFun([]);
		setIsLoadingState(false);
	};

	return (
		<>
			<label
				tabIndex={0}
				className={cartIconClass}
				onClick={() => toggleCartSideBar()}>
				<div className='indicator'>
					{/* <svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
						/>
					</svg> */}
					<svg
						viewBox='0 0 16 16'
						className='h-5 w-5'
						fill='none'
						stroke='currentColor'>
						<path d='M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.49.598l-1 5a.5.5 0 01-.465.401l-9.397.472L4.415 11H13a.5.5 0 010 1H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 110 2 1 1 0 010-2zm7 0a1 1 0 110 2 1 1 0 010-2z' />
					</svg>
					<span className='badge badge-sm indicator-item bg-red-500 border-none'>
						{cartQuantity}
					</span>
				</div>
			</label>
			{/* <button
				type='button'
				tabIndex={0}
				className='btn btn-outline rounded-sm'
				onClick={signOut}>
				Sign Out
			</button> */}
			<div className='dropdown dropdown-end'>
				<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
					<div className='w-10 rounded-full'>
						<img
							src={
								user?.photoURL ||
								'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
							}
						/>
						{/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
					</div>
				</label>
				<ul
					tabIndex={0}
					className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-sm w-52 '>
					<li>
						<Link className='!rounded-sm' to='/profile'>
							Profile
							{/* <span className='badge'>New</span> */}
						</Link>
					</li>
					<li>
						<Link className='!rounded-sm' to='profile/order-list'>
							My Orders
							{/* <span className='badge'>New</span> */}
						</Link>
					</li>
					<li>
						<button className='!rounded-sm' onClick={signOut}>
							Log Out
							{/* <span className='badge'>New</span> */}
						</button>
					</li>
				</ul>
			</div>
		</>
	);
}
