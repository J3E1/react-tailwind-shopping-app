import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import ProductItem from '../components/ProductItem';
import ProductContext from '../context/products/ProductContext';

type Props = {};
export default function AllProducts({}: Props) {
	const { isLoading, category, dummyProducts, getDummyProductsByCategory } =
		useContext(ProductContext);
	const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
	const [selectedCategory, setSelectedCategory] = useState('All Products');
	const [productsBrands, setProductBrands] = useState([
		...dummyProducts.map(p => p.brand),
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//Get Current Products
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredProducts.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	if (isLoading) return <LoadingSpinner />;

	const categoryChangeHandler = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		e.preventDefault();
		if (e.target.value === 'Default') {
			setSelectedCategory('All Products');
			setFilteredProducts(dummyProducts);
			setProductBrands([...dummyProducts.map(p => p.brand)]);
		} else {
			setSelectedCategory(e.target.value);
			const category = e.target.value;
			let products = dummyProducts.filter(
				product => product.category === category
			);
			if (products.length === 0) {
				products = await getDummyProductsByCategory(category);
				products.forEach(product => {
					const elementExists = dummyProducts.includes(product);
					if (!elementExists) dummyProducts.push(product);
					else return;
				});
			}

			setFilteredProducts(products);
			setProductBrands([...products.map(p => p.brand)]);
		}
	};
	const ratingSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();

		const products = filteredProducts.sort((a, b) => {
			if (e.target.value === 'descending') return b.rating - a.rating;
			else return a.rating - b.rating;
		});

		setFilteredProducts([...products]);
	};
	const priceSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();

		const products = filteredProducts.sort((a, b) => {
			if (e.target.value === 'descending') return b.price - a.price;
			else return a.price - b.price;
		});

		setFilteredProducts([...products]);
	};

	const brandSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		let products: DummyProduct[];
		if (e.target.value === 'Default') {
			products = filteredProducts;
		} else
			products = dummyProducts.filter(
				product => product.brand === e.target.value
			);
		setFilteredProducts([...products]);
	};

	const paginate = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<Layout>
			<div className='container flex flex-col md:flex-row  h-full'>
				<div className=' md:w-[14rem]  md:max-w-[25%] w-full bg-gray-100 '>
					<div className='m-4'>
						<h2 className='text-xl font-bold my-4'>Filter Products</h2>
						<div className='flex flex-col gap-2'>
							<div>
								<label className='label'>
									<span className='label-text'>By Category</span>
								</label>
								<select
									onChange={categoryChangeHandler}
									id='categorySelect'
									className='select  w-full text-md rounded-none scr'
									// defaultValue={'Default'}
									value={selectedCategory}>
									<option value='Default'>All Products</option>
									{category.map((item, i) => (
										<option key={i} id={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className='label'>
									<span className='label-text'>Sort By Rating</span>
								</label>
								<select
									onChange={ratingSelectHandler}
									defaultValue='Default'
									id='rateSelect'
									className='select  w-full text-md rounded-none scr'>
									<option disabled value='Default'>
										Select a option
									</option>
									<option value='descending'>High to Low</option>
									<option value='ascending'>Low to High</option>
								</select>
							</div>
							<div>
								<label className='label'>
									<span id='priceSelect' className='label-text'>
										Sort By Price
									</span>
								</label>
								<select
									defaultValue='Default'
									onChange={priceSelectHandler}
									className='select  w-full text-md rounded-none scr'>
									<option disabled value='Default'>
										Select a option
									</option>
									<option value='ascending'>Low to High</option>
									<option value='descending'>High to Low</option>
								</select>
							</div>
							<div>
								<label className='label'>
									<span className='label-text'>By Brand</span>
								</label>
								<select
									defaultValue='Default'
									onChange={brandSelectHandler}
									id='brandSelect'
									className='select  w-full text-md rounded-none scr'>
									<option disabled value='Default'>
										Select a Brand
									</option>
									{productsBrands.map((brand, i) => (
										<option key={i} value={brand}>
											{brand}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className='flex-1 mx-6 mb-10 mt-6'>
					<div className='flex items-baseline gap-4'>
						<h2 className='text-4xl underline underline-offset-4 font-bold mb-6 flex flex-row'>
							{selectedCategory}
						</h2>
						{filteredProducts.length > 5 && (
							<span>
								Product {indexOfFirstPost + 1} to {indexOfLastPost} out of{' '}
								{filteredProducts.length}
							</span>
						)}
					</div>
					{(filteredProducts.length === 0 || !filteredProducts) && (
						<h2>No Products found</h2>
					)}
					<div className=' grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{filteredProducts.length > 5
							? currentPosts.map(product => (
									<ProductItem key={product.id} product={product} />
							  ))
							: filteredProducts.map(product => (
									<ProductItem key={product.id} product={product} />
							  ))}
						{/* {filteredProducts.slice(0, 6).map(product => (
							<ProductItem key={product.id} product={product} />
						))} */}
					</div>
					{filteredProducts.length > 5 && (
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={filteredProducts.length}
							paginate={paginate}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
}
