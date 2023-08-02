import React from 'react';
import './BookingStatus.css';

const BookingStatus = ({ bookings }) => {
    return (
      <div className="booking-status-content">
        <h2>Booking Status</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              {booking.facility}, {booking.date}, {booking.startTime} - {booking.endTime}{' '}
              {booking.bookingAmount > 0 ? `Booked, Rs. ${booking.bookingAmount}` : 'Booking Failed'}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BookingStatus;
