import { User } from '@firebase/auth';
import ButtonBlack from './ButtonBlack';
import {
	signOutFun,
	updatePhotoUrl,
	updateProfilePhotoTofirebase,
	updateUserProfile,
} from '../../utils/firebaseConfig';
import { useContext, useRef, useState } from 'react';
import ProductContext from '../context/products/ProductContext';
import { CartItem, useShoppingCart } from '../context/WDS/ShoppingCartContext';
import UserContext from '../context/User/UserContext';
import SecondarySpinner from './SecondarySpinner';
import { toast } from 'react-toastify';
export type ProfileInfo = {
	displayName: string;
	gender: string;
	email: string;
	contactNo: string;
	address: string;
	city: string;
	state: string;
	country: string;
};
type Props = {};
export default function ProfilePageUserInfo({}: Props) {
	const { setIsLoadingState } = useContext(ProductContext);
	const { cartQuantity, setCartItemFun } = useShoppingCart();
	const {
		setUserFun,
		user,
		userFromFireStore,
		confirmedOrders,
		setUserFromFireStore,
	} = useContext(UserContext);
	// console.log(
	// 	'🚀 ~ file: ProfilePageUserInfo.tsx:23 ~ ProfilePageUserInfo ~ userFromFireStore:',
	// 	userFromFireStore
	// );

	const signOut = async () => {
		setIsLoadingState(true);
		// debugger;
		await signOutFun();
		setUserFun(null);
		setCartItemFun([]);
		setIsLoadingState(false);
	};
	const [editing, setEditing] = useState(false);
	const [displayName, setDisplayName] = useState(
		userFromFireStore?.displayName || ''
	);
	const [gender, setGender] = useState(userFromFireStore?.gender || '');
	const [email, setEmail] = useState(userFromFireStore?.email || '');
	const [contactNo, setContactNo] = useState(
		userFromFireStore?.contactNo || ''
	);
	const [address, setAddress] = useState(userFromFireStore?.address || '');
	const [city, setCity] = useState(userFromFireStore?.city || '');
	const [state, setState] = useState(userFromFireStore?.state || '');
	const [country, setCountry] = useState(userFromFireStore?.country || '');

	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleProfilePictureClick = async () => {
		const file = fileInputRef.current?.files?.[0];
		if (file && user) {
			console.log('Started');
			const url = (await updatePhotoUrl(user.uid, file)) as string;
			setUserFun({ ...user, photoURL: url });
			await updateProfilePhotoTofirebase(user, url);
			toast.success('Profile picture updated successfully');
			// ...upload the file using the Firebase Storage API
			// After the upload is complete, update the profilePictureUrl state with the new URL
		} else {
			toast.warn(
				'Please select a image to upload. P.S. click on the image to upload'
			);
		}
	};

	// const totalItemsOrdered = confirmedOrders
	// 	?.map(item => item.cartItem[0])
	// 	.reduce((acc, item) => item.quantity + acc, 0) as number;

	const totalItemsOrdered = confirmedOrders
		?.map(order => order['cartItem' as keyof typeof order])
		.map(cartItem =>
			(cartItem as CartItem[]).reduce((acc, item) => item.quantity + acc, 0)
		)
		.reduce((acc, quantity) => quantity + acc, 0);

	if (!user) return <h2>User not found</h2>;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editing) {
			const userInfo: ProfileInfo = {
				displayName,
				email,
				gender,
				contactNo,
				address,
				city,
				state,
				country,
			};
			const res = await updateUserProfile(userInfo, user.uid);
			setUserFromFireStore(userInfo);
			toast.success('Profile updated successfully');
			setEditing(false);
		} else {
			setEditing(true);
		}
	};

	const userInfo = (
		<form
			className='bg-white shadow-sm rounded-sm mt-6'
			onSubmit={handleSubmit}>
			<div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8 my-4'>
				<span className='tracking-wide text-lg border-b-2 border-gray-900'>
					About
				</span>
			</div>
			<div className='text-gray-700'>
				<div className='grid md:grid-cols-2 text-sm'>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Name</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your name'
								value={displayName}
								onChange={e => setDisplayName(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{displayName || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Email.</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your Email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						) : (
							<div className='px-4 py-2'>
								<a className='text-blue-800' href={`mailto:${email}`}>
									{email || 'Not provided'}
								</a>
							</div>
						)}
					</div>

					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Gender</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your Gender'
								value={gender}
								onChange={e => setGender(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{gender || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Contact No.</div>
						{editing ? (
							<input
								required
								pattern='[0-9]{10}'
								inputMode='numeric'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your Contact Information'
								value={contactNo}
								onChange={e => setContactNo(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{contactNo || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Address</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your Address'
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{address || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>City</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your City Name'
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{city || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>State</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your State Name'
								value={state}
								onChange={e => setState(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{state || 'Not provided'}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2'>
						<div className='px-4 py-2 font-semibold'>Country</div>
						{editing ? (
							<input
								required
								type='text'
								className=' px-4 py-1 shadow-sm outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm'
								placeholder='Enter your Country Name'
								value={country}
								onChange={e => setCountry(e.target.value)}
							/>
						) : (
							<span className='text-gray-600 px-4 py-2'>
								{country || 'Not provided'}
							</span>
						)}
					</div>
				</div>
			</div>
			<button className='block w-full text-blue-800 text-sm font-semibold rounded-sm hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4'>
				Edit Profile
			</button>
		</form>
	);

	return (
		<>
			<div className='flex flex-wrap justify-around  '>
				<div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
					<div className='h-40 w-40 lg:h-60 lg:w-60 -mt-20'>
						<label htmlFor='profile-picture-input'>
							<img
								src={
									user.photoURL ||
									'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
								}
								className='avatar rounded-full h-40 w-40 lg:h-56 lg:w-56 object-cover'
							/>
							<input
								type='file'
								accept='image/*'
								id='profile-picture-input'
								ref={fileInputRef}
								style={{ display: 'none' }}
							/>
						</label>
					</div>
				</div>
				<div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex justify-center lg:justify-end'>
					<div className='py-6 px-3  sm:mt-0'>
						<button
							className='btn btn-outline h-full w-full rounded-sm'
							//  onClick={signOut}
							onClick={handleProfilePictureClick}>
							Update Profile Picture
						</button>
					</div>
				</div>
				<div className='w-full lg:w-4/12 px-4 lg:order-1 flex justify-center items-center'>
					<div className='flex justify-center py-4 lg:pt-4 pt-8'>
						{/* <div className='mr-4 p-3 text-center'>
							<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
								22
							</span>
							<span className='text-sm text-blueGray-400'>Friends</span>
						</div>
						<div className='mr-4 p-3 text-center'>
							<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
								10
							</span>
							<span className='text-sm text-blueGray-400'>Photos</span>
						</div>*/}
						<div className='lg:mr-4 p-3 text-center'>
							<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
								{totalItemsOrdered}
							</span>
							<span className='text-sm text-blueGray-400'>
								Total items ordered
							</span>
						</div>
						<div className='lg:mr-4 p-3 text-center'>
							<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
								{confirmedOrders?.length}
							</span>
							<span className='text-sm text-blueGray-400'>
								Confirmed Orders
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='mx-8 mt-6 '>
				<h3 className='text-4xl font-semibold leading-normal mb-2 space-x-2 flex items-center'>
					<span>
						<svg
							className='h-8 '
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
							/>
						</svg>
					</span>
					{user.displayName}
				</h3>
				<div className='text-lg leading-normal mb-2 text-gray-400 font-semibold flex items-center pl-2'>
					<svg viewBox='0 0 24 24' fill='currentColor' className='h-4 mr-2'>
						<path d='M18.73 5.41l-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 002 7.05v11.59A1.36 1.36 0 003.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0022 18.64V7.05a2 2 0 00-3.27-1.64z' />
					</svg>
					{user.email}
				</div>
				{/* <div className='mb-2 text-blueGray-600 mt-10'>
					<i className='fas fa-briefcase mr-2 text-lg text-blueGray-400'></i>
					Solution Manager - Creative Tim Officer
				</div>
				<div className='mb-2 text-blueGray-600'>
					<i className='fas fa-university mr-2 text-lg text-blueGray-400'></i>
					University of Computer Science
				</div> */}
				{!userFromFireStore ? <SecondarySpinner /> : userInfo}
			</div>
		</>
	);
}
