import React from 'react';
import AppointMentShorList from '../AppointMentShortList/AppointMentShorList';

const AppointByDate = ({ appopintMent, selectedDate }) => {
    return (
        <div>
            <div className="appointment-head d-flex justify-content-between p-2">
                <p className="brand-color text-center">Appointment</p>
                <p>{selectedDate.toDateString()}</p>
            </div>
            {/* {
                appopintMent.length ?
                    <div className="p-5">
                        <h4 className="lead text-center no-appointment">No AppointMent For this date</h4>
                    </div>
                    : */}
                    <AppointMentShorList appointment={appopintMent}></AppointMentShorList>
            {/* } */}
        </div>
    );
};

export default AppointByDate;