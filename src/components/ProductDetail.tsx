import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductContext from '../context/products/ProductContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import ButtonBlack from './ButtonBlack';
import LoadingSpinner from './LoadingSpinner';
import StarRatings from 'react-star-ratings';
import UserContext from '../context/User/UserContext';

type ProductsDetailRouteParams = {
	id: string;
};

type Props = { passCategory(category: string, id: string): void };
export default function ProductDetail({ passCategory }: Props) {
	const { getSingleDummyProduct, products, isLoading } =
		useContext(ProductContext);
	const { increaseItem } = useShoppingCart();
	const [item, setItem] = useState<DummyProduct>();
	const [quantity, setQuantity] = useState(1);
	const [imgUrl, setImageUrl] = useState(item?.images[0]);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const { id } = useParams<
		keyof ProductsDetailRouteParams
	>() as ProductsDetailRouteParams;

	const quantitySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const quantity = +e.target.value;
		setQuantity(quantity);
	};
	const addToCartHandler = () => {
		if (!user) {
			navigate('/signIn');
			return;
		}
		if (item) {
			increaseItem(item?.id, item?.price, quantity);
		}
	};

	useEffect(() => {
		if (id) {
			getSingleDummyProduct(id).then(data => {
				setItem(data);
				passCategory(data.category, data.id);
			});
		}
	}, [id]);
	if (isLoading) return <LoadingSpinner />;
	if (!item) return <h1>Item not found</h1>;
	return (
		<section className='text-gray-700 body-font overflow-hidden bg-inherit'>
			<div className='container px-5 py-24 mx-auto'>
				<div className='lg:w-[90%] mx-auto flex flex-wrap'>
					<div className='lg:w-1/2 w-full max-h-[60vh] flex flex-col gap-2 rounded-sm items-center'>
						<div className='w-full min-h-16 h-80 '>
							<img
								className='h-full w-full object-contain object-center'
								src={imgUrl || item.thumbnail}
							/>
						</div>
						<div className='w-fit h-fit flex flex-wrap justify-center shadow-2xl border border-gray-200'>
							{item.images.slice(0, 4).map((image, ix) => (
								<div className='h-20 max-w-fit w-20 ' key={ix}>
									<img
										className='w-full h-full object-cover object-center'
										src={image}
										onClick={() => setImageUrl(image)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='lg:w-1/2 w-full lg:pl-10 lg:py-8 mt-10 lg:mt-0'>
						<h2 className=' stat-title text-gray-500 tracking-widest'>
							BRAND :<b>{item.brand}</b>
						</h2>
						<h1 className='stat-title text-gray-900 text-3xl title-font font-medium mb-1'>
							{item.title}
						</h1>
						<div className='flex mb-4'>
							<div className='rating'>
								<StarRatings
									rating={item.rating}
									starRatedColor='orange'
									numberOfStars={5}
									name='rating'
									starDimension='30px'
									starSpacing='5px'
								/>
							</div>
						</div>
						<p className='text-lg text-gray-400'>{item.description}</p>
						<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 justify-between'>
							<div className='flex items-center stat-title'>
								<label className='label'>
									<span className='label-text'>Quantity :</span>
								</label>
								<div className='relative ml-3'>
									<select
										onChange={quantitySelectHandler}
										defaultValue={1}
										className='select w-full text-md rounded-none border-gray-400 focus:outline-none'>
										<option value={1}>1</option>
										<option value={2}>2</option>
										<option value={3}>3</option>
										<option value={4}>4</option>
									</select>
								</div>
							</div>
							<div className='stat-title'>
								<span>Stock available :</span>
								<span className='ml-2 stat-value'>{item.stock}</span>
							</div>
						</div>
						<div className='flex justify-between items-center'>
							{/* <div className='flex gap-4'>
								<del className='title-font font-medium text-2xl text-gray-900'>
									${item.price}
								</del>
								<span className='title-font font-bold text-3xl text-green-500'>
									$
									{(
										item.price -
										item.price * (item.discountPercentage / 100)
									).toFixed(2)}
								</span>
							</div> */}
							<div className='flex items-center space-x-4 my-4'>
								<div>
									<div className='rounded-lg bg-gray-100 flex py-2 px-3'>
										<span className='text-indigo-400 mr-1 mt-1'>$</span>
										<span className='font-bold text-indigo-600 text-3xl'>
											{(
												item.price -
												item.price * (item.discountPercentage / 100)
											).toFixed(2)}
										</span>
									</div>
								</div>
								<div className='flex-1'>
									<p className='text-green-500 text-xl font-semibold'>
										Save {item.discountPercentage}%
									</p>
									<del className='text-gray-400 text-sm'>${item.price}</del>
								</div>
							</div>
							<div className='flex gap-4 w-[30%] h-fit'>
								<ButtonBlack onClick={addToCartHandler} bgColor='white'>
									Add to cart
								</ButtonBlack>
								{/* <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
									<svg
										fill='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-5 h-5'
										viewBox='0 0 24 24'>
										<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
									</svg>
								</button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
	return (
		<div>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content flex-col gap-8 lg:flex-row'>
					<div>
						<img
							src={item?.thumbnail}
							className='max-w-md rounded-sm shadow-2xl '
						/>
					</div>
					<div>
						<p>Stars</p>
						<h1 className='text-5xl font-bold'>{item?.title}</h1>
						<p className='py-6 text-xl'>{item?.description}</p>
						{/* 
						<ButtonBlack
							type='buy'
							onClick={() => increaseItem(item?.id, item?.price)}>
							Add to cart
						</ButtonBlack> */}
					</div>
				</div>
			</div>
		</div>
	);
}
