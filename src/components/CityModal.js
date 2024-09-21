import React, { useEffect, useRef } from 'react';

function CityModal({ isOpen, onClose, cities, onSelectCity }) {
	const modalRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			// document.body.classList.add('blur');
		} else {
			// document.body.classList.remove('blur');
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			// document.body.classList.remove('blur');
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-5 rounded shadow-lg z-100' ref={modalRef}>
				<input
					type='text'
					placeholder='Search cities...'
					className='border p-2 w-full mb-4'
					onChange={(e) => onSelectCity(e.target.value)}
				/>
				<ul>
					{cities.map((city) => (
						<li
							key={city}
							onClick={() => onSelectCity(city)}
							className='cursor-pointer hover:bg-gray-200 p-2'>
							{city}
						</li>
					))}
				</ul>
				<button onClick={onClose} className='mt-4'>
					Close
				</button>
			</div>
		</div>
	);
}

export default CityModal;
