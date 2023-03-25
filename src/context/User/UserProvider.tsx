import { DocumentData } from '@firebase/firestore';
import { User } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import {
	addCartToUserProfile,
	omAuthStateChangedListener,
	signOutFun,
	getUser,
	getUserFromFirestore,
} from '../../../utils/firebaseConfig';
import { useShoppingCart } from '../WDS/ShoppingCartContext';
import UserContext from './UserContext';
export interface ConfirmedOrderInfo {
	cartItem: CartItem[];
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	orderid: string;
}
type Props = { children: ReactNode };
export default function UserProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>();
	const [userFromFireStore, setUserFromFireStore] = useState<DocumentData>({});
	const { cartItem, cartTotal, setCartItemFun } = useShoppingCart();
	const [confirmedOrderList, setConfirmedOrderList] = useState<
		ConfirmedOrderInfo[] | null
	>(null);
	const [loading, setLoading] = useState(true);
	const [orderId, setOrderId] = useState('');

	// signOutFun();
	useEffect(() => {
		const unsubscribe = omAuthStateChangedListener(user => {
			// console.log('🚀 ~ file: UserProvider.tsx:15 ~ unsubscribe ~ user:', user);
			setUser(user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (user) {
				await addCartToUserProfile(user.uid, cartItem, cartTotal);
			}
		}, 2000);
		return () => clearTimeout(timer);
	}, [user, cartItem, cartTotal]);
	useEffect(() => {
		if (user) {
			getUser(user.uid).then(userData => {
				if (userData) {
					setCartItemFun(userData.cart.cartItem);
					setConfirmedOrderList(userData.confirmedOrders);
				}
			});
			getUserFromFirestore(user.uid).then(
				user => user && setUserFromFireStore(user)
			);
		}
	}, [user]);

	// useEffect(() => {
	// 	if (user && cartItem) addCartToUserProfile(user?.uid, cartItem, cartTotal);
	// }, [user, cartItem, cartTotal]);
	const setUserFun = (user: User | null) => {
		setUser(user);
	};
	const setOrderIdFun = (orderId: string) => {
		setOrderId(orderId);
	};

	return (
		<UserContext.Provider
			value={{
				user: user ?? null,
				setUserFun,
				userFromFireStore,
				confirmedOrders: confirmedOrderList,
				setConfirmedOrderList,
				loading,
				setUserFromFireStore,
				setOrderIdFun,
				orderId,
			}}>
			{children}
		</UserContext.Provider>
	);
}
