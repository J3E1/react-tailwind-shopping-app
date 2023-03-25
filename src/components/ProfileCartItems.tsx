import { useContext } from 'react';
import ProductContext from '../context/products/ProductContext';
import { CartItem, useShoppingCart } from '../context/WDS/ShoppingCartContext';

type Props = { item: CartItem };
export default function ProfileCartItems({ item: cartItem }: Props) {
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

	return (
		<div className=' w-full bg-white overflow-y-auto overflow-x-hidden h-fit '>
			<div className='md:flex items-center px-10 py-8 border-t border-gray-200 justify-center group'>
				<div className='h-full mr-8 group-hover:scale-110 text-center transition duration-200'>
					<img
						src={item.thumbnail}
						className='w-40 h-ful  object-cover mx-auto'
					/>
				</div>
				<div className='md:pl-3 md:w-3/4 w-full flex flex-col'>
					<p className='text-sm leading-3 text-gray-800 md:pt-0 pt-4'>
						ID:
						{item.id}
					</p>
					<div className='flex items-center justify-between w-full pt-1'>
						<p className='text-lg font-bold leading-none text-gray-800'>
							{item.title}
						</p>
						<div className='flex justify-center items-center py-2 px-1 mr-6 text-lg '>
							Quantity:<p className='mx-2 font-bold'>{cartItem.quantity}</p>
						</div>
					</div>
					<p className='text-sm leading-3 text-gray-600 pt-2 font-bold '>
						Price: {currSymbol}
						{(item.price * rate).toFixed(2)}
					</p>
					{/* <p className='text-sm leading-3 text-gray-600 py-4'>Color: Black</p> */}

					<div className='flex items-center justify-between pt-5 pr-6 gap-3 self-end mr-4'>
						<p className='text-xl font-bold leading-none text-green-500'>
							{currSymbol}
							{(totalPrice * rate).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
