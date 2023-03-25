type Props = {};
export default function Modal({}: Props) {
	const lable = (
		<label htmlFor='my-modal-4' className='btn'>
			open modal
		</label>
	);

	return (
		<>
			<input type='checkbox' id='my-modal-4' className='modal-toggle' />
			<label htmlFor='my-modal-4' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>
						Congratulations random Internet user!
					</h3>
				</label>
			</label>
		</>
	);
}
