import { FormEvent, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	createAuthUserWithEmailAndPassword,
	createUserInFireStore,
} from '../../utils/firebaseConfig';
import ButtonBlack from '../components/ButtonBlack';
import IconGoogle from '../components/IconGoogle';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import GAuthButton from '../components/SignInComponents/GAuthButton';
import Heading from '../components/SignInComponents/Heading';
import Input from '../components/SignInComponents/Input';
import ProductContext from '../context/products/ProductContext';
import UserContext from '../context/User/UserContext';

type Props = {};
export default function SignUpPage({}: Props) {
	const userNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const { setUserFun } = useContext(UserContext);
	const { setIsLoadingState, isLoading } = useContext(ProductContext);
	const navigate = useNavigate();

	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoadingState(true);
		const userName = userNameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passRef.current?.value;

		if (email && password && userName) {
			const res = await createAuthUserWithEmailAndPassword(
				email,
				password,
				userName
			);
			// setUserFun(res.user);
			const userRef = await createUserInFireStore(res.user);
			navigate('/');
		}
		setIsLoadingState(false);
	};
	if (isLoading) return <LoadingSpinner />;
	return (
		<>
			<div className='flex items-center min-h-[70vh] bg-transparent'>
				<div className='container mx-auto'>
					<div className='max-w-md mx-auto my-10'>
						<Heading
							head='Sign Up'
							para='Sign Up to get access to our services'
						/>
						<div className='m-7'>
							<form onSubmit={formSubmitHandler}>
								<Input
									ref={userNameRef}
									type='text'
									label='User Name'
									placeholder='Enter Your User Name'
								/>
								<Input
									ref={emailRef}
									type='email'
									label='Email Address'
									placeholder='you@company.com'
								/>
								<Input
									ref={passRef}
									type='password'
									label='Password'
									placeholder='Your Password'
								/>

								<div className='mb-3'>
									<ButtonBlack bgColor='white'>Sign Up</ButtonBlack>
								</div>
								<div className='mb-6'>
									<GAuthButton />
								</div>
								<p className='text-sm text-center text-gray-400'>
									Already have an account?{' '}
									<Link
										to='/signIn'
										className='text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800'>
										Sign In
									</Link>
									.
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
