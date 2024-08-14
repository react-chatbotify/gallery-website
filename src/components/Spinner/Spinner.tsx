/* eslint-disable max-len */
import React from 'react';
const Spinner = () => {
	return (
		<div className="relative flex justify-center items-center h-screen bg-black">
			{/* Rotating Container */}
			<div className="relative w-40 h-40 animate-spin"> {/* Increased size to create more spacing */}
				{/* Top Circle with Scaling Animation */}
				<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-gradient-primary rounded-full animate-scaleUp"></div>
				{/* Bottom Circle with delay */}
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-blue rounded-full animate-scaleUp animate-delay-500"></div>
				{/* Left Circle with delay */}
				<div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 bg-brand-gradient-white-purple rounded-full animate-scaleUp animate-delay-1000"></div>
				{/* Right Circle with delay */}
				<div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 bg-brand-gradient-white-blue rounded-full animate-scaleUp animate-delay-1500"></div>
			</div>
		</div>
	);
};
export default Spinner;