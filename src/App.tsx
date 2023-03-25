import { useContext, useReducer } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

import NavFoot from './components/NavFoot';
import ProtectedRoute from './components/ProtectedRoute';
import MainProvider from './context/MainProvider';
import ProductContext from './context/products/ProductContext';

import AboutPage from './pages/AboutPage';
import AllProducts from './pages/AllProducts';
import CategoryPage from './pages/CategoryPage';
import CheckOutPage from './pages/CheckOutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

import ReactIcon from '../src/assets/react.svg';
import Modal from './components/Modal';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './pages/ErrorPage';
import WithoutNav from './components/WithoutNav';
import WithNavBar from './components/WithNavBar';
import SuccessPage from './pages/SuccessPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/OrderListPage';

// const enum REDUCER_ACTION_TYPE {
// 	INCREMENT,
// 	DECREMENT,
// }
// type ReducerAction = { type: REDUCER_ACTION_TYPE };

// const initState = {
// 	count: 0,
// };

// const reducer = (
// 	state: typeof initState,
// 	action: ReducerAction
// ): typeof initState => {
// 	switch (action.type) {
// 		case REDUCER_ACTION_TYPE.INCREMENT:
// 			return { ...state, count: state.count++ };
// 		case REDUCER_ACTION_TYPE.DECREMENT:
// 			return { ...state, count: state.count-- };

// 		default:
// 			throw new Error('Invalid action type');
// 	}
// };

function App() {
	// const { isLoading } = useContext(ProductContext);
	// if (isLoading) return <LoadingSpinner />;
	// const [state, dispatch] = useReducer(reducer, initState);

	// const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });

	return (
		<>
			{/* <Modal /> */}
			<MainProvider>
				<div className='flex flex-col justify-between h-screen items-center'>
					{/* <NavBar />
					<LeftSideBar />
					<CartSideBar /> */}
					{/* <img src={ReactIcon} style={{ height: '50px', width: '50px' }} /> */}
					{/* <NavFoot> */}
					{/* <main className='container mx-auto my-auto'> */}
					<Routes>
						{/* <Route path='/' element={<HomePage />} />
								<Route path='/Home' element={<Navigate to='/' replace />} />
								<Route path='/About' element={<AboutPage />} />
								<Route path='/Contact' element={<ContactPage />} />
								<Route path='/products' element={<AllProducts />} />
								<Route path='/product/:id' element={<ProductDetailPage />} />
								<Route path='/category/:type' element={<CategoryPage />} />
								<Route path='/signIn' element={<SignInPage />} />
								<Route path='/signUp' element={<SignUpPage />} />
								<Route path='/checkout' element={<ProtectedRoute />}>
									<Route path='/checkout' element={<CheckOutPage />} />
								</Route>
								<Route path='/*' element={<ErrorPage />} /> */}

						<Route element={<WithoutNav />}>
							<Route path='/signIn' element={<SignInPage />} />
							<Route path='/signUp' element={<SignUpPage />} />
							<Route path='/checkout' element={<ProtectedRoute />}>
								<Route path='/checkout' element={<CheckOutPage />} />
							</Route>
							<Route path='/success' element={<ProtectedRoute />}>
								<Route path='/success' element={<SuccessPage />} />
							</Route>
							{/* <Route
									path='/checkout/payment'
									element={<PaymentConfirmationPage />}
								/> */}
							<Route path='/*' element={<ErrorPage />} />
						</Route>

						<Route element={<WithNavBar />}>
							<Route path='/' element={<HomePage />} />
							<Route path='/Home' element={<Navigate to='/' replace />} />
							<Route path='/About' element={<AboutPage />} />
							<Route path='/Contact' element={<ContactPage />} />
							<Route path='/products' element={<AllProducts />} />
							<Route path='/product/:id' element={<ProductDetailPage />} />
							<Route path='/category/:type' element={<CategoryPage />} />
							<Route path='/profile' element={<ProtectedRoute />}>
								<Route path='/profile' element={<ProfilePage />} />
								<Route path='order-list' element={<OrderListPage />} />
							</Route>
						</Route>
					</Routes>
					{/* </main> */}
					{/* </NavFoot> */}
					{/* <Footer /> */}
				</div>
			</MainProvider>
			<ToastContainer />
		</>
	);
}

export default App;
