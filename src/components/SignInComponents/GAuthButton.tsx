import { UserCredential } from 'firebase/auth';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	createUserInFireStore,
	signInWithGooglePopup,
} from '../../../utils/firebaseConfig';
import UserContext from '../../context/User/UserContext';
import IconGoogle from '../IconGoogle';

type Props = {};
export default function GAuthButton({}: Props) {
	const { setUserFun } = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation();

	const onClickHandler = async () => {
		try {
			const res = await signInWithGooglePopup();

			setUserFun(res.user);
			const userRef = await createUserInFireStore(res.user);
			navigate('/');
		} catch (error) {
			console.log(
				'🚀 ~ file: GAuthButton.tsx:12 ~ onClickHandler ~ error:',
				error
			);
		}
	};

	return (
		<button
			onClick={onClickHandler}
			className='btn btn-outline w-full rounded-sm hover:bg-neutral '
			type='button'>
			Sign {location.pathname === '/signIn' ? 'In' : 'Up'} with google
			<IconGoogle className='h-6 w-6 ml-4' />
		</button>
	);
}
