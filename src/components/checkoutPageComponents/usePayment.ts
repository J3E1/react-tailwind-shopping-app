import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
	Address,
	BillingDetails,
	PayButtonAddress,
	PaymentIntentResult,
	PaymentMethodCreateParams,
	StripeCardElement,
} from '@stripe/stripe-js';
import { useContext, useState } from 'react';
import UserContext from '../../context/User/UserContext';
import { useShoppingCart } from '../../context/WDS/ShoppingCartContext';

const ifValidCardElement = (
	card: StripeCardElement | null
): card is StripeCardElement => card !== null;

export type PaymentData = {
	address: string;
	city: string;
	country: string;
	email: string;
	name: string;
	postalCode: string;
	state: string;
	currency: string;
	amount: number;
};
type Props = {
	paymentData: PaymentData;
};
export default function usePayment() {
	const stripe = useStripe();
	const elements = useElements();
	// const [response, setResponse] = useState<PaymentIntentResult>();
	const paymentHandler = async (paymentData: PaymentData) => {
		if (!stripe || !elements) return;

		const response: PaymentIntentResult = await fetch(
			'/.netlify/functions/create-payment-intent',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(paymentData),
			}
		).then(res => res.json());

		const { paymentIntent } = response;
		const billingDetails: PaymentMethodCreateParams.BillingDetails = {
			name: paymentIntent?.shipping?.name as string,
			address: paymentIntent?.shipping
				?.address as PaymentMethodCreateParams.BillingDetails.Address,
		};
		const client_secret = paymentIntent?.client_secret;

		const cardElement = elements.getElement(CardElement);

		if (!ifValidCardElement(cardElement)) return;
		const paymentResult = await stripe.confirmCardPayment(
			client_secret as string,
			{
				payment_method: {
					card: cardElement,
					billing_details: billingDetails,
				},
			}
		);
		if (paymentResult.error) {
			return paymentResult.error;
		} else if (paymentResult.paymentIntent.status === 'succeeded') {
			console.log('Payment done Successfully');
			return paymentResult.paymentIntent;
		}
	};
	return { paymentHandler };
}
