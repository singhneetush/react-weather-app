import React, { useState, useEffect } from 'react';

function Forecast({ city, unit }) {
	const [forecastData, setForecastData] = useState([]);
	const [error, setError] = useState(null);
	const tempUnit = unit === 'metric' ? '°C' : '°F';

	useEffect(() => {
		const fetchForecast = async () => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
				);
				const data = await response.json();

				if (response.ok && data.list) {
					const dailyData = data.list.filter((reading) =>
						reading.dt_txt.includes('18:00:00')
					);
					setForecastData(dailyData);
					setError(null);
				} else {
					setForecastData([]);
					setError('Invalid city name. Please try again.');
				}
			} catch (error) {
				setForecastData([]);
				setError('Failed to fetch data. Please try again later.');
			}
		};

		fetchForecast();
	}, [city, unit]);

	return (
		<div className='forecast p-4 sm:p-6 text-white'>
			<h3 className='text-xl sm:text-2xl mb-4'>5-Day Forecast</h3>
			{error && <div className='error-message text-red-600'>{error}</div>}
			<div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
				{forecastData.map((day, index) => (
					<div
						key={index}
						className='forecast-card bg-gray-900 opacity-70 p-4 rounded shadow-lg'>
						<p className='text-lg font-semibold'>
							{new Date(day.dt_txt).toLocaleDateString('en-US', {
								weekday: 'long',
							})}
						</p>
						<p className='text-sm'>
							{day.main.temp_min}
							{tempUnit} / {day.main.temp_max}
							{tempUnit}
						</p>
						<img
							src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
							alt='Weather icon'
							className='mx-auto'
						/>
						<p>Wind: {day?.wind?.speed} m/sec</p>
						<p>
							Real Feel : {day?.main?.feels_like}
							{tempUnit}{' '}
						</p>
						<p>Humidity : {day?.main?.humidity} %</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Forecast;
