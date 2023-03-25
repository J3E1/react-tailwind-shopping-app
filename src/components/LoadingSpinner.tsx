import styles from './LoadingSpinner.module.css';

type Props = {};
export default function LoadingSpinner({}: Props) {
	return (
		<>
			<div className='fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-40 flex justify-center items-center'>
				<span className={styles.loader}></span>
			</div>
		</>
	);
}
