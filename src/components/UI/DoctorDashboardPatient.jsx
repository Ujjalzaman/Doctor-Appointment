import React, { useState } from 'react'
import './DoctorDashboardPatient';
import img from '../../images/john.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import { FaEye } from "react-icons/fa";
const DoctorDashboardPatient = () => {
    const [key, setKey] = useState('appointment');

    return (
        <Tabs
            defaultActiveKey="uplocomingSchedule"
            id="uncontrolled-tab"
            className="mb-3"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="uplocomingSchedule" title="Upcoming">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Patient Name</th>
                                                    <th className='text-nowrap'>Appt Date</th>
                                                    <th className='text-nowrap'>Purpose</th>
                                                    <th className='text-nowrap'>Type</th>
                                                    <th className='text-nowrap'>Paid Amount</th>
                                                    <th className="text-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-nowrap'>
                                                    <td >
                                                        <div className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2 d-flex gap-2">
                                                                <img className="avatar-img rounded-circle" src={img} alt="User Image" />
                                                                <div>
                                                                    <p className='p-0 m-0 text-nowrap'>Richard Wilson</p>
                                                                    <p className='p-0 m-0'>#PT00156</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>11 Feb 2020 <span className="d-block text-info">10:00 AM</span></td>
                                                    <td>General</td>
                                                    <td>Old Patient</td>
                                                    <td>150$</td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> View
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> Accept
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> Cancel
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Today" title="Today">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Date</th>
                                                    <th className='text-nowrap'>Title</th>
                                                    <th className='text-nowrap'>App Doctor</th>
                                                    <th className='text-nowrap'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-nowrap'>
                                                    <td >
                                                        <div className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2 d-flex gap-2">
                                                                <img className="avatar-img rounded-circle" src={img} alt="User Image" />
                                                                <div>
                                                                    <p className='p-0 m-0 text-nowrap'>Richard Wilson</p>
                                                                    <p className='p-0 m-0'>#PT00156</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>11 Feb 2020 <span className="d-block text-info">10:00 AM</span></td>
                                                    <td>General</td>
                                                    <td>Old Patient</td>
                                                    <td>150$</td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> View
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> Accept
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> Cancel
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab>
        </Tabs>
    )
}

export default DoctorDashboardPatient;