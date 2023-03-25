import { useContext } from 'react';
import { Link } from 'react-router-dom';
import getCurrencySymbol from '../../utils/getCurrencySymbol';
import CartContext from '../context/Cart/CartContext';
import { percentage } from '../context/Cart/CartProvider';
import { SideBarContext } from '../context/SideBarContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import ButtonBlack from './ButtonBlack';

type Props = {
	checkOutPage?: boolean;
};
export default function CartSummary({ checkOutPage }: Props) {
	// const { totalPrice: subTotal, tax, shipping } = useContext(CartContext);
	const { cartSideBarIsOpen, toggleCartSideBar } = useContext(SideBarContext);
	const {
		cartTotal,
		currency: { code, rate },
		total,
		shipping,
		currSymbol,
		tax,
	} = useShoppingCart();

	const Summary = (
		<div className='flex flex-col  px-14 py-20 justify-between overflow-y-auto'>
			<div>
				<p className='text-4xl font-black leading-9 text-gray-800'>Summary</p>
				<div className='flex items-center justify-between pt-16'>
					<p className='text-base leading-none text-gray-800'>Subtotal</p>
					<p className='text-base leading-none text-gray-800'>
						{currSymbol}
						{(cartTotal * rate).toFixed(2)}
					</p>
				</div>
				<div className='flex items-center justify-between pt-5'>
					<p className='text-base leading-none text-gray-800'>Shipping</p>
					<p className='text-base leading-none text-gray-800'>
						{currSymbol}
						{(shipping * rate).toFixed(2)}
					</p>
				</div>
				<div className='flex items-center justify-between pt-5'>
					<p className='text-base leading-none text-gray-800'>Tax</p>
					<p className='text-base leading-none text-gray-800'>
						{currSymbol}
						{(tax * rate).toFixed(2)}
					</p>
				</div>
			</div>
			<div>
				<div className='flex items-center pb-6 justify-between lg:pt-5 pt-20'>
					<p className='text-2xl leading-normal text-gray-800'>Total</p>
					<p className='text-2xl font-bold leading-normal text-right text-gray-800'>
						{currSymbol}
						{(total * rate).toFixed(2)}
					</p>
				</div>
				{/* <button
						// onClick={() => setShow(!show)}
						className='text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white'>
						Checkout
					</button> */}
				{!checkOutPage && (
					<Link to='/checkout'>
						<ButtonBlack onClick={toggleCartSideBar} bgColor='gray'>
							Checkout
						</ButtonBlack>
					</Link>
				)}
			</div>
		</div>
	);
	return <div className='w-full bg-gray-100 h-fit'>{Summary}</div>;
}
