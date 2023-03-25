import { createContext } from 'react';
import { User, UserProfile } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { ConfirmedOrderInfo } from './UserProvider';

export default createContext(
	{} as {
		user: User | null;
		setUserFun: (user: User | null) => void;
		userFromFireStore: DocumentData;
		confirmedOrders: ConfirmedOrderInfo[] | null;
		setConfirmedOrderList: (
			value: React.SetStateAction<ConfirmedOrderInfo[] | null>
		) => void;
		loading: boolean;
		setUserFromFireStore: (value: UserProfile) => void;
		setOrderIdFun: (orderId: string) => void;
		orderId: string;
	}
);
