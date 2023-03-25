import { useContext, useEffect, useState } from 'react';
import ProductContext from '../context/products/ProductContext';
import ProductItem from './ProductItem';
import Products from '../data/products.json';
import Pagination from './Pagination';
import Carousel from './Carousel';
import ProductCategory from './ProductCategory';
import ButtonBlack from './ButtonBlack';
import { json, Link } from 'react-router-dom';
import Search from './Search';

type Props = {};
export default function ProductList({}: Props) {
	const { isSearched, searchResults, dummyProducts, isLoadingSecond } =
		useContext(ProductContext);

	const defaultProductList = (
		<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-4'>
			{dummyProducts?.slice(0, 12).map((item, i) => (
				<ProductItem key={i} product={item} />
			))}
		</div>
	);

	const searchResultsProductList = (
		<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4'>
			{isLoadingSecond ? (
				<h2 className='ml-10 font-semibold text-2xl'>Loading...</h2>
			) : searchResults.length === 0 ? (
				<h2 className='ml-10 font-semibold text-2xl'>No products found!!</h2>
			) : (
				searchResults
					.slice(0, 9)
					.map((item, i) => <ProductItem key={i} product={item} />)
			)}
		</div>
	);

	return (
		<>
			<Carousel />
			{/* <div>
				<ProductCategory category="women's clothing" products={womenProducts} />
			</div>
			<div>
				<ProductCategory category="men's clothing" products={menProducts} />
			</div>
			<div>
				<ProductCategory category='jewelery' products={jeweleryProducts} />
			</div>
			<div>
				<ProductCategory
					category='electronics'
					products={electronicsProducts}
				/>
			</div> */}
			{/* Error Div */}
			{/* <div className='alert alert-error shadow-lg rounded-none'>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='stroke-current flex-shrink-0 h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<span>Error! Task failed successfully.</span>
				</div>
			</div> */}

			<div className='flex flex-wrap items-center my-8 justify-between'>
				<h2 className='text-4xl mb-8 md:mb-0 underline underline-offset-4 font-bold flex flex-row'>
					{!isSearched ? 'Featured Products' : `Search results`}
				</h2>

				<Search />
			</div>
			{isSearched ? searchResultsProductList : defaultProductList}
			<div className='mx-auto my-20 max-w-xs'>
				<Link to='/products'>
					<ButtonBlack bgColor='white'>View More Products</ButtonBlack>
				</Link>
			</div>
		</>
	);
}
