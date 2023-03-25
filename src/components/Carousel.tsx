import CarouselImage from './CarouselImage';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

type Props = { heading?: string };

export default function Carousel({ heading }: Props) {
	return (
		<div className='h-[60vh] mb-16'>
			<Swiper
				className='h-full'
				modules={[Autoplay, Navigation, Pagination]}
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				navigation={true}
				pagination={{ clickable: true }}
				loop={true}
				speed={1000}
				centeredSlides={true}
				spaceBetween={0}
				slidesPerView={1}>
				<SwiperSlide>
					<div
						style={{
							background: `url('https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80') center no-repeat`,
							backgroundSize: 'cover',
						}}
						className='relative w-full h-full '>
						{heading && (
							<p className='absolute bottom-16 left-0 font-semibold max-w-[90%] text-6xl p-4 bg-black/75 text-white'>
								{heading}
							</p>
						)}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						style={{
							background: `url('https://images.unsplash.com/photo-1601924921557-45e6dea0a157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80') center no-repeat`,
							backgroundSize: 'cover',
						}}
						className='relative w-full h-full '>
						{heading && (
							<p className='absolute bottom-16 left-0 font-semibold max-w-[90%] text-6xl p-4 bg-black/75 text-white'>
								{heading}
							</p>
						)}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						style={{
							background: `url('https://images.unsplash.com/photo-1445633814773-e687a5de9baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80') center no-repeat`,
							backgroundSize: 'cover',
						}}
						className='relative w-full h-full '>
						{heading && (
							<p className='absolute bottom-16 left-0 font-semibold max-w-[90%] text-6xl p-4 bg-black/75 text-white'>
								{heading}
							</p>
						)}
						{/* <p className=''>Price</p> */}
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
