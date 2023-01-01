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
        <h5 className="card-title brand-color">{booking.title}</h5>
        <h6>{booking.time}</h6>
        <p>Space : {booking.space}</p>
        <button onClick={openModal} className="btn btn-primary">Book AppointMent</button>
        <AppointMentForm modalIsOpen={modalIsOpen} appointMentDate={booking.title} closeModal={closeModal} date={date}></AppointMentForm>
      </div>
    </div>
  );
};

export default BookingDate;