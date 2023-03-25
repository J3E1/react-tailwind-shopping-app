type Props = { head: string; para: string };
export default function Heading({ head, para }: Props) {
	return (
		<div className='text-center'>
			<h1 className='my-3 text-3xl font-semibold text-gray-600 dark:text-gray-400'>
				{head}
			</h1>
			<p className='text-gray-400 dark:text-gray-200'>{para}</p>
		</div>
	);
}
