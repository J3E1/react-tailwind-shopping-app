type Props = {};
export default function CarouselImage({
	id,
	src,
}: {
	id: string;
	src: string;
}) {
	const lastNumId = Number(id.slice(-1));

	const prevSlide = lastNumId === 1 ? 4 : lastNumId - 1;
	const nextSlide = lastNumId === 4 ? 1 : lastNumId + 1;

	return (
		<div id={id} className='carousel-item relative w-full'>
			<img src={src} className='w-full' />
			<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
				<a href={`#slide${prevSlide}`} className='btn btn-circle'>
					❮
				</a>
				<a href={`#slide${nextSlide}`} className='btn btn-circle'>
					❯
				</a>
			</div>
		</div>
	);
}
