/* eslint-disable max-len */
import React from 'react';
import logo from '../../assets/images/logo.png';
const Spinner2 = () => {
	return (
		<div className="relative flex justify-center items-center h-screen">
			{/* Rotating Container */}
			<div className="relative w-60 h-60 animate-spin">
				{/* Top Circle with Logo and Scaling Animation */}
				<div
					className="absolute top-2 left-1/3 transform -translate-x-1/2 w-12 h-12 bg-brand-purple rounded-full animate-scaleUp1"
					style={{
						backgroundImage: `url(${logo})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				></div>
				{/* Bottom Left Circle with Logo and delay */}
				<div
					className="absolute bottom-4 left-2 transform translate-x-1/2 translate-y-1/2 w-12 h-12 bg-brand-blue rounded-full animate-scaleUp2"
					style={{
						backgroundImage: `url(${logo})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				></div>
				{/* Bottom Right Circle with Logo and delay */}
				<div
					className="absolute bottom-4 right-2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-gradient-to-r from-[rgb(73,29,141)] to-[rgb(66,176,197)] rounded-full animate-scaleUp3"
					style={{
						backgroundImage: `url(${logo})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				></div>
			</div>
		</div>
	);
};
export default Spinner2;