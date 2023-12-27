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
import { useUpdateDoctorMutation } from '../../redux/api/doctorApi';

const DoctorProfileSetting = () => {
    const [updateDoctor, { isLoading, isSuccess, isError, error }] = useUpdateDoctorMutation()
    const { data } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [userId, setUserId] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [value, setValue] = useState(undefined);
    const [showCalender, setShowCalender] = useState(false);
    const buttonRef = useRef(null);

    const handleDateChange = (date) => {
        setValue(date);
    }

    const handleButtonClick = () => {
        setShowCalender(!showCalender);
    }

    const handleClickOutSide = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowCalender(false);
        }
    }

    useEffect(() => {
        if (data) {
            setUserId(data.id);
        };
        document.addEventListener('click', handleClickOutSide);
        return () => {
            document.removeEventListener('click', handleClickOutSide);
        }
    }, [data]);

    const handleChange = (e) => {
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value })
    }

    const onSubmit = (data) => {
        const obj = data
        const newObj = { ...obj, ...selectValue };
        if (value) {
            const newDate = moment(value).format()
            newObj['dateOfBirth'] = newDate;
        }
        const changedValue = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== ''));
        updateDoctor({ data: changedValue, id: userId })
    };

    useEffect(() => {
        if (!isLoading && isError) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success('Successfully Changed Saved !')
        }
    }, [isLoading, isError, error, isSuccess])


    return (
        <div style={{ marginBottom: '10rem' }}>
            <div className="card shadow border-0 mb-5 p-2">
                <div className="card-body">
                    <h4 className="card-title">Update Your Information</h4>
                    <Toaster />
                    <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12 mb-3">
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
                                <label className='form-label'>Email</label>
                                <input defaultValue={data?.email} {...register("email")} className="form-control" />

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-2">
                                <label className='form-label'>Phone Number</label>
                                <input defaultValue={data?.phone} {...register("phone")} className="form-control" />
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
                                <label className='form-label mb-0'>Date of Birth {moment(data?.dateOfBirth).format("MMM Do YY")}</label>
                                <input value={value && moment(value).format("MMM Do YY")} type="text" className="form-control" name='dateOfBirth' onClick={handleButtonClick} ref={buttonRef} />
                                {showCalender && (<Calendar className="rounded shadow border-0" onChange={handleDateChange} value={value} />)}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 mt-2">
                                <div className="card-body">
                                    <h4 className="card-title">About Me</h4>
                                    <div className="form-group mb-2">
                                        <label className='form-label'>Biography</label>
                                        <textarea defaultValue={data?.biography} {...register("biography")} className="form-control" rows={5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Clinic Info</h4>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Clinic Name</label>
                                            <input defaultValue={data?.clinicName} {...register("clinicName")} className="form-control" rows={5} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Clinic Address</label>
                                            <input type="text" defaultValue={data?.clinicAddress} {...register("clinicAddress")} className="form-control" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Contact Details</h4>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Address Line</label>
                                            <input defaultValue={data?.address} {...register("address")} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>City</label>
                                            <input defaultValue={data?.city} {...register("city")} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>State / Province</label>
                                            <input defaultValue={data?.state} {...register("state")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Country</label>
                                            <input defaultValue={data?.country} {...register("country")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Postal Code</label>
                                            <input defaultValue={data?.postalCode} {...register("postalCode")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Pricing</h4>
                                <div className="form-group mb-0">
                                    <div id="pricing_select">
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="price_free" name="rating_option" className="custom-control-input" value="price_free" checked />
                                            <label className="custom-control-label" for="price_free">Free</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="price_custom" name="rating_option" value="custom_price" className="custom-control-input" />
                                            <label className="custom-control-label" for="price_custom">Custom Price (per hour)</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row custom_price_cont" id="custom_price_cont" style={{ display: "none" }}>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" id="custom_rating_input" name="custom_rating_count" value="" placeholder="20" />
                                        <small className="form-text text-muted">Custom price you can add</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Services and Specialization</h4>
                                <div className="row form-row">
                                    <div className="form-group">
                                        <label className='form-label'>Services</label>
                                        <input defaultValue={data?.services} {...register("services")} className="input-tags form-control" placeholder="Enter Services" />

                                        <small className="form-text text-muted">Note : Type & Press enter to add new services</small>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className='form-label'>Specialization </label>
                                        <input defaultValue={data?.specialization} {...register("specialization")} className="input-tags form-control" placeholder="Enter Specialization" />
                                        <small className="form-text text-muted">Note : Type & Press  enter to add new specialization</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Education</h4>
                                <div className="row form-row">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Degree</label>
                                            <input defaultValue={data?.degree} {...register("degree")} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>College/Institute</label>
                                            <input defaultValue={data?.college} {...register("college")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Year of Completion</label>
                                            <input defaultValue={data?.completionYear} {...register("completionYear")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Experience</h4>
                                <div className="row form-row">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Hospital Name</label>
                                            <input defaultValue={data?.experienceHospitalName} {...register("experienceHospitalName")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>From</label>
                                            <input defaultValue={data?.expericenceStart} {...register("expericenceStart")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>To</label>
                                            <input defaultValue={data?.expericenceEnd} {...register("expericenceEnd")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Designation</label>
                                            <input defaultValue={data?.designation} {...register("designation")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Awards</h4>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Awards</label>
                                            <input defaultValue={data?.award} {...register("award")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>Year</label>
                                            <input defaultValue={data?.awardYear} {...register("awardYear")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h4 className="card-title">Registrations</h4>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Registrations</label>
                                            <input defaultValue={data?.registration} {...register("registration")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Year</label>
                                            <input defaultValue={data?.year} {...register("year")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="submit-section submit-btn-bottom mt-2">
                            <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading ? true : false}>{isLoading ? 'Saving ...' : 'Save Changes'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfileSetting