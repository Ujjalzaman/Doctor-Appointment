import React from 'react';
import useFetch from '../../hooks/useFetch';
import BookingDate from './BookingDate';

const BookApointMent = ({ selectDate }) => {
    const { data, loading, error } = useFetch("http://localhost:5000/auth/ourServices");
    return (
        <section>
            <h1 className="text-center brand-color text-uppercase">your selected date {selectDate.toDateString()}</h1>
            <div className="row">
                {
                    data && data?.map(booking => <BookingDate booking={booking} date={selectDate} key={booking._id}></BookingDate>)
                }
            </div>
        </section>
    );
};

export default BookApointMent;