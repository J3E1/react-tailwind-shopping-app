import { ReactNode } from 'react';

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
	return <div className='mt-16'>{children}</div>;
}
