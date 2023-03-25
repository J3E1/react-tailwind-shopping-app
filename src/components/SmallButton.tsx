type Props = {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function SmallButton({ children, onClick }: Props) {
	return (
		<button
			className='btn btn-sm font-bold rounded-none'
			onClick={e => onClick && onClick(e)}>
			{children}
		</button>
	);
}
