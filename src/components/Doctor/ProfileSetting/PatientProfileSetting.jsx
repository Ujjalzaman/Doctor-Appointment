import React, { useEffect, useRef, useState } from 'react'
import img from '../../../images/doc/doctor 3.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { bloodGrupOptions } from '../../../constant/global';
import { useUpdatePatientMutation } from '../../../redux/api/patientApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { message } from 'antd';

const PatientProfileSetting = () => {
    const { data } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [userId, setUserId] = useState('');
    const [selectBloodGroup, setSelectBloodGroup] = useState('');
    const [selectValue, setSelectValue] = useState({})
    const [value, setValue] = useState(undefined);
    const [showCalendar, setShowCalendar] = useState(false);
    const buttonRef = useRef(null);
    const [updatePatient, { isSuccess, isError, error, isLoading }] = useUpdatePatientMutation();

    const handleDateChange = (date) => {
        setValue(date);
    };
    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };
    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        if (data) {
            setUserId(data.id)
            setSelectBloodGroup(data?.bloodGroup)
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [data]);

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Profile Updated')
        }
    }, [isLoading, isError, error, isSuccess])

    const handleChange = (e) => {
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value })
        if (e.target.name === 'bloodGroup') {
            setSelectBloodGroup(e.target.value);
        }
    }

    const onSubmit = (data) => {
        const obj = data
        const newObj = { ...obj, ...selectValue };
        if (value) {
            const newDate = moment(value).format()
            newObj['dateOfBirth'] = newDate;
        }
        const changedValue = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== ''));
        updatePatient({ data: changedValue, id: userId })
    };


    return (
        <div style={{ marginBottom: '10rem' }}>
            <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
                <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className='change-avatar d-flex gap-2 align-items-center'>
                                <Link to={'/'} className="my-3 patient-img">
                                    <img src={img} alt="" />
                                </Link>
                                <div className="mt-3">
                                    <div>
                                        <span>Upload Photo</span>
                                        <input type="file" className="upload" />
                                    </div>
                                    <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>First Name <span className="text-danger">*</span></label>
                            <input defaultValue={data?.firstName} {...register("firstName")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Last Name <span className="text-danger">*</span></label>
                            <input defaultValue={data?.lastName} {...register("lastName")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Email <span className="text-danger">*</span></label>
                            <input defaultValue={data?.email} {...register("email")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 rounded border-0 card-label">
                            {data?.dateOfBirth &&
                                <label>Current Date of Birth {moment(data?.dateOfBirth).format("MMM Do YY")}</label>
                            }
                            <input value={value && moment(value).format("MMM Do YY")} type="text" className="form-control" name='dateOfBirth' onClick={handleButtonClick} ref={buttonRef} />
                            {showCalendar && (<Calendar className="p-2 rounded shadow border-0 brand-bg" onChange={handleDateChange} value={value} />)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Phone Number</label>
                            <input defaultValue={data?.mobile} {...register("mobile")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label>Gender</label>
                            <select className="form-control select" onChange={handleChange} name='gender'>
                                <option value={''}>Select</option>
                                <option className='text-capitalize'>male</option>
                                <option className='text-capitalize'>female</option>
                                <option className='text-capitalize'>shemale</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label className='form-label'>Blood Group</label>
                            <select className="form-control select"
                                onChange={handleChange}
                                name='bloodGroup'
                                value={selectBloodGroup}
                            >
                                {
                                    bloodGrupOptions.map((option, index) => (
                                        <option key={index} value={option.value} className='text-capitalize'>{option.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label className='form-label'>City</label>
                            <input defaultValue={data?.city} {...register("city")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>State</label>
                            <input defaultValue={data?.state} {...register("state")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Zip Code</label>
                            <input defaultValue={data?.zipCode} {...register("zipCode")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Country</label>
                            <input defaultValue={data?.country} {...register("country")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Address</label>
                            <input defaultValue={data?.address} {...register("address")} className="form-control" />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary my-3" disabled={isLoading ? true : false}>{isLoading ? 'Updating..' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientProfileSetting