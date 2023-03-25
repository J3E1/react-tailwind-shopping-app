import { loadStripe } from '@stripe/stripe-js';

export const configValue: string = import.meta.env
	.VITE_STRIPE_PUBLISHABLE_KEY as string;

export const stripePromise = loadStripe(configValue);
