import React, { useState } from 'react';
import BookingForm from './BookingForm';
import BookingStatus from './BookingStatus';
import { facilities } from './data';
import './BookingModule.css';

const BookingModule = () => {
  const [bookings, setBookings] = useState([]);

  const handleBooking = (facility, date, startTime, endTime) => {
    const newBooking = { facility, date, startTime, endTime, bookingAmount: 0 };
    const overlappingBooking = bookings.find((booking) => {
      const sameFacility = booking.facility === facility;
      const sameDate = booking.date === date;
      const startsDuringExistingBooking = booking.startTime <= startTime && startTime < booking.endTime;
      const endsDuringExistingBooking = booking.startTime < endTime && endTime <= booking.endTime;
      const startsBeforeAndEndsAfterExistingBooking =
        startTime < booking.startTime && endTime > booking.endTime;
  
      return (
        sameFacility &&
        sameDate &&
        (startsDuringExistingBooking || endsDuringExistingBooking || startsBeforeAndEndsAfterExistingBooking)
      );
    });
  
    if (overlappingBooking) {
      alert('Booking Failed, Slot Already Booked');
    } else {
      const bookingAmount = calculateBookingAmount(facility, startTime, endTime);
      newBooking.bookingAmount = bookingAmount;
      setBookings([...bookings, newBooking]);
    }
  };

  const calculateBookingAmount = (facility, startTime, endTime) => {
    const facilityObj = facilities.find((f) => f.name === facility);
    if (!facilityObj || !facilityObj.slotBased) {
      return 0; 
    }

    let totalAmount = 0;
    const rates = facilityObj.rates;

    const startTimeParts = startTime.split(':').map(Number);
    const endTimeParts = endTime.split(':').map(Number);
    const bookingStartTime = startTimeParts[0] * 60 + startTimeParts[1];
    const bookingEndTime = endTimeParts[0] * 60 + endTimeParts[1];

    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i];
      const startTimeValue = rate.startTime.split(':').map(Number);
      const endTimeValue = rate.endTime.split(':').map(Number);
      const startMinute = startTimeValue[0] * 60 + startTimeValue[1];
      const endMinute = endTimeValue[0] * 60 + endTimeValue[1];

     
      if (bookingStartTime < endMinute && bookingEndTime > startMinute) {
        const overlapStartTime = Math.max(bookingStartTime, startMinute);
        const overlapEndTime = Math.min(bookingEndTime, endMinute);
        const minutesBooked = overlapEndTime - overlapStartTime;
        totalAmount += (minutesBooked / 60) * rate.rate;
      }
    }

    return totalAmount;
  };

  return (
    <div className="booking-module">
      <h1 className="booking-title">Facility Booking Module</h1>
      <BookingForm facilities={facilities} onBooking={handleBooking} />
      <div className="booking-status">
        <BookingStatus bookings={bookings} />
      </div>
    </div>
  );
};

export default BookingModule;
