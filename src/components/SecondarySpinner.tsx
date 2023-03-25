type Props = {};
export default function SecondarySpinner({}: Props) {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900'></div>
		</div>
	);
}
