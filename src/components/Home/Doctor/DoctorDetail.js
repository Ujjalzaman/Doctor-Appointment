import React from 'react';

const DoctorDetail = (props) => {
    const {name, email, mobile} = props.doctor;

    return (
        <div className='col-md-4 col-sm-6 col-12 text-center shadow m-2 p-5'>
            <img src={`https://sleepy-tundra-72379.herokuapp.com/${props.doctor.file.name}`} style={{width:'200px', height:'200px'}} alt=""/>
            <h2 className="brand-color py-2">{name}</h2>
            <p className="text-primary">
                Email : {email}
            </p>
        </div>
    );
};

export default DoctorDetail;