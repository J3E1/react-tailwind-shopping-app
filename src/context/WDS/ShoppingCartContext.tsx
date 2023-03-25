import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import useLocalStorage from './useLocalStorage';
import CurrencyData from '../../data/currency.json';
import { addCartToUserProfile } from '../../../utils/firebaseConfig';
import UserContext from '../User/UserContext';
import { percentage } from '../Cart/CartProvider';
import getCurrencySymbol from '../../../utils/getCurrencySymbol';

type ShoppingCartProviderProps = { children: ReactNode };
type ShoppingCartContext = {
	cartItem: CartItem[];
	cartQuantity: number;
	cartTotal: number;
	currency: Currency;
	total: number;
	shipping: number;
	tax: number;
	currSymbol: string;
	country: string;
	changeBasePrice: (currency: string) => void;
	getItemQuantity: (id: string) => number;
	increaseItem: (id: string, price: number, quantity?: number) => void;
	decreaseItem: (id: string) => void;
	removeItem: (id: string) => void;
	setCartItemFun: (cartItem: CartItem[]) => void;
	emptyShoppingCart: () => void;
};
export type CartItem = {
	id: string;
	quantity: number;
	price: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartItem, setCartItem] = useState<CartItem[]>([]);
	// const [cartItem, setCartItem] = useLocalStorage<CartItem[]>(
	// 	'shopping-cart',
	// 	[]
	// );
	const [currency, setCurrency] = useState<Currency>(CurrencyData.usd);

	const setCartItemFun = (cartItem: CartItem[] | []) => {
		setCartItem([...cartItem]);
	};

	const changeBasePrice = (currency: string) => {
		const selectedCurr: Currency =
			CurrencyData[currency as keyof typeof CurrencyData];
		setCurrency(selectedCurr);
	};
	const cartQuantity = cartItem.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	const cartTotal = cartItem.reduce(
		(total, item) => item.quantity * item.price + total,
		0
	);

	const shipping = percentage(30, cartTotal);
	const tax = percentage(10, cartTotal);
	const total = cartTotal + tax + shipping;
	const currSymbol = getCurrencySymbol(currency.code)[0];
	const country = getCurrencySymbol(currency.code)[1];

	// useEffect(() => {
	// 	const timer = setTimeout(async () => {
	// 		if (user) {
	// 			await addCartToUserProfile(user.uid, cartItem, cartTotal);
	// 		}
	// 	}, 2000);
	// 	return () => clearTimeout(timer);
	// }, [user, cartItem, cartTotal]);

	const getItemQuantity = (id: string) =>
		cartItem.find(item => item.id === id)?.quantity || 0;

	const increaseItem = (id: string, price: number, quantity: number = 1) => {
		setCartItem(currItems => {
			if (currItems.find(item => item.id === id) == null) {
				return [
					...currItems,
					{ id, quantity: quantity, price, totalPrice: price },
				];
			} else {
				return cartItem.map(item => {
					if (item.id === id) {
						return {
							...item,
							quantity: item.quantity + quantity,
						};
					} else {
						return item;
					}
				});
			}
		});
	};
	const decreaseItem = (id: string) => {
		setCartItem(currItems => {
			if (currItems.find(item => item.id === id)?.quantity === 1) {
				return currItems.filter(item => item.id !== id);
			} else {
				return cartItem.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeItem = (id: string) =>
		setCartItem(currItems => currItems.filter(item => item.id !== id));

	const emptyShoppingCart = () => setCartItem([]);

	return (
		<ShoppingCartContext.Provider
			value={{
				country,
				cartItem,
				cartQuantity,
				cartTotal,
				currency,
				total,
				tax,
				shipping,
				currSymbol,
				changeBasePrice,
				getItemQuantity,
				increaseItem,
				decreaseItem,
				removeItem,
				setCartItemFun,
				emptyShoppingCart,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
}
