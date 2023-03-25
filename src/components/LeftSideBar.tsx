import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import { linksArray } from './NavBar';
import NavBarLink from './NavBarLink';

type Props = {};
export default function LeftSideBar({}: Props) {
	const { isOpen, toggleSideBar } = useContext(SideBarContext);
	return (
		<div
			className={`${
				isOpen ? 'left-0' : '-left-full'
			} w-[80vw] bg-base-300 fixed lg:hidden top-0 h-full shadow-2xl sm:w-[70vw] md:w-[35vw] xl:max-w-[30vw] transition-all duration-200 z-30 lg:px-[35px]`}>
			<div className='container flex justify-between items-center'>
				<button
					className='btn btn-square btn-outline rounded -mr-25 m-2'
					onClick={() => toggleSideBar()}>
					<svg
						viewBox='0 0 512 512'
						className='h-6 w-6'
						fill='none'
						stroke='currentColor'>
						<path
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={48}
							d='M244 400L100 256l144-144M120 256h292'
						/>
					</svg>
				</button>
				<h2 className='mr-10 font-bold text-lg'>Menu</h2>
			</div>
			<div className='container'>
				<ul className='menu menu-versicle px-1 gap-4'>
					<li>
						<NavBarLink sideBar={true} link={'/'}>
							Home
						</NavBarLink>
					</li>
					<li>
						<NavBarLink sideBar={true} link={'/About'}>
							About
						</NavBarLink>
					</li>
					<li>
						<NavBarLink sideBar={true} link={'/Contact'}>
							Contact
						</NavBarLink>
					</li>
				</ul>
			</div>
		</div>
	);
}
