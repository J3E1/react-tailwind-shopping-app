import Layout from '../components/Layout';

type Props = {};
export default function AboutPage({}: Props) {
	return (
		<div className='bg-transparent text-gray-900'>
			<div className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
				<div className='md:flex md:items-center md:justify-between'>
					<div>
						<h2 className='text-3xl font-bold leading-tight md:text-4xl'>
							About Us
						</h2>
						<p className='mt-4 text-md'>
							At RizzShop, we are dedicated to providing a vast selection of
							high-quality products to customers all over the world. Whether
							you're looking for electronics, fashion, home goods, or something
							else entirely, we have something for everyone.
						</p>
						<p className='mt-4 text-md'>
							Our team of experienced developers and designers work tirelessly
							to ensure that our website is easy to use, visually appealing, and
							packed with useful features to make your shopping experience as
							seamless as possible. We are committed to providing exceptional
							customer service and ensuring that every customer is satisfied
							with their purchase.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
