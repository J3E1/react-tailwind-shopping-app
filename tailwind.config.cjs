/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				bump: {
					'0%': { scale: '1' },
					'10%': { scale: '0.98' },
					'30%': { scale: '1.1' },
					'50%': { scale: '1.25' },
					'100%': { scale: '1' },
				},
			},
			animation: {
				bump: 'bump 200ms ease-in-out',
			},
		},
	},
	plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
