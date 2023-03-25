import { PaymentElement } from '@stripe/react-stripe-js';

type Props = {};
export default function CheckOutForm({}: Props) {
	return (
		<div>
			<PaymentElement />
		</div>
	);
}
