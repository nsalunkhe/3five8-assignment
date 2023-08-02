import React, { useState } from 'react';
import './BookingForm.css'
const BookingForm = ({ facilities, onBooking }) => {
  const [facility, setFacility] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (facility && date && startTime && endTime) {
      onBooking(facility, date, startTime, endTime);
      setFacility('');
      setDate('');
      setStartTime('');
      setEndTime('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const generateHoursOptions = () => {
    const hours = [];
    for (let i = 10; i <= 22; i++) {
      hours.push(`${i}:00`);
    }
    return hours;
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={facility} onChange={(e) => setFacility(e.target.value)}>
        <option value="">Select Facility</option>
        {facilities.map((f) => (
          <option key={f.name} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {facility && (
        <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
          <option value="">Select Start Time</option>
          {generateHoursOptions().map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      )}
      {facility && (
        <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          <option value="">Select End Time</option>
          {generateHoursOptions().map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
