import { useContext } from 'react';
import CartContext from '../context/Cart/CartContext';
import ProductContext from '../context/products/ProductContext';
import { SideBarContext } from '../context/SideBarContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import ShoppingCart from './ShoppingCart';

type Props = {};
export default function CartSideBar({}: Props) {
	const { cartSideBarIsOpen, toggleCartSideBar } = useContext(SideBarContext);
	const { cartQuantity } = useShoppingCart();
	const { isLoading } = useContext(ProductContext);

	const EmptyCart = ({ text }: { text: string }) => (
		<div className='flex flex-col  px-14 py-20 justify-between overflow-y-auto'>
			<div>
				<p className='text-4xl font-black leading-9 text-gray-800'>{text}</p>
			</div>
		</div>
	);

	return (
		<>
			<div
				className={`${
					cartSideBarIsOpen ? 'right-0' : '-right-full'
				} w-[80vw] bg-base-300 fixed top-0 h-full shadow-2xl sm:w-[70vw] md:w-[50vw] xl:max-w-[50vw] transition-all duration-200 z-30 lg:px-[35px]`}>
				<div className='container flex justify-between items-center'>
					<h2 className='ml-10 font-bold text-lg'>Your Cart</h2>
					<button
						className='btn btn-square btn-outline rounded m-2'
						onClick={() => toggleCartSideBar()}>
						<svg
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 512 512'
							stroke='currentColor'>
							<path
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={48}
								d='M268 112l144 144-144 144M392 256H100'
							/>
						</svg>
					</button>
				</div>

				{isLoading ? (
					<EmptyCart text='Loading your cart...' />
				) : cartQuantity === 0 ? (
					<EmptyCart text='Cart is Empty' />
				) : (
					<ShoppingCart />
				)}
			</div>
		</>
	);
}
