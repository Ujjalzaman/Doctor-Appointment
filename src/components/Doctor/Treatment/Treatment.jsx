import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, DatePicker, Space, Select, Flex } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";
import './index.css';
import { appointemntStatusOption } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import SelectFormWithTags from "../../UI/form/SelectFormWithTags";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";

const { RangePicker } = DatePicker;

const Treatment = () => {
    const [medicineList, setMedicineList] = useState([{ id: 1 }]);
    const [currentId, setCurrentId] = useState(1);

    const addField = (e) => {
        e.preventDefault();
        setCurrentId(currentId + 1);
        setMedicineList([...medicineList, { id: currentId + 1 }])
    }

    const removeFromAddTimeSlot = (id) => {
        setMedicineList(medicineList.filter((item) => item.id !== id))
    }

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    const datePickerPreset = [
        {
            label: 'Yesterday',
            value: dayjs().add(-1, 'd'),
        },
        {
            label: 'Last Week',
            value: dayjs().add(-7, 'd'),
        },
        {
            label: 'Last Month',
            value: dayjs().add(-1, 'month'),
        },
    ]

    return (
        <DashboardLayout>

            <div className="w-100 mb-3 rounded p-3 text-center d-flex justify-content-between bg-gray-g">
                <div className="container row">
                    <div className="col-5 p-2 rounded text-white border border-success">
                        <Link to={'/'} className="my-3 patient-img">
                            <img src={img} alt="" style={{ height: '90px', width: '90px' }} />
                        </Link>
                        <div className="patients-info mt-3">
                            <h5>Ujjal zaman</h5>
                            <div className="info">
                                <p><FaClock className='icon' /> 26 February 2024 </p>
                                <p><FaLocationArrow className='icon' /> Styleht, bangladesh, 3214 dhaka</p>
                                <p><FaEnvelope className='icon' /> ujjalz@gmail.com</p>
                                <p><FaPhoneAlt className='icon' /> +88017510415</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-7 px-5">
                        <h5>Patient Overview</h5>
                        <hr />
                        <div className="p-2 rounded" style={{ background: 'rgb(218 218 219)' }}>
                            <p className="form-text text-start m-0">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cupiditate assumenda dolor, cum dolorum aspernatur in esse velit quidem qui.</p>
                        </div>

                        <div className="text-start mt-3">
                            <h6>Patient Type : <span className="btn-status btn-st-danger">Emergency</span></h6>
                            <h6>Current Status : <span className="btn-status btn-st-success">Pending</span></h6>
                            <h6>Payment Status : <span className="btn-status btn-st-success">Paid</span></h6>
                            <h6>Prescription Status : <span className="btn-status btn-st-danger">Not Issued</span></h6>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-100 mb-3 rounded p-2 text-start bg-gray-g">
                <Link to={'/'}>Show Previous Medical History ? </Link>
            </div>

            <div className="w-100 mb-3 rounded p-3 bg-gray-g">
                <div className="text-center mb-2 d-flex justify-content-center">
                    <h5 className="border-success border-bottom w-25 pb-2 border-5">Start Treatment</h5>
                </div>

                <form className="row form-row">
                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Appointment Status</h6>
                            </div>
                            <SelectForm
                                showSearch={true}
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={appointemntStatusOption}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card p-3 mb-3">
                            <h6 className="card-title text-secondary">Identify Disease & Symtomps</h6>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Daignosis</label>
                                        </div>
                                        <SelectFormWithTags
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Disease</label>
                                        </div>
                                        <SelectFormWithTags
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Bronchitis</label>
                                        </div>
                                        <SelectFormWithTags
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Medical Checkup</h6>
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    <label>Medical Checkup</label>
                                    <SelectFormWithTags
                                        onChange={handleChange}
                                        options={options}
                                    />
                                    <small className="form-text text-muted">Note : Type & Press enter to add new services</small>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Medicine</h6>
                            {
                                medicineList.map((item, index) => (
                                    <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>
                                        <div className="col-md-6 mb-3">
                                            <label>Quantity</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Dosage</label>
                                            <div className="form-group mb-2">
                                                <SelectForm
                                                    showSearch={true}
                                                    onChange={onChange}
                                                    onSearch={onSearch}
                                                    filterOption={filterOption}
                                                    options={appointemntStatusOption}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Frequency</label>
                                            <div className="form-group mb-2">
                                                <SelectForm
                                                    showSearch={true}
                                                    onChange={onChange}
                                                    onSearch={onSearch}
                                                    filterOption={filterOption}
                                                    options={appointemntStatusOption}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Start Date / End Date</label>
                                            <div className="form-group mb-2">
                                                <Space direction="vertical" size={12}>
                                                    <RangePicker presets={rangePresets} onChange={onRangeChange} size="large" />
                                                </Space>
                                            </div>
                                        </div>

                                        <a className="text-danger position-absolute text-end mb-3"
                                            onClick={() => removeFromAddTimeSlot(item?.id)}
                                            style={{ top: '-35px' }}
                                        >
                                            <FaRegTrashAlt />
                                        </a>
                                    </div>
                                ))
                            }

                        </div>

                    </div>

                    <div className="w-25 mb-4">
                        <Button type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
                            Add
                        </Button>
                    </div>

                    <div className="col-md-12 mb-3">
                        <label>Follow Up Date</label>
                        <div className="form-group mb-2">
                            <DatePicker
                                presets={datePickerPreset}
                                onChange={onChange}
                                showTime
                                size="large"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="form-group mb-2">
                            <label>Instruction</label>
                            <TextArea rows={4} placeholder="Instruction text ..." />
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large'>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </DashboardLayout>
    )
}

export default Treatment;