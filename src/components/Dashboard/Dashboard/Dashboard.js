import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointByDate from '../../AppointMent/AppointByDate/AppointByDate';
import './Dashboard.css';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointByDate, setAppointments] = useState([]);
    const { data, loading, error } = useFetch("/auth/patients");
    if (appointByDate.length == 0) {
        setAppointments(data);
    }
    const handleDateChange = date => {
        setSelectedDate(date);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("/auth/appointByDate", { date: selectedDate })
                if(res.data){
                    setAppointments(res.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();

    }, [selectedDate])

    return (
        <section className='container row g-0'>
            <div className='col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                <div className=''>
                    <div className='mb-2'>
                        <Calendar
                            onChange={()=>handleDateChange}
                            value={new Date()}
                            className="calender-design"
                        />
                    </div>
                    <div>
                        <AppointByDate appopintMent={appointByDate} key={10} selectedDate={selectedDate}></AppointByDate>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;