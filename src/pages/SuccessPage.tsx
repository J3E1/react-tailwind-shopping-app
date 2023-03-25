import { useContext } from 'react';
import ContentBox from '../components/ContentBox';
import UserContext from '../context/User/UserContext';

type Props = {
	errorCode: string;
	message: string;
	title: string;
	orderId: string;
};
export default function SuccessPage({}: {}) {
	const { orderId } = useContext(UserContext);
	const content: Props = {
		errorCode: '🎉',
		title: 'Your Order has been successfully confirmed',
		message: 'Thank you for shopping with us.',
		orderId,
	};

	return (
		<div className='bg-gradient-to-r from-[#D4145A] to-[#FBB03B]'>
			<div className='w-9/12 m-auto py-16 min-h-screen flex items-center justify-center'>
				<ContentBox {...content} />
			</div>
		</div>
	);
}
