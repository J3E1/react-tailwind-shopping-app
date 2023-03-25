import React, { useEffect, useState } from 'react';
import ProductContext from './ProductContext';
import Products from '../../data/products.json';

type Props = { children: React.ReactNode };
export default function ProductsProvider({ children }: Props) {
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState<string[]>([]);
	const [dummyProducts, setDummyProducts] = useState<DummyProduct[]>([]);
	const [searchResults, setSearchResults] = useState<DummyProduct[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearched, setIsSearched] = useState(false);
	const [isLoadingSecond, setIsLoadingSecond] = useState(false);

	const getProductsByCategory = async (category: string) => {
		setIsLoading(true);
		const res = await fetch(
			`https://fakestoreapi.com/products/category/${category}`
		);

		const data: Product[] = await res.json();

		setIsLoading(false);
		return data;
	};

	const getDummyProducts = async () => {
		setIsLoading(true);
		const res = await fetch(`https://dummyjson.com/products`);

		const data: DummyProductResponse = await res.json();
		setDummyProducts(data.products);
		setIsLoading(false);
		return data;
	};
	const getDummyProductsByCategory = async (category: string) => {
		setIsLoadingSecond(true);
		const res = await fetch(
			`https://dummyjson.com/products/category/${category}`
		);

		const data: DummyProductResponse = await res.json();

		setIsLoadingSecond(false);
		return data.products;
	};
	const getSingleDummyProduct = async (id: string) => {
		setIsLoading(true);
		const res = await fetch(`https://dummyjson.com/products/${id}`);

		const data: DummyProduct = await res.json();
		setIsLoading(false);

		return data;
	};
	const getAllCategory = async () => {
		setIsLoading(true);
		const res = await fetch(`https://dummyjson.com/products/categories`);

		const data: string[] = await res.json();
		setCategory(data);
		setIsLoading(false);

		return data;
	};

	const searchProducts = async (term: string) => {
		setIsLoadingSecond(true);
		const res = await fetch(`https://dummyjson.com/products/search?q=${term}`);
		const data: DummyProductResponse = await res.json();
		setIsLoadingSecond(false);
		setIsSearched(true);
		setSearchResults(data.products);
		return data.products;
	};

	const getProductsByPage = async (pageNum: number, limit: number) => {
		const skip = pageNum * limit - limit;
		setIsLoading(true);
		const res = await fetch(
			`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
		);

		const data: DummyProductResponse = await res.json();
		setDummyProducts(data.products);
		setIsLoading(false);

		return data.products;
	};
	const setIsLoadingState = (state: boolean) => {
		setIsLoading(state);
	};
	useEffect(() => {
		getDummyProducts();
		getAllCategory();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				isSearched,
				searchResults,
				category,
				dummyProducts,
				products,
				isLoading,
				isLoadingSecond,
				setIsSearched,
				getProductsByCategory,
				getDummyProductsByCategory,
				getSingleDummyProduct,
				getAllCategory,
				searchProducts,
				getProductsByPage,
				setIsLoadingState,
			}}>
			{children}
		</ProductContext.Provider>
	);
}
