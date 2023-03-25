import { Link } from 'react-router-dom';

type Props = {
	errorCode: number | string;
	message: string;
	title: string;
	orderId?: string;
};
export default function ContentBox({
	errorCode,
	message,
	title,
	orderId,
}: Props) {
	return (
		<div className='bg-white shadow-lg overflow-hidden sm:rounded-lg'>
			<div className='border-t border-gray-200 text-center py-8 px-10'>
				<h1 className='text-9xl font-bold text-neutral-focus'>{errorCode}</h1>
				<h1 className='text-6xl font-medium py-8'>{title}</h1>
				<p className='text-2xl pb-8 px-12 font-medium'>{message}</p>
				{orderId && (
					<p className='text-xl pb-8 px-12 font-normal'>
						Your OrderID : {orderId}
					</p>
				)}
				<Link
					to='/'
					className='btn btn-outline rounded-sm active:bg-neutral active:text-gray-100 mr-4'>
					HOME
				</Link>
				<Link
					to='/Contact'
					className=' btn rounded-sm text-white hover:bg-gray-50 hover:text-slate-900 active:bg-neutral-focus active:text-gray-100'>
					Contact Us
				</Link>
			</div>
		</div>
	);
}
