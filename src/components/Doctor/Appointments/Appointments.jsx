import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import img from '../../../images/john.png';
import './Appointments.css';
import { useGetDoctorAppointmentsQuery } from '../../../redux/api/appointmentApi';
import moment from 'moment';

const Appointments = () => {
    const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item) => (
                    <div className="appointments">
                        <div className="appointment-list">
                            <div className="profile-info-widget">
                                <a href="#" className="booking-doc-img">
                                    <img src={img} alt="User Image" />
                                </a>
                                <div className="profile-det-info">
                                    <h3><a href="patient-profile.html">{item?.patient?.firstName + ' ' + item?.patient?.lastName}</a></h3>
                                    <div className="patient-details">
                                        <h5><i className="far fa-clock"></i> {moment(item?.appointmentTime).format("MMM Do YY")} </h5>
                                        <h5><i className="fas fa-map-marker-alt"></i> {item?.patient?.address}</h5>
                                        <h5><i className="fas fa-envelope"></i> {item?.patient?.email}</h5>
                                        <h5 className="mb-0"><i className="fas fa-phone"></i> {item?.patient?.mobile}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="appointment-action">
                                <a href="#" className="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
                                    <i className="far fa-eye"></i> View
                                </a>
                                <a className="btn btn-sm bg-success-light">
                                    <i className="fas fa-check"></i> Accept
                                </a>
                                <a className="btn btn-sm bg-danger-light">
                                    <i className="fas fa-times"></i> Cancel
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <DashboardLayout>
            {content}
        </DashboardLayout>
    )
}

export default Appointments