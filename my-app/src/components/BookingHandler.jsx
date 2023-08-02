import React from 'react';

const BookingHandler = ({ bookings, onBooking, facility, date, startTime, endTime }) => {
  const handleBooking = () => {
    const isAlreadyBooked = bookings.some(
      (booking) =>
        booking.facility === facility &&
        booking.date === date &&
        booking.startTime === startTime &&
        booking.endTime === endTime
    );

    if (isAlreadyBooked) {
      alert('Booking Failed, Already Booked');
    } else {
      onBooking(facility, date, startTime, endTime);
    }
  };

  return (
    <button onClick={handleBooking}>Book Now</button>
  );
};

export default BookingHandler;
