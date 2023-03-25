import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import LoadingSpinner from '../components/LoadingSpinner';
import { capitalizeFirstLetter } from '../components/ProductCategory';
import ProductItem from '../components/ProductItem';
import ProductContext from '../context/products/ProductContext';

type CategoryPageRoutsParams = {
	type: string;
};
type Props = {};
export default function CategoryPage({}: Props) {
	const [products, setProducts] = useState<Product[]>([]);
	const { type } = useParams<
		keyof CategoryPageRoutsParams
	>() as CategoryPageRoutsParams;
	const { getProductsByCategory, isLoading } = useContext(ProductContext);
	const navigate = useNavigate();

	useEffect(() => {
		const getProductsByCategoryAsync = async () => {
			if (typeof type === 'string')
				getProductsByCategory(type).then(data => setProducts(data));
		};
		getProductsByCategoryAsync();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					{typeof type === 'string' && (
						<Carousel heading={capitalizeFirstLetter(type)} />
					)}
					<h2 className='text-4xl underline underline-offset-4 font-bold my-8 '>
						<Link to='/'>
							<svg
								viewBox='0 0 512 512'
								className='h-8 w-8 inline mx-4'
								fill='none'
								stroke='currentColor'>
								<path
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={48}
									d='M244 400L100 256l144-144M120 256h292'
								/>
							</svg>
							Back
						</Link>
					</h2>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8'>
						{/* {products.map((item, i) => (
							<ProductItem key={i} product={item} />
						))} */}
					</div>
				</>
			)}
		</>
	);
}
