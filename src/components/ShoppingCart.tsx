import { useContext } from 'react';
import CartContext from '../context/Cart/CartContext';
import ProductContext from '../context/products/ProductContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

type Props = { checkoutPage?: boolean };
export default function ShoppingCart({ checkoutPage }: Props) {
	// const { items } = useContext(CartContext);

	const { cartItem } = useShoppingCart();

	const defaultClassName =
		'w-full absolute z-10 right-0 h-full overflow-y-scroll ';
	const checkoutSidebarClassName = ' h-screen w-full overflow-y-scroll';

	return (
		<div className={checkoutPage ? checkoutSidebarClassName : defaultClassName}>
			<div className='flex flex-col justify-end' id='cart'>
				{cartItem.map(item => (
					<CartItem key={item.id} item={item} />
				))}
				{/* </div> */}
				<CartSummary checkOutPage={checkoutPage} />
			</div>
		</div>
	);
}
