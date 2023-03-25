import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SideBarContext } from '../context/SideBarContext';

type Props = { children: React.ReactNode; link: string; sideBar?: boolean };
export default function NavBarLink({ children, link, sideBar = false }: Props) {
	const { toggleSideBar } = useContext(SideBarContext);
	return (
		<NavLink
			to={`${link}`}
			onClick={() => {
				sideBar && toggleSideBar();
			}}
			className={`${
				sideBar ? 'flex items-center' : ''
			} btn btn-ghost normal-case text-md`}>
			{children}
		</NavLink>
	);
}
