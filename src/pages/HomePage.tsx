import { useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';
import ProductContext from '../context/products/ProductContext';

type Props = {};
export default function HomePage({}: Props) {
	const { isLoading } = useContext(ProductContext);

	return <>{isLoading ? <LoadingSpinner /> : <ProductList />}</>;
}
