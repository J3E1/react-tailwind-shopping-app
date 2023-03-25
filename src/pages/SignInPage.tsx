import { FormEvent, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonBlack from '../components/ButtonBlack';
import IconGoogle from '../components/IconGoogle';
import Layout from '../components/Layout';
import Heading from '../components/SignInComponents/Heading';
import Input from '../components/SignInComponents/Input';
import {
	signInWithGooglePopup,
	createUserInFireStore,
	signInAuthWithEmailAndPassword,
} from '../../utils/firebaseConfig';
import GAuthButton from '../components/SignInComponents/GAuthButton';
import UserContext from '../context/User/UserContext';
import ProductContext from '../context/products/ProductContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';

type Props = {};
export default function SignInPage({}: Props) {
	const emailRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const { setUserFun } = useContext(UserContext);
	const { setIsLoadingState, isLoading } = useContext(ProductContext);
	const navigate = useNavigate();

	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoadingState(true);

		const email = emailRef.current?.value;
		const password = passRef.current?.value;

		if (email && password) {
			try {
				const userRef = await signInAuthWithEmailAndPassword(email, password);
				setUserFun(userRef.user);
				toast.success('Login Success');
				navigate('/');
			} catch (e) {
				console.error(
					'🚀 ~ file: SignInPage.tsx:41 ~ formSubmitHandler ~ e:',
					e
				);
				// error under useUnknownInCatchVariables
				if (typeof e === 'string') {
					toast.error(e.toUpperCase()); // works, `e` narrowed to string
				} else if (e instanceof FirebaseError) {
					toast.error(e.message);
					// works, `e` narrowed to Error
				}
			}
		}
		setIsLoadingState(false);
	};
	if (isLoading) return <LoadingSpinner />;
	return (
		<>
			<div className='flex items-center min-h-[70vh] bg-transparent'>
				<div className='container mx-auto'>
					<div className='max-w-md mx-auto my-10'>
						<Heading head='Sign In' para='Sign in to access your account' />
						<div className='m-7'>
							<form onSubmit={formSubmitHandler}>
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
									<ButtonBlack bgColor='white'>Sign In</ButtonBlack>
								</div>
								<div className='mb-6'>
									<GAuthButton />
								</div>
								<p className='text-sm text-center text-gray-400'>
									Don&#x27;t have an account yet?{' '}
									<Link
										to='/signUp'
										className='text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800'>
										Sign up
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
