import React, { useState } from 'react';
import AppointMentForm from '../AppointMentForm/AppointMentForm';

const BookingDate = ({ booking, date }) => {
    var subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal(){
      setIsOpen(false);
    }

  return (
    <div className="col-md-4 mb-5 mt-5">
      <div className="card p-3">
        <h5 className="card-title brand-color">{booking.subject}</h5>
        <h6>{booking.visitingHour}</h6>
        <p>Space : {booking.totalSpace}</p>
        <button onClick={openModal} className="btn btn-primary">Book AppointMent</button>
        <AppointMentForm modalIsOpen={modalIsOpen} appointMentDate={booking.subject} closeModal={closeModal} date={date}></AppointMentForm>
      </div>
    </div>
  );
};

export default BookingDate;