import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Button, DatePicker, Space, Select, Flex } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";
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

    return (
        <DashboardLayout>
            <h3>Patient Information</h3>

            <div className="w-100 mb-3 rounded p-3 text-center" style={{ background: '#f8f9fa' }}>
                <div className="">
                    <Link to={'/'} className="my-3 patient-img">
                        <img src={img} alt="" />
                    </Link>
                    <div className="patients-info mt-4">
                        <h5>Ujjal zaman</h5>
                        <div className="info">
                            <p><FaClock className='icon' /> 26 February 2024 </p>
                            <p><FaLocationArrow className='icon' /> Styleht, bangladesh, 3214 dhaka</p>
                            <p><FaEnvelope className='icon' /> ujjalz@gmail.com</p>
                            <p><FaPhoneAlt className='icon' /> +88017510415</p>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                            <h2>Patient Type : Normal</h2>
                            <h3>Current Status : Pending</h3>
                            <h3>Payment Status : Paid</h3>
                            <h3>Prescription Status : Issued</h3>
                        </div>
                    </div>
                </div>
            </div>


            <form className="row form-row">

                <div className="col-md-12">
                    <div className="form-group mb-2 card-label">
                        <label>Instruction</label>
                        <input placeholder="Some Instruction" className="form-control" />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-2">
                        <div>
                            <label>Daignosis</label>
                        </div>
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-2">
                        <div>
                            <label>Status</label>
                        </div>
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-2">
                        <div>
                            <label>Disease</label>
                        </div>
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-2">
                        <div>
                            <label>Bronchitis</label>
                        </div>
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label>Follow Up Date</label>
                    <div className="form-group mb-2">
                        <DatePicker
                            presets={[
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
                            ]}
                            onChange={onChange}
                            showTime
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="card mb-2 p-3 mt-2">
                        <h6 className="card-title text-secondary">Medical Checkup</h6>
                        <div className="row form-row">
                            <div className="form-group mb-2 card-label">
                                <label>Medical Checkup</label>
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={handleChange}
                                    tokenSeparators={[',']}
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
                                <div className="row form-row" key={index + 1}>
                                    <div className="col-md-6">
                                        <label>Quantity</label>
                                        <div className="form-group mb-2">
                                            <input placeholder="Some Instruction" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Dosage</label>
                                        <div className="form-group mb-2">
                                            <input placeholder="Some Instruction" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Frequency</label>
                                        <div className="form-group mb-2">
                                            <input placeholder="Some Instruction" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Start Date / End Date</label>
                                        <div className="form-group mb-2">
                                            <Space direction="vertical" size={12}>
                                                <RangePicker presets={rangePresets} onChange={onRangeChange} size="large" />
                                            </Space>
                                        </div>
                                    </div>

                                    <Button type="primary" size='small' htmlType="button"
                                        onClick={() => removeFromAddTimeSlot(item?.id)} block icon={<FaMinus />}>
                                    </Button>
                                </div>
                            ))
                        }

                    </div>

                </div>

                <div className=" my-2 w-25">
                    <Button type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
                        Add More
                    </Button>
                </div>

                <div className='text-center my-3'>
                    <Button htmlType='submit' type="primary" size='large'>
                        Save
                    </Button>
                </div>
            </form>



        </DashboardLayout>
    )
}

export default Treatment;