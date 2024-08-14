/* eslint-disable max-len */
import React from 'react';
const Spinner4 = () => {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black">
			<div className="relative scale-[0.5] w-[70vh] h-[70vh] transform-style-3d perspective-[1000px]">
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[2.1875vh] top-[2.1875vh] w-[65.625vh] h-[65.625vh] animate-spin-x-slow"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[4.375vh] top-[4.375vh] w-[61.25vh] h-[61.25vh] animate-spin-y-medium"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[6.5625vh] top-[6.5625vh] w-[56.875vh] h-[56.875vh] animate-spin-x-fast"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[8.75vh] top-[8.75vh] w-[52.5vh] h-[52.5vh] animate-spin-y-faster"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[10.9375vh] top-[10.9375vh] w-[48.125vh] h-[48.125vh] animate-spin-x-slow"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[13.125vh] top-[13.125vh] w-[43.75vh] h-[43.75vh] animate-spin-y-medium"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[15.3125vh] top-[15.3125vh] w-[39.375vh] h-[39.375vh] animate-spin-x-fast"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[17.5vh] top-[17.5vh] w-[35vh] h-[35vh] animate-spin-y-faster"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[19.6875vh] top-[19.6875vh] w-[30.625vh] h-[30.625vh] animate-spin-x-slow"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[21.875vh] top-[21.875vh] w-[26.25vh] h-[26.25vh] animate-spin-y-medium"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[24.0625vh] top-[24.0625vh] w-[21.875vh] h-[21.875vh] animate-spin-x-fast"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[26.25vh] top-[26.25vh] w-[17.5vh] h-[17.5vh] animate-spin-y-faster"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[28.4375vh] top-[28.4375vh] w-[13.125vh] h-[13.125vh] animate-spin-x-slow"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[30.625vh] top-[30.625vh] w-[8.75vh] h-[8.75vh] animate-spin-y-medium"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[32.8125vh] top-[32.8125vh] w-[4.375vh] h-[4.375vh] animate-spin-x-fast"></div>
				<div className="absolute bg-transparent border-2 border-white rounded-full left-[35vh] top-[35vh] w-0 h-0 animate-spin-y-faster"></div>
			</div>
		</div>
	);
};
export default Spinner4;