import React from 'react';
import AppointMentShorList from '../AppointMentShortList/AppointMentShorList';

const AppointByDate = ({ appopintMent, selectedDate }) => {
    return (
        <div>
            <div className="d-flex justify-content-center p-2">
                <p className="brand-color text-center">Appointment</p>
                <p>{selectedDate.toDateString()}</p>
            </div>
            {
                <AppointMentShorList appointment={appopintMent}></AppointMentShorList>
            }
        </div>
    );
};

export default AppointByDate;