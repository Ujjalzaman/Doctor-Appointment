import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointByDate from '../../AppointMent/AppointByDate/AppointByDate';
import { UserContext } from '../../../App';
import './Dashboard.css';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);

    }
    useEffect(() => {
        fetch("https://sleepy-tundra-72379.herokuapp.com/appointByDate", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: selectedDate, email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [selectedDate])

    return (
        <section className="dashboard">
            <div className="desh-sidebar">
                <Sidebar></Sidebar>
            </div>
            <div className="container dash-main">
                <div className="row justify-content-center g-0">
                    <div className="desh-calender col-md-4 col-sm-12 col-12 m-0 p-0">
                        <Calendar
                            onChange={handleDateChange}
                            value={new Date()}
                            className="calender-design"
                        />
                    </div>
                    <div className="col-md-8 col-sm-12 col-12 desh-appointment m-0 p-0">
                        <AppointByDate appopintMent={appointments} key={10} selectedDate={selectedDate}></AppointByDate>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Dashboard;