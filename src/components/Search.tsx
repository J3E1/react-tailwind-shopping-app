import { useContext, useState } from 'react';
import ProductContext from '../context/products/ProductContext';
import ButtonBlack from './ButtonBlack';

type Props = {};
export default function Search({}: Props) {
	const [text, setText] = useState<string>('');

	const { searchProducts, isSearched, setIsSearched } =
		useContext(ProductContext);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text === '') return;
		searchProducts(text);
		setText('');
	};

	return (
		<div className='flex '>
			{isSearched && (
				<button
					className='link link-hover mx-5 text-lg text-red-500'
					onClick={() => setIsSearched(false)}>
					Clear Results
				</button>
			)}
			<form onSubmit={handleSubmit}>
				<div className='form-control'>
					<div className='relative'>
						<input
							type='text'
							className='w-full pr-40 bg-gray-100 input input-md rounded-none text-black focus:outline-none'
							placeholder='Search'
							value={text}
							onChange={e => setText(e.target.value)}
						/>

						<ButtonBlack
							className='absolute top-0 right-0 w-36'
							bgColor='white'>
							Go
						</ButtonBlack>
					</div>
				</div>
			</form>
		</div>
	);
}
