import React from 'react';
import AppointMentShorList from '../AppointMentShortList/AppointMentShorList';

const AppointByDate = ({appopintMent}) => {
    return (
        <div>
            <h2 className="brand-color text-center">
            AppointMent</h2>
            {
                appopintMent.length ?
                <AppointMentShorList appointment={appopintMent}></AppointMentShorList>
                :
                <div className="p-5">
                    <h4 className="lead text-center">No AppointMent For this date</h4>
                </div>
            }
        </div>
    );
};

export default AppointByDate;