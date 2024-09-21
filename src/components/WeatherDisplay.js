import React from 'react';

function WeatherDisplay({ weatherData, unit, toggleUnit }) {
	if (!weatherData || !weatherData.main || !weatherData.weather) {
		return <p>Loading weather data...</p>;
	}

	const {  main, weather } = weatherData;
	const tempUnit = unit === 'metric' ? '°C' : '°F';

	return (
		<div className='weather-display'>
			<div className=' flex items-center justify-center flex-col md:flex-row text-white'>
				<p className='mx-10'>
					Temperature: {main.temp} {tempUnit}
				</p>
				<br />
				<p>Condition: {weather[0].main}</p>
				<img
					src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
					alt='Weather icon'
				/>
			</div>
			<button onClick={toggleUnit} className='underline text-gray-300'>
				Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
			</button>
		</div>
	);
}

export default WeatherDisplay;
