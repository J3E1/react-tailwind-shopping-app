import { ButtonHTMLAttributes, HtmlHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	// children: React.ReactNode;
	// onClick?: () => void;
	bgColor?: 'white' | 'gray';
	// className?: string;
	// submit?: boolean;
}
export default function ButtonBlack({
	children,
	className,
	bgColor,
	...otherProps
}: Props) {
	return (
		<button
			{...otherProps}
			className={`w-full ${
				bgColor === 'white' ? 'hover:bg-white' : 'hover:bg-gray-100'
			} btn rounded-sm hover:text-slate-900 active:bg-slate-900 active:text-gray-100 ${className}`}>
			{children}
		</button>
	);

	// return (
	// 	<button
	// 		type={submit ? 'submit' : 'button'}
	// 		onClick={() => onClick && onClick()}
	// 		className={`text-base leading-none w-full py-4 bg-gray-800 active:bg-gray-800 active:text-white ${
	// 			type === 'buy' ? 'hover:bg-white' : 'hover:bg-gray-100'
	// 		} hover:text-gray-800 hover:border-gray-800 text-white border focus:outline-none transition-colors duration-200 ${className}`}>
	// 		{children}
	// 	</button>
	// );
}
