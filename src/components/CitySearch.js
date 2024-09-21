import React, { useState } from 'react';

function CitySearch({ setCity }) {
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

	return (
		<div className='city-search'>
			<form onSubmit={handleSubmit} className='flex flex-col justify-center'>
				<div className='flex justify-center'>
					<input
						type='text'
						placeholder='Search city...'
						value={searchTerm}
						onChange={handleInputChange}
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
