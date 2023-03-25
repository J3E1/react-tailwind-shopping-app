import ShoppingCart from '../ShoppingCart';

type Props = {};
export default function RightSideBar({}: Props) {
	return (
		<div className='col-span-2 bg-white lg:block hidden h-screen'>
			<div
				className={`bg-base-300 h-full w-full transition-all duration-200 overflow-hidden`}>
				<div className='container flex justify-start items-center'>
					<h2 className='self-start font-bold text-xl my-6 ml-10'>Your Cart</h2>
				</div>

				<ShoppingCart checkoutPage={true} />
				{/* </div> */}
			</div>
		</div>
	);
}
