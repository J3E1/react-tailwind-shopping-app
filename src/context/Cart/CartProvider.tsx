import React, { useReducer } from 'react';

import CartContext from './CartContext';

const defaultCartState: DefaultCartState = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
	shipping: 0,
	tax: 0,
};
export function percentage(partialValue: number, totalValue: number): number {
	return Number(((totalValue * partialValue) / 100).toFixed(2));
}

const cartReducer = (state: DefaultCartState, action: CartPayload) => {
	switch (action.type) {
		case 'ADD': {
			const existingCartItemIndex = state.items.findIndex(
				item => item.id === action.payload.id
			);
			const existingCartItem = state.items[existingCartItemIndex];

			let updatedItems;

			if (existingCartItem) {
				const updatedItem: CartItem = {
					...existingCartItem,
					totalPrice:
						existingCartItem.totalPrice +
						action.payload.quantity * action.payload.price,
					quantity: existingCartItem.quantity + action.payload.quantity,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = state.items.concat(action.payload);
			}
			const updatedTotalQuantity = updatedItems.reduce(
				(acc, item) => acc + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(acc, item) => acc + item.totalPrice,
				0
			);
			const updatedShipping = percentage(30, updatedTotalPrice);
			const updatedTax = percentage(10, updatedTotalPrice);

			return {
				items: updatedItems,
				totalQuantity: updatedTotalQuantity,
				totalPrice: Number(updatedTotalPrice.toFixed(2)),
				shipping: Number(updatedShipping),
				tax: Number(updatedTax),
			};
		}
		case 'INCREMENT': {
			const existingCartItemIndex = state.items.findIndex(
				item => item.id === action.payload
			);
			const existingCartItem = state.items[existingCartItemIndex];
			existingCartItem.quantity++;
			existingCartItem.totalPrice =
				existingCartItem.price * existingCartItem.quantity;
			const updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = existingCartItem;

			const updatedTotalQuantity = updatedItems.reduce(
				(acc, item) => acc + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(acc, item) => acc + item.totalPrice,
				0
			);
			const updatedShipping = percentage(30, updatedTotalPrice);
			const updatedTax = percentage(10, updatedTotalPrice);

			return {
				items: updatedItems,
				totalQuantity: updatedTotalQuantity,
				totalPrice: Number(updatedTotalPrice.toFixed(2)),
				shipping: Number(updatedShipping),
				tax: Number(updatedTax),
			};
		}
		case 'DECREMENT': {
			const existingCartItemIndex = state.items.findIndex(
				item => item.id === action.payload
			);
			const existingCartItem = state.items[existingCartItemIndex];
			existingCartItem.quantity--;
			existingCartItem.totalPrice =
				existingCartItem.price * existingCartItem.quantity;
			const updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = existingCartItem;

			const updatedTotalQuantity = updatedItems.reduce(
				(acc, item) => acc + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(acc, item) => acc + item.totalPrice,
				0
			);
			const updatedShipping = percentage(30, updatedTotalPrice);
			const updatedTax = percentage(10, updatedTotalPrice);

			return {
				items: updatedItems,
				totalQuantity: updatedTotalQuantity,
				totalPrice: Number(updatedTotalPrice.toFixed(2)),
				shipping: Number(updatedShipping),
				tax: Number(updatedTax),
			};
		}

		case 'REMOVE': {
			const existingCartItemIndex = state.items.findIndex(
				item => item.id === action.payload
			);
			const updatedItems = [...state.items];
			updatedItems.splice(existingCartItemIndex, 1);

			const updatedTotalQuantity = updatedItems.reduce(
				(acc, item) => acc + item.quantity,
				0
			);
			const updatedTotalPrice = updatedItems.reduce(
				(acc, item) => acc + item.totalPrice,
				0
			);
			const updatedShipping = percentage(30, updatedTotalPrice);
			const updatedTax = percentage(10, updatedTotalPrice);

			return {
				items: updatedItems,
				totalQuantity: updatedTotalQuantity,
				totalPrice: Number(updatedTotalPrice.toFixed(2)),
				shipping: Number(updatedShipping),
				tax: Number(updatedTax),
			};
		}
		default:
			return state;
	}
};

type Props = { children: React.ReactNode };
export default function CartProvider({ children }: Props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const value: CartContext = {
		...cartState,
		addToCart: (item: CartItem) => {
			dispatchCartAction({ type: 'ADD', payload: item });
		},
		removeFromCart: (id: string) => {
			dispatchCartAction({ type: 'REMOVE', payload: id });
		},
		increaseItem(id) {
			dispatchCartAction({ type: 'INCREMENT', payload: id });
		},
		decreaseItem(id) {
			dispatchCartAction({ type: 'DECREMENT', payload: id });
		},
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
