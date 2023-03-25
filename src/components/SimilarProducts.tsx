import { useContext, useEffect, useState } from 'react';
import ProductContext from '../context/products/ProductContext';
import LoadingSpinner from './LoadingSpinner';
import ProductItem from './ProductItem';

type Props = { category: string; id: string };
export default function SimilarProducts({ category, id }: Props) {
	const [products, setProducts] = useState<DummyProduct[]>([]);
	const { getDummyProductsByCategory, isLoadingSecond, isLoading } =
		useContext(ProductContext);
	useEffect(() => {
		if (!category) return;
		getDummyProductsByCategory(category).then(products => {
			const filteredProducts = products.filter(product => product.id !== id);
			setProducts(filteredProducts);
		});
	}, [category]);
	if (isLoading) return <LoadingSpinner />;
	return (
		<div>
			<h2 className='text-4xl underline underline-offset-4 font-bold my-8 '>
				Similar Products
			</h2>
			{isLoadingSecond ? (
				<h3 className='text-center text-xl py-8'>Loading...</h3>
			) : (
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8'>
					{products.map((item, i) => (
						<ProductItem key={i} product={item} />
					))}{' '}
				</div>
			)}
		</div>
	);
}
