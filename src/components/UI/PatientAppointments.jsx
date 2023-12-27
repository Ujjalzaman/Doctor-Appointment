import React, { useState } from 'react'
import img from '../../images/john.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import { FaEye } from "react-icons/fa";
import moment from 'moment';
import { useGetPatientAppointmentsQuery } from '../../redux/api/appointmentApi';
import { useGetPatientPrescriptionQuery } from '../../redux/api/prescriptionApi';

const PatientAppointments = () => {
    const [, setKey] = useState('appointment');
    const { data } = useGetPatientAppointmentsQuery();
    const { data: pPrescription } = useGetPatientPrescriptionQuery();

    return (
        <Tabs
            defaultActiveKey="appointment"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="appointment" title="Appointment">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Doctor</th>
                                                    <th className='text-nowrap'>Appt Date</th>
                                                    <th className='text-nowrap'>Booking Date</th>
                                                    <th className='text-nowrap'>Amount</th>
                                                    <th className='text-nowrap'>Follow Up</th>
                                                    <th className='text-nowrap'>Status</th>
                                                    <th className="text-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data && data.map((item) => (
                                                        <tr className='text-nowrap'>
                                                            <td key={item.id}>
                                                                <div className="table-avatar">
                                                                    <a className="avatar avatar-sm mr-2 d-flex gap-2">
                                                                        <img className="avatar-img rounded-circle" src={img} alt="" />
                                                                        <div>
                                                                            <p className='p-0 m-0 text-nowrap'>{item?.doctor?.firstName + ' ' + item?.doctor?.lastName}</p>
                                                                            <p className='p-0 m-0'>Dental</p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>{moment(item?.appointmentTime).format("MMM Do YY")} <span className="d-block text-info">{moment(item?.appointmentTime).format("LT")}</span></td>
                                                            <td>{moment(item?.appointmentTime).format("MMM Do YY")}</td>
                                                            <td>$150</td>
                                                            <td>11 Nov 2019</td>
                                                            <td>
                                                                <span className="badge rounded-pill text-bg-success">Confirm</span>
                                                            </td>
                                                            <td>
                                                                <div className="table-action">
                                                                    <div className="btn btn-sm bg-info-light">
                                                                        <FaEye /> View
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Prescription" title="Prescription">
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
                                                {
                                                    pPrescription && pPrescription?.map((item) => (
                                                        <tr className='text-nowrap' key={item.id}>
                                                            <td>{moment(item?.appointment?.appointmentTime).format("MMM Do YY")}</td>
                                                            <td>{item?.disease}</td>
                                                            <td>
                                                                <div className="table-avatar">
                                                                    <a className="avatar avatar-sm mr-2 d-flex gap-2">
                                                                        <img className="avatar-img rounded-circle" src={img} alt="" />
                                                                        <div>
                                                                            <p className='p-0 m-0 text-nowrap'>{item?.doctor?.firstName + ' ' + item?.doctor?.lastName}</p>
                                                                            <p className='p-0 m-0'>{item?.doctor?.designation}</p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="table-action">
                                                                    <div className="btn btn-sm bg-info-light">
                                                                        <FaEye /> View
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Billing" title="Billing">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Invoice No</th>
                                                    <th className='text-nowrap'>Doctor</th>
                                                    <th className='text-nowrap'>Amount</th>
                                                    <th className='text-nowrap'>Paid On</th>
                                                    <th className='text-nowrap'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-nowrap' >
                                                    <td>#INV-00010</td>
                                                    <td>
                                                        <div className="table-avatar">
                                                            <a className="avatar avatar-sm mr-2 d-flex gap-2">
                                                                <img className="avatar-img rounded-circle" src={img} alt="" />
                                                                <div>
                                                                    <p className='p-0 m-0 text-nowrap'>Dr. Ruby Perrin</p>
                                                                    <p className='p-0 m-0'>Dental</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>150$</td>
                                                    <td>14 Dec 2023</td>
                                                    <td>
                                                        <div className="table-action">
                                                            <div className="btn btn-sm bg-info-light">
                                                                <FaEye /> View
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

export default PatientAppointments