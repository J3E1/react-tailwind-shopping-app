import React, { createContext, useState } from 'react';

export const SideBarContext = createContext({
	isOpen: false,
	toggleSideBar: () => {},
	profileSideBarIsOpen: false,
	cartSideBarIsOpen: false,
	toggleProfileSideBar: () => {},
	toggleCartSideBar: () => {},
	setSideBarOpen: () => {},
});
