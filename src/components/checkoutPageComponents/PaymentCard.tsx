import { CardElement } from '@stripe/react-stripe-js';

type Props = {};
export default function PaymentCard({}: Props) {
	return (
		<div className='flex border-b border-gray-200 h-12 py-3 items-center '>
			<CardElement className='focus:outline-none px-3 w-full' />
		</div>
	);
}
