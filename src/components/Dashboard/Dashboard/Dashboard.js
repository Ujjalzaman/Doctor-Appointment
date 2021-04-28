import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointByDate from '../../AppointMent/AppointByDate/AppointByDate';
import { UserContext } from '../../../App';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
        
    }
    useEffect(() => {
        fetch("https://sleepy-tundra-72379.herokuapp.com/appointByDate",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({date:selectedDate, email:loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => setAppointments(data))
    }, [selectedDate])

    return (
        <section>
            {
                console.log("date", selectedDate, "email", loggedInUser.email)
            }
            <div style={{ backgroundColor: '#F4FDFB' }} className="row">
                <div className="col-md-2 col-sm-6.col-12">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-5 col-sm-12 col-12 d-flex justify-content-center pt-5">
                    <Calendar
                        onChange={handleDateChange}
                        value={new Date()}
                    />
                </div>
                <div className="col-md-5 col-sm-12 col-12">
                    <AppointByDate appopintMent={appointments} key={10}></AppointByDate>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;