import { PaymentData } from './../../src/components/checkoutPageComponents/usePayment';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { PaymentRequest, AddressParam } from '@stripe/stripe-js';

const STRIPE_SECRET_KEY: string =
	'sk_test_51Mex0ESDtnUpbzirsMxbtIbqaO5bnOGuA074M0HupnldJpGovqcbjmXXbj5eEgg1Sv4m9pSe5U6NHBm4Taujtwyk00v5SLoYq2';
dotenv.config();
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
	typescript: true,
});

interface RequestBody {
	name: string;
	amount: number;
}

exports.handler = async event => {
	try {
		const paymentData: PaymentData = JSON.parse(event.body);
		// console.log(
		// 	'🚀 ~ file: create-payment-intent.ts:22 ~ paymentData:',
		// 	paymentData
		// );

		// const paymentIntent = await stripe.paymentIntents.create({
		// 	amount: amount,
		// 	currency: 'inr',
		// 	payment_method_types: ['card'],
		// 	description: 'Software development services',

		// 	shipping: {
		// 		name: 'Jenny Rosen',
		// 		address: {
		// 			line1: '510 Townsend St',
		// 			postal_code: '98140',
		// 			city: 'San Francisco',
		// 			state: 'CA',
		// 			country: 'US',
		// 		},
		// 	},
		// });

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.trunc(paymentData.amount * 100),
			currency: paymentData.currency,
			payment_method_types: ['card'],
			description: 'Software development services',

			shipping: {
				name: paymentData.name,
				address: {
					line1: paymentData.address,
					postal_code: paymentData.postalCode,
					city: paymentData.city,
					state: paymentData.state,
					country: 'US',
				},
			},
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent }),
			// body: JSON.stringify({ bruh: 'Bruh' }),
		};
	} catch (error) {
		console.log(
			'🚀 ~ file: create-payment-intent.ts:9 ~ exports.handler=async ~ error:',
			error
		);
		return {
			statusCode: 400,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
