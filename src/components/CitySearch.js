import React, { useState } from 'react';
import CityModal from './CityModal';

function CitySearch({ setCity }) {
	const [isModalOpen, setModalOpen] = useState(false);
	const [cities] = useState([
		'New Delhi',
		'Noida',
		'Hyderabad',
		'Pune',
		'Chandigarh',
	]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim() === '') {
			setError('*Please enter a valid city name');
		} else {
			setCity(searchTerm);
			setError(false);
		}
	};

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		if (error) setError(false);
	};

	const filteredCities = cities.filter((city) =>
		city.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectCity = (city) => {
		setCity(city);
		setModalOpen(false);
	};

	return (
		<div className='city-search'>
			<form onSubmit={handleSubmit} className='flex flex-col justify-center'>
				<div>
					<input
						type='text'
						placeholder='Search city...'
						value={searchTerm}
						onChange={handleInputChange}
						onFocus={() => setModalOpen(true)}
						className='focus:outline-none'
					/>
					<button type='submit' className='md:my-0 my-[1.5rem]'>
						Search
					</button>
				</div>
				{error && <div className='text-white text-sm mt-2'>{error}</div>}
			</form>

		
		</div>
	);
}

export default CitySearch;
