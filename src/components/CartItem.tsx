import { useContext } from 'react';
import CartContext from '../context/Cart/CartContext';
import ProductContext from '../context/products/ProductContext';
import ButtonBlack from './ButtonBlack';
import SmallButton from './SmallButton';
import {
	CartItem as CartItemType,
	useShoppingCart,
} from '../context/WDS/ShoppingCartContext';
import getCurrencySymbol from '../../utils/getCurrencySymbol';

type Props = { item: CartItemType };
export default function CartItem({ item: cartItem }: Props) {
	// const { addToCart, increaseItem, removeFromCart, decreaseItem } =
	// 	useContext(CartContext);

	const {
		increaseItem,
		decreaseItem,
		removeItem,
		currency: { code, rate },
		currSymbol,
	} = useShoppingCart();
	const { dummyProducts } = useContext(ProductContext);

	const item = dummyProducts.find(item => item.id === cartItem.id);
	if (item == null) return <></>;

	const totalPrice = item?.price * cartItem.quantity;

	// const currSymbol = getCurrencySymbol(code);

	return (
		<div className=' w-full bg-white overflow-y-auto overflow-x-hidden h-fit'>
			<div className='md:flex items-center px-10 py-8 border-t border-b border-gray-200 '>
				<div className='h-full w-1/4'>
					<img
						src={item.thumbnail}
						className='w-full h-full object-center object-cover'
					/>
				</div>
				<div className='md:pl-3 md:w-3/4 w-full'>
					<p className='text-sm leading-3 text-gray-800 md:pt-0 pt-4'>
						ID: {item.id}
					</p>
					<div className='flex items-center justify-between w-full pt-1'>
						<p className='text-lg font-bold leading-none text-gray-800'>
							{item.title}
						</p>
						{/* <select
							className='py-2 px-1 border border-gray-200 mr-6 focus:outline-none'
							value={item.quantity}
							onChange={() => increaseItem(item.id)}>
							<option>01</option>
							<option>02</option>
							<option>03</option>
						</select> */}
						<div className='flex justify-center items-center py-2 px-1 mr-6'>
							<SmallButton onClick={() => increaseItem(item.id, item.price)}>
								+
							</SmallButton>
							<p className='mx-2 font-bold'>{cartItem.quantity}</p>
							<SmallButton onClick={() => decreaseItem(item.id)}>-</SmallButton>
						</div>
					</div>
					<p className='text-sm leading-3 text-gray-600 pt-2 font-bold'>
						Price: {currSymbol}
						{(item.price * rate).toFixed(2)}
					</p>
					<p className='text-sm leading-3 text-gray-600 py-4'>Color: Black</p>
					<p className='w-96 text-sm leading-3 text-gray-600'>
						Composition: 100% calf leather
					</p>
					<div className='flex items-center justify-between pt-5 pr-6 gap-3'>
						<div className='flex items-center gap-2'>
							<p className='text-sm leading-3 underline text-gray-800 cursor-pointer'>
								Add to favorites
							</p>
							<p
								onClick={() => removeItem(item.id)}
								className='text-sm leading-3 underline text-red-500  cursor-pointer'>
								Remove
							</p>
						</div>
						<p className='text-base font-bold leading-none text-gray-800'>
							{currSymbol}
							{(totalPrice * rate).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
