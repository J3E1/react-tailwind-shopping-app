import { SideBarContext } from './SideBarContext';
import React, { useState } from 'react';

type Props = { children: React.ReactNode };
const SideBarProvider = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [profileSideBarIsOpen, setProfileSideBarIsOpen] = useState(false);
	const [cartSideBarIsOpen, setCartSideBarIsOpen] = useState(false);

	const toggleSideBar = () => setIsOpen(prevState => !prevState);
	const toggleProfileSideBar = () =>
		setProfileSideBarIsOpen(prevState => !prevState);
	const toggleCartSideBar = () => setCartSideBarIsOpen(prevState => !prevState);
	const setSideBarOpen = () => setCartSideBarIsOpen(true);
	return (
		<SideBarContext.Provider
			value={{
				isOpen,
				profileSideBarIsOpen,
				cartSideBarIsOpen,
				toggleSideBar,
				toggleProfileSideBar,
				toggleCartSideBar,
				setSideBarOpen,
			}}>
			{children}
		</SideBarContext.Provider>
	);
};

export default SideBarProvider;
