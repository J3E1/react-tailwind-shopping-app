import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/WDS/ShoppingCartContext';
import CountrySelect from '../CountrySelect';
import { v4 as uuidv4 } from 'uuid';

import { Suspense, useContext, useState } from 'react';
import PaymentCard from './PaymentCard';

import { PaymentData } from './usePayment';
import usePayment from './usePayment';

import currencySymbols from '../../data/CurrencySymbols';
import ProductContext from '../../context/products/ProductContext';

import { PaymentIntent, StripeError } from '@stripe/stripe-js';

import { toast } from 'react-toastify';
import {
	addCartToUserProfile,
	confirmOrderList,
} from '../../../utils/firebaseConfig';
import UserProvider, {
	ConfirmedOrderInfo,
} from '../../context/User/UserProvider';
import UserContext from '../../context/User/UserContext';
import { User } from 'firebase/auth';

type Props = {};
export default function LeftBar({}: Props) {
	const navigate = useNavigate();
	const [cardIsShown, setCardIsShown] = useState(true);

	const [paymentData, setPaymentData] = useState({
		email: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'USA',
		name: '',
	});
	const {
		cartTotal,
		currency: { code, rate },
		total,
		shipping,
		currSymbol,
		tax,
		cartItem,
		emptyShoppingCart,
	} = useShoppingCart();
	const { user, setConfirmedOrderList, setOrderIdFun } =
		useContext(UserContext);
	const { paymentHandler } = usePayment();
	const { setIsLoadingState } = useContext(ProductContext);
	const { uid } = user as User;

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPaymentData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value.toLocaleLowerCase(),
		}));
	};

	const paymentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userPaymentData: PaymentData = {
			...paymentData,
			currency: code.toLowerCase(),
			amount: +(total * rate).toFixed(2),
			name: capitalizeFirstLatterInName(paymentData.name),
		};
		// console.log(
		// 	'🚀 ~ file: LeftBar.tsx:56 ~ paymentSubmitHandler ~ userPaymentData:',
		// 	userPaymentData
		// );
		if (cardIsShown) {
			const response = await paymentHandler(userPaymentData);
			const paymentIntent = response as PaymentIntent;
			if (paymentIntent) {
				const orderId = uuidv4();
				setOrderIdFun(orderId);
				confirmOrderList(uid, cartItem, cartTotal, orderId);
				emptyShoppingCart();
				toast(paymentIntent.status, { type: 'success' });
				navigate('/success');
			} else {
				const error = response as StripeError;
				if (error) {
					console.log(error.message);
					toast(error.message, { type: 'error' });
				}
			}
			// navigate('payment');
		} else {
			setIsLoadingState(true);
			setTimeout(() => {
				const orderId = uuidv4();
				setOrderIdFun(orderId);
				confirmOrderList(uid, cartItem, cartTotal, orderId);

				emptyShoppingCart();
				setIsLoadingState(false);
				navigate('/success');
				toast('Order Confirmed', { type: 'success' });
			}, 2000);
		}
		// setModalIsShown(true);
		// setIsLoadingState(false);
	};

	const capitalizeFirstLatterInName = (name: string) => {
		return name
			.split(' ')
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(' ');
	};
	const getSelectedValueHandler = (val: string) => {
		const country =
			currencySymbols[val.toUpperCase() as keyof typeof currencySymbols][1];

		setPaymentData(prevState => ({
			...prevState,
			country: country,
		}));
	};
	// const options = Object.values(currencySymbols).map(val => val[1]);
	const options = Object.keys(currencySymbols);

	if (total === 0) navigate('/');
	// if (modalIsShown) return <Modal />;

	return (
		<div className='lg:col-span-3 col-span-5 bg-gray-100 space-y-8 px-12 h-screen border-r-2 border-gray-200 overflow-auto'>
			<div className='mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-sm'>
				<div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
					<div className='text-yellow-500'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 sm:w-5 h-6 sm:h-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
					<div className='text-sm font-semibold ml-3'>Checkout</div>
				</div>
				<div className='text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4'>
					Complete your shipping and payment details below.
				</div>
			</div>
			<form onSubmit={paymentSubmitHandler}>
				<div className='rounded-sm'>
					<section>
						<h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
							Shipping & Billing Information
						</h2>
						<fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600 px-4 py-2 '>
							<label className='xl:w-1/2 xl:inline-flex py-3 items-center flex border-b border-gray-200 '>
								<span className='text-right px-2'>Name</span>
								<input
									onChange={changeHandler}
									name='name'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='Try Odinsson'
									required
								/>
							</label>
							<label className='xl:w-1/2 xl:inline-flex py-3 items-center flex  border-b border-gray-200'>
								<span className='text-right px-2 xl:px-0 xl:text-none'>
									Email
								</span>
								<input
									onChange={changeHandler}
									name='email'
									type='email'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='try@example.com'
									required
								/>
							</label>
							<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
								<span className='text-right px-2'>Address</span>
								<input
									required
									onChange={changeHandler}
									name='address'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='10 Street XYZ 654'
								/>
							</label>
							<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
								<span className='text-right px-2'>City</span>
								<input
									required
									onChange={changeHandler}
									name='city'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='San Francisco'
								/>
							</label>
							<label className='inline-flex w-2/4 border-gray-200 py-3'>
								<span className='text-right px-2'>State</span>
								<input
									required
									onChange={changeHandler}
									name='state'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='CA'
								/>
							</label>
							<label className='xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200'>
								<span className='text-right px-2 xl:px-0 xl:text-none'>
									ZIP
								</span>
								<input
									required
									onChange={changeHandler}
									name='postalCode'
									className='focus:outline-none px-3 bg-transparent'
									placeholder='98603'
									pattern='[0-9]{6}'
									inputMode='numeric'
								/>
							</label>
							<label className='flex border-t border-gray-200 h-12 py-3 items-center'>
								<span className='text-right px-2'>Country</span>
								<div
									id='country'
									className='focus:outline-none px-3 w-full flex items-center'>
									<CountrySelect
										options={options}
										getSelectedValue={getSelectedValueHandler}
										styleClasses='w-full focus:outline-none'
									/>
								</div>
							</label>
						</fieldset>
					</section>
				</div>
				<div className='rounded-md mt-8'>
					<section>
						<h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
							Payment Information
						</h2>
						<fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600 px-4 transition-all duration-100 ease-linear'>
							<label className='flex border-b border-gray-200 h-12 py-3 items-center'>
								<span className='text-right px-2 mr-2'>Select an Option</span>
								<label htmlFor='COD' className='cursor-pointer'>
									COD
								</label>
								<input
									type='radio'
									radioGroup='paymentMethod'
									className='radio radio-xs ml-2'
									id='COD'
									name='paymentMethod'
									onClick={e => setCardIsShown(false)}
								/>
								<label htmlFor='Stripe' className='ml-2 cursor-pointer'>
									Stripe
								</label>
								<input
									type='radio'
									radioGroup='paymentMethod'
									id='Stripe'
									className='radio radio-xs ml-2'
									name='paymentMethod'
									onClick={e => setCardIsShown(true)}
									defaultChecked
								/>
							</label>

							{cardIsShown && <PaymentCard />}
						</fieldset>
					</section>
				</div>
				<button
					type='submit'
					className='btn btn-outline rounded-sm focus:outline-none w-full text-xl font-semibold transition-colors duration-300 mt-6'>
					{cardIsShown
						? `Pay ${currSymbol}${(total * rate).toFixed(2)}`
						: total === 0
						? 'Shop Now'
						: 'Confirm Order'}
				</button>
			</form>
		</div>
	);
}
