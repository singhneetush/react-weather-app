import React from 'react';

function WeatherDisplay({ weatherData, unit, toggleUnit }) {
	if (!weatherData || !weatherData.main || !weatherData.weather) {
		return <p>Loading weather data...</p>;
	}

	const { main, weather } = weatherData;
	const tempUnit = unit === 'metric' ? '°C' : '°F';

	return (
		<div className='weather-display'>
			<div className='border border-gray-700 shadow-xl  rounded-md bg-gray-900 opacity-70 mx-auto w-fit  flex items-center justify-center flex-col md:flex-row text-white px-[1rem]'>
				<img
					src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
					alt='Weather icon'
				/>
				<p className='mx-10 font-semibold text-2xl'>
					{main.temp} {tempUnit}
				</p>
				<br />
				<p className='text-lg'>{weather[0].main} </p>
			</div>
			<button
				onClick={toggleUnit}
				className='underline text-gray-300 mt-[0.5rem]'>
				Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
			</button>
		</div>
	);
}

export default WeatherDisplay;
