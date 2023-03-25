import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSideBar from '../components/CartSideBar';
import RightSideBar from '../components/checkoutPageComponents/RightSideBar';
import CountrySelect from '../components/CountrySelect';
import LeftSideBar from '../components/checkoutPageComponents/LeftBar';
import ShoppingCart from '../components/ShoppingCart';
import { SideBarContext } from '../context/SideBarContext';
import UserContext from '../context/User/UserContext';
import ProductContext from '../context/products/ProductContext';
import LoadingSpinner from '../components/LoadingSpinner';

type Props = {};
export default function CheckOutPage({}: Props) {
	const { isLoading } = useContext(ProductContext);
	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='container h-screen grid grid-cols-5'>
			<LeftSideBar />

			<RightSideBar />
		</div>
	);
}
