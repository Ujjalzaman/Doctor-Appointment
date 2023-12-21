import React from 'react';
import './Doctor.css';
import DoctorDetail from './DoctorDetail';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';

const Doctor = () => {
    const { data, isLoading, isError } = useGetDoctorsQuery();
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, key) => (
                    <DoctorDetail key={item?.id + key} item={item}></DoctorDetail>
                ))
            }
        </>
    return (
        <section className="doctors" id="doctorContaints">
            <div className="container">
                <h1 className="brand-color text-center mb-5">Our Doctors </h1>
            </div>
            <div className=" container">
                <div className="row d-flex justify-content-center">
                    {content}
                </div>
            </div>
        </section>
    );
};

export default Doctor;