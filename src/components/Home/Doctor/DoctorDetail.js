import React from 'react';

const DoctorDetail = (props) => {
    const { name, email } = props.doctor;

    return (
        <div className='col-md-4 col-sm-6 col-12 text-center doctor-content m-3'>
            <div className="container shadow-lg p-3">
                <img src={`https://sleepy-tundra-72379.herokuapp.com/${props.doctor.file.name}`} style={{ width: '200px', height: '200px' }} alt="" />
                <h2 className="brand-color mt-1">{name}</h2>
                <p className="text-primary">
                    Contact : +88017547512 <br /> {email}
                </p>
            </div>
        </div>
    );
};

export default DoctorDetail;