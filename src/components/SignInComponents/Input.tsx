import {
	ForwardedRef,
	Ref,
	forwardRef,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';

type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, Props>(
	({ type, label, ...otherProps }, ref) => {
		return (
			<div className='mb-6'>
				<label
					htmlFor={type}
					className='block mb-2 text-sm text-gray-700 dark:text-gray-400'>
					{label}
				</label>
				<input
					required
					ref={ref}
					type={type}
					name={type}
					id={type}
					{...otherProps}
					className='w-full input px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 '
				/>
			</div>
		);
	}
);
export default Input;
