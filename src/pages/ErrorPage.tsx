import { Link } from 'react-router-dom';
import ContentBox from '../components/ContentBox';

type Props = { errorCode: number; message: string; title: string };
export default function ErrorPage({}: {}) {
	const content: Props = {
		errorCode: 404,
		title: 'oops! Page not found',
		message:
			'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
	};

	return (
		<div className='bg-gradient-to-r from-gray-50 to-gray-400'>
			<div className='w-9/12 m-auto py-16 min-h-screen flex items-center justify-center'>
				<ContentBox {...content} />
			</div>
		</div>
	);
}
