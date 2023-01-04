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
    const { data, loading, error } = useFetch("http://localhost:5000/auth/patients");
    if(appointByDate.length == 0){
        setAppointments(data);
    }
    const handleDateChange = date => {
        setSelectedDate(date);
    }
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const res = await axios.post("http://localhost:5000/auth/appointByDate", {date:selectedDate})
                setAppointments(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();

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
                        <AppointByDate appopintMent={appointByDate} key={10} selectedDate={selectedDate}></AppointByDate>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Dashboard;