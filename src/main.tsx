import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';
import { stripePromise } from '../utils/stripePromise';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Elements stripe={stripePromise}>
				<App />
			</Elements>
		</BrowserRouter>
	</React.StrictMode>
);
