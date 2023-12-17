import React from 'react';
import './MyPatients.css';
import img from '../../../images/john.png';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetDoctorPatientsQuery } from '../../../redux/api/appointmentApi';
import moment from 'moment';

const MyPatients = () => {
    const {data, isLoading, isError} = useGetDoctorPatientsQuery();
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
    <>
        {data && data?.map((item) => (
            <div className="card widget-profile pat-widget-profile">
                        <div className="card-body">
                            <div className="pro-widget-content">
                                <div className="profile-info-widget">
                                    <a href="" className="booking-doc-img">
                                        <img src={img} alt="User Image"/>
                                    </a>
                                    <div className="profile-det-info">
                                        <h3><a href="">{item?.firstName + ' ' + item?.lastName}</a></h3>

                                        <div className="patient-details">
                                            <h5><b>Patient ID :</b> P0016</h5>
                                            <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i>{item?.address + ',' + item?.country}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="patient-info">
                                <ul>
                                    <li>Phone <span>{item?.mobile}</span></li>
                                    <li>Age <span>{moment(item?.dateOfBirth, "YYYYMMDD").fromNow()}</span>, <span>{item?.gender}</span></li>
                                    <li>Blood Group <span>{item?.bloodGroup}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
        ))}
    </>
    return (
        <DashboardLayout>
            <div className="row row-grid">
                <div className="col-md-6 col-lg-4 col-xl-3">
                    {content}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyPatients