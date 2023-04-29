import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function RoutePlannerBar({ onSearch }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ start, end, vehicle });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600" />
        <input
          type="text"
          value={start}
          onChange={(event) => setStart(event.target.value)}
          className="border border-gray-300 p-1 rounded w-1/3"
          placeholder="Start"
        />
        <input
          type="text"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
          className="border border-gray-300 p-1 rounded w-1/3"
          placeholder="End"
        />
        <input
          type="text"
          value={vehicle}
          onChange={(event) => setVehicle(event.target.value)}
          className="border border-gray-300 p-1 rounded w-1/3"
          placeholder="Vehicle"
        />
        <button type="submit" className="bg-blue-500 text-white p-1 rounded ml-2">
          Search
        </button>
      </div>
    </form>
  );
}

export default RoutePlannerBar;