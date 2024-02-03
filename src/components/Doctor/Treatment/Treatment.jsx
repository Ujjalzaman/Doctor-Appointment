import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, DatePicker, Space } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";
import './index.css';
import { BronchitisOptions, DatePickerSinglePresets, DiagnosisOptions, DiseaseOptions, DosageOptions, FrequencyOptions, MedicalCheckupOptions, PatientStatus, appointemntStatusOption } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import SelectFormForMedicine from "../../UI/form/SelectFormForMedicine";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";

const Treatment = () => {
    const { handleSubmit } = useForm({});
    const [selectAppointmentStatus, setSelectAppointmentStatus] = useState('');
    const [patientStatus, setPatientStatus] = useState('');
    const [daignosis, setDaignosis] = useState([]);
    const [disease, setDisease] = useState([]);
    const [bronchitis, setBronchitis] = useState([]);
    const [medicalCheckup, setMedicalCheckup] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [followUpDate, setFollowUpdate] = useState('');
    const [medicineList, setMedicineList] = useState([{ id: 1, medicine: '' }]);

    const addField = (e) => {
        e.preventDefault();
        setMedicineList([...medicineList, { id: medicineList.length + 1 }])
    }

    const removeFromAddTimeSlot = (id) => {
        setMedicineList(medicineList.filter((item) => item.id !== id))
    }

    const handleFollowUpChange = (date) => {
        if (date) {
            setFollowUpdate(dayjs(date).format());
        }
    };

    const onSubmit = (data) => {
        const obj = {};
        obj.status = selectAppointmentStatus;
        obj.patientType = patientStatus;
        obj.daignosis = daignosis;
        obj.disease = disease;
        obj.bronchitis = bronchitis;
        obj.test = medicalCheckup;
        obj.followUpDate = followUpDate;
        obj.instruction = instruction;
        obj.medicine = medicineList

        console.log(obj)
    }

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

                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Appointment Status</h6>
                            </div>
                            <SelectForm
                                showSearch={true}
                                options={appointemntStatusOption}
                                setSelectData={setSelectAppointmentStatus}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Patient Status</h6>
                            </div>
                            <SelectForm
                                showSearch={true}
                                options={PatientStatus}
                                setSelectData={setPatientStatus}
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
                                        <SelectForm
                                            mode={true}
                                            options={DiagnosisOptions}
                                            setSelectData={setDaignosis}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Disease</label>
                                        </div>
                                        <SelectForm
                                            mode={true}
                                            options={DiseaseOptions}
                                            setSelectData={setDisease}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Bronchitis</label>
                                        </div>
                                        <SelectForm
                                            mode={true}
                                            options={BronchitisOptions}
                                            setSelectData={setBronchitis}
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
                                    <SelectForm
                                        mode={true}
                                        setSelectData={setMedicalCheckup}
                                        options={MedicalCheckupOptions}
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
                                medicineList?.map((item, index) => (
                                    <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>
                                        <div className="col-md-6 mb-3">
                                            <label>Medicine Name</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Dosage</label>
                                            <div className="form-group mb-2">
                                                <SelectFormForMedicine
                                                    id={item.id}
                                                    keyName={"dosage"}
                                                    options={DosageOptions}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Frequency</label>
                                            <div className="form-group mb-2">
                                                <SelectFormForMedicine
                                                    id={item.id}
                                                    keyName={"frequency"}
                                                    options={FrequencyOptions}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Start Date / End Date</label>
                                            <div className="form-group mb-2">
                                                <Space direction="vertical" size={12}>
                                                    <MedicineRangePickerForm
                                                        id={item.id}
                                                        medicineList={medicineList}
                                                        setMedicineList={setMedicineList}
                                                    />
                                                    
                                                </Space>
                                            </div>
                                        </div>

                                        <a className="text-danger position-absolute text-end mb-3"
                                            onClick={() => removeFromAddTimeSlot(item?.id)} style={{ top: '-35px' }}>
                                            <FaRegTrashAlt />
                                        </a>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mb-4" style={{ width: '120px' }}>
                            <Button type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <label>Follow Up Date</label>
                        <div className="form-group mb-2">
                            <DatePicker
                                presets={DatePickerSinglePresets}
                                onChange={handleFollowUpChange}
                                showTime
                                size="large"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="form-group mb-2">
                            <label>Instruction</label>
                            <TextArea rows={4} placeholder="Instruction text ..." onChange={(e) => setInstruction(e.target.value)} />
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