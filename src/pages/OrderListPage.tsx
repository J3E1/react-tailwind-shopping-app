import { Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import ProfileCartItems from '../components/ProfileCartItems';
import UserContext from '../context/User/UserContext';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';

const getDateFromTimeStamp = (createdAt: {
	seconds: number;
	nanoseconds: number;
}) =>
	new Timestamp(createdAt.seconds, createdAt.nanoseconds)
		.toDate()
		.toLocaleString('en-GB', { hour12: true });

type Props = {};
export default function OrderListPage({}: Props) {
	const { cartItem } = useShoppingCart();
	const { user, confirmedOrders } = useContext(UserContext);
	return (
		<div className='mt-10 py-10  border-blueGray-200 '>
			{confirmedOrders && confirmedOrders.length !== 0 ? (
				<>
					<h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 px-4'>
						My Orders
					</h3>
					<div className='my-4 '>
						{confirmedOrders.map((order, i) => (
							<div key={i}>
								<div className='flex flex-wrap justify-between'>
									<p className='text-lg font-semibold mb-2 text-blueGray-700 px-4'>
										{getDateFromTimeStamp(order.createdAt)}
									</p>
									<p className='text-lg mb-2 text-blueGray-700 px-4'>
										OrderId: {order.orderid}
									</p>
								</div>
								<div className='w-full px-4'>
									<div className='flex flex-col justify-end' id='cart'>
										{order.cartItem.map(item => (
											<ProfileCartItems key={item.id} item={item} />
										))}
										{/* </div> */}
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 px-4'>
					You have no confirmed orders.
				</h3>
			)}
		</div>
	);
}
