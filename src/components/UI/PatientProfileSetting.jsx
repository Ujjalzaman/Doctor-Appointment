import React, { useEffect, useRef, useState } from 'react'
import img from '../../images/john.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { bloodGrupOptions } from '../../constant/global';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { useUpdatePatientMutation } from '../../redux/api/patientApi';
import toast, { Toaster } from 'react-hot-toast';

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
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success('Successfully Profile Updated')
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
            <div className="card shadow border-0 mb-5 p-2">
                <div className="card-body">
                    <h4 className="card-title">Update Your Information</h4>
                    <div>
                        <Toaster />
                        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="change-avatar">
                                        <div className="profile-img">
                                            <img src={img} alt="" />
                                        </div>
                                        <div className="upload-img">
                                            <div className="change-photo-btn">
                                                <span><i className="fa fa-upload"></i> Upload Photo</span>
                                                <input type="file" className="upload" />
                                            </div>
                                            <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>First Name <span className="text-danger">*</span></label>
                                    <input defaultValue={data?.firstName} {...register("firstName")} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Last Name <span className="text-danger">*</span></label>
                                    <input defaultValue={data?.lastName} {...register("lastName")} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Email <span className="text-danger">*</span></label>
                                    <input defaultValue={data?.email} {...register("email")} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-2 rounded border-0">
                                    {data?.dateOfBirth &&
                                        <label className='form-label'>Current Date of Birth {moment(data?.dateOfBirth).format("MMM Do YY")}</label>
                                    }
                                    <input value={value && moment(value).format("MMM Do YY")} type="text" className="form-control" name='dateOfBirth' onClick={handleButtonClick} ref={buttonRef} />
                                    {showCalendar && (<Calendar className="p-2 rounded shadow border-0 brand-bg" onChange={handleDateChange} value={value} />)}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Phone Number</label>
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
                                        {/* <option value={''}>Select</option> */}
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
                                <div className="form-group mb-2">
                                    <label className='form-label'>State</label>
                                    <input defaultValue={data?.state} {...register("state")} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Zip Code</label>
                                    <input defaultValue={data?.zipCode} {...register("zipCode")} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Country</label>
                                    <input defaultValue={data?.country} {...register("country")} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label className='form-label'>Address</label>
                                    <input defaultValue={data?.address} {...register("address")} className="form-control" />
                                </div>
                            </div>

                            <div className="submit-section submit-btn-bottom mb-5 mt-5">
                                <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading ? true : false}>{isLoading ? 'Updating..' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientProfileSetting