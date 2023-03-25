import { Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import ButtonBlack from '../components/ButtonBlack';
import CartItem from '../components/CartItem';
import ProfileCartItems from '../components/ProfileCartItems';
import ProfilePageUserInfo from '../components/ProfilePageUserInfo';
import UserContext from '../context/User/UserContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';

type Props = {};
export default function ProfilePage({}: Props) {
	// const { cartItem } = useShoppingCart();
	// const { user, confirmedOrders } = useContext(UserContext);
	// console.log(
	// 	'🚀 ~ file: ProfilePage.tsx:13 ~ ProfilePage ~ confirmedOrders:',
	// 	confirmedOrders
	// );
	// const createdAt = { seconds: 1677847838, nanoseconds: 807000000 };
	// const timeField = new Timestamp(createdAt.seconds, createdAt.nanoseconds);
	// console.log(
	// 	'🚀 ~ file: ProfilePage.tsx:19 ~ ProfilePage ~ timeField:',
	// 	timeField.toDate().toLocaleString('en-GB', { hour12: true })
	// );

	return (
		<div className='mt-40  flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-2xl rounded-lg '>
			<div className='m-6'>
				<ProfilePageUserInfo />
			</div>
		</div>
	);
}
// {
// 	confirmedOrders?.cartItem && confirmedOrders.cartItem.length !== 0 ? (
// 		<>
// 			<h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 px-4'>
// 				My Orders
// 			</h3>
// 			<div className=' '>
// 				<p className='leading-normal mb-2 text-blueGray-700 px-4'>
// 					{confirmedOrders.createdAt?.toDateString()}
// 				</p>
// 				<div className='w-full px-4'>
// 					<div className='flex flex-col justify-end' id='cart'>
// 						{confirmedOrders.cartItem.map(item => (
// 							<ProfileCartItems key={item.id} item={item} />
// 						))}
// 						{/* </div> */}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	) : (
// 		<h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 px-4'>
// 			You have no confirmed orders.
// 		</h3>
// 	);
// }
