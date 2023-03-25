import { Link } from 'react-router-dom';
import RightArrow from '../assets/RightArrow';
import ProductItem from './ProductItem';

type Props = { products: DummyProduct[]; category: string };

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function ProductCategory({ products, category }: Props) {
	const linkString = category.split("'")[0];

	return (
		<>
			<h2 className='text-4xl underline underline-offset-4 font-bold my-8 flex flex-row'>
				<Link to={`/category/${category}`}>
					{capitalizeFirstLetter(category)}

					<RightArrow />
				</Link>
			</h2>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{products.map((item, i) => (
					<ProductItem key={i} product={item} />
				))}
			</div>
		</>
	);
}
