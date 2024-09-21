import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import CitySearch from './components/CitySearch';

function App() {
	const [city, setCity] = useState('Jhansi');
	const [weatherData, setWeatherData] = useState(null);
	const [unit, setUnit] = useState('metric');

	const getUserLocation = useCallback(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
					);
					const data = await response.json();
					setCity(data?.name);
				},
				(error) => {
					console.error('Error retrieving location', error);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const fetchWeather = useCallback(
		async (cityName) => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=968566c661975b02fc88489be79c428f`
				);
				const data = await response.json();
				setWeatherData(data);
				console.log(data);
			} catch (error) {
				console.error('Error fetching weather data:', error);
			}
		},
		[unit]
	);

	useEffect(() => {
		getUserLocation();
	}, [getUserLocation]);

	useEffect(() => {
		fetchWeather(city);
	}, [city, unit, fetchWeather]);

	const toggleUnit = () => {
		setUnit(unit === 'metric' ? 'imperial' : 'metric');
	};

	const capitalizeFirstWord = (input) => {
		let words = input.split(' ');
		words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
		return words.join(' ');
	};

	return (
		<div
			className='text-center bg-cover h-100vh'
			style={{ backgroundImage: "url('images/homeBgFull.webp')" }}>
			<div>
				<h1 className='lg:text-5xl text-3xl lg:pt-[4rem] py-[3rem] text-white lg:font-semibold '>
					Weather in {capitalizeFirstWord(city)}
				</h1>
			</div>
			<CitySearch setCity={setCity} />
			{weatherData && (
				<WeatherDisplay
					weatherData={weatherData}
					unit={unit}
					toggleUnit={toggleUnit}
				/>
			)}
			{weatherData && <Forecast city={city} unit={unit} />}
		</div>
	);
}

export default App;
