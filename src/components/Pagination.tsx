import { useContext } from 'react';
import ProductContext from '../context/products/ProductContext';
import ButtonBlack from './ButtonBlack';
import SmallButton from './SmallButton';

type Props = {
	totalPosts: number;
	postsPerPage: number;
	paginate: (page: number) => void;
};
export default function Pagination({
	totalPosts,
	postsPerPage,
	paginate,
}: Props) {
	const pageNumbers = [];
	const { getProductsByPage } = useContext(ProductContext);

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='mx-auto mt-20 max-w-xs'>
			<div className='btn-group flex justify-center rounded-none gap-2'>
				{/* <button className='btn btn-outline rounded-none'>Previous page</button>
				<button className='btn btn-outline rounded-none'>Next</button> */}
				{pageNumbers.map(num => (
					<SmallButton
						onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
							paginate(num);
							// getProductsByPage(num, postsPerPage);
						}}
						key={num}>
						{num}
					</SmallButton>
				))}
				{/* <ButtonBlack type='buy'>Previous page</ButtonBlack>
				<ButtonBlack type='buy'>Next</ButtonBlack> */}
			</div>
		</div>
	);
}
