import ShoppingCart from '../components/ShoppingCart';
import CartProvider from './Cart/CartProvider';
import ProductsProvider from './products/ProductsProvider';
import SideBarProvider from './SideBarProvider';
import UserProvider from './User/UserProvider';
import { ShoppingCartProvider } from './WDS/ShoppingCartContext';

type Props = { children: React.ReactNode };
export default function MainProvider({ children }: Props) {
	return (
		<ProductsProvider>
			<ShoppingCartProvider>
				<UserProvider>
					<SideBarProvider>{children}</SideBarProvider>
				</UserProvider>
			</ShoppingCartProvider>
		</ProductsProvider>
	);
}
