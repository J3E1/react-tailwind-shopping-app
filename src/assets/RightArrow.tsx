type Props = {};
export default function RightArrow({}: Props) {
	return (
		<svg
			className='h-6 w-6 inline ml-3'
			fill='none'
			viewBox='0 0 512 512'
			stroke='currentColor'>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={48}
				d='M268 112l144 144-144 144M392 256H100'
			/>
		</svg>
	);
}
