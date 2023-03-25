import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/Cart/CartContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import ButtonBlack from './ButtonBlack';
import getCurrencySymbol from '../../utils/getCurrencySymbol';

type Props = { product: DummyProduct };
export default function ProductItem({ product }: Props) {
	// const { , increaseItem } = useContext(CartContext);
	const {
		increaseItem: addToCart,
		currency: { code, rate },
		currSymbol,
	} = useShoppingCart();
	const navigate = useNavigate();
	// const currSymbol = getCurrencySymbol(code);
	return (
		<div className='card w-90 bg-base-100 shadow-xl relative overflow-hidden group transition rounded-sm'>
			<div className='w-full h-full flex flex-col justify-center items-center'>
				<div className='w-90 flex justify-center align-center'>
					<div className='bg-black absolute bg-opacity-0 p-4 w-full h-full z-10 group-hover:bg-opacity-30 transition-all duration-200'></div>
					<img
						className='h-80 w-full object-contain group-hover:scale-110 transition duration-200 '
						src={product.thumbnail}
						alt={product.title}
					/>
					<p className='absolute flex right-2 -top-14 bg-white p-2 cursor-pointer group z-20 shadow-lg group-hover:top-2 transition-all duration-200'>
						<span className='text-md font-semibold'>{product.rating}</span>
						<svg viewBox='0 0 1024 1024' fill='orange' className='w-6 h-6 ml-2'>
							<path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z' />
						</svg>
					</p>
				</div>
				<div className='card-body'>
					<div className='absolute z-20 bg-base-100 left-0 w-full h-fit -bottom-[35%] group-hover:bottom-0 transition-all duration-200'>
						<div className='mx-4'>
							<div className=' flex gap-2 justify-between h-16 items-center my-3'>
								<h2 className='card-title text-gray-600 dark:text-gray-300 line-clamp-2'>
									{product.title}
								</h2>
								<h2 className='card-title text-gray-800 text-2xl w-fit font-bold '>
									{`${currSymbol}${(product.price * rate).toFixed(2)}`}
								</h2>
							</div>
							<p className=' line-clamp-2 my-2 min-h-12 h-fit'>
								{product.description}
							</p>
							<div className='flex justify-center my-5'>
								<ButtonBlack
									onClick={() => navigate(`/product/${product.id}`)}
									bgColor='white'>
									Buy Now!
								</ButtonBlack>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	// if (product  Product) {
	// 	const item: CartItem = {
	// 		id: product.id,
	// 		title: product.title,
	// 		price: product.price,
	// 		totalPrice: product.price,
	// 		quantity: 1,
	// 		image: product.image,
	// 	};

	// 	return (
	// 		<div className='card w-90 bg-base-100 shadow-xl relative overflow-hidden group transition rounded-sm'>
	// 			<div className='w-full h-full flex flex-col justify-center items-center'>
	// 				<div className='w-90 flex justify-center align-center'>
	// 					<div className='bg-black absolute bg-opacity-0 p-4 w-full h-full z-10 group-hover:bg-opacity-30 transition-all duration-200'></div>
	// 					<img
	// 						className='h-80 w-full object-contain group-hover:scale-110 transition duration-200 '
	// 						src={product.image}
	// 						alt='Shoes'
	// 					/>
	// 				</div>
	// 				<div className='card-body'>
	// 					<div className='absolute z-20 bg-base-100 left-0 w-full h-fit -bottom-[35%] group-hover:bottom-0 transition-all duration-200'>
	// 						<div className='mx-4'>
	// 							<div className=' flex gap-2 justify-between max-h-20 my-3'>
	// 								<h2 className='card-title text-gray-600 line-clamp-2'>
	// 									{product.title}
	// 								</h2>
	// 								<h2 className='card-title text-gray-800 text-2xl w-fit font-bold'>
	// 									{`$${product.price}`}
	// 								</h2>
	// 							</div>
	// 							<p className=' line-clamp-2 my-2'>{product.description}</p>
	// 							<div className='flex justify-center my-5'>
	// 								<ButtonBlack
	// 									onClick={() => navigate(`/product/${product.id}`)}
	// 									type='buy'>
	// 									Buy Now!
	// 								</ButtonBlack>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }
}
