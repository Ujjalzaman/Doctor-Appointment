import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { Button, DatePicker, Space, Tooltip, Popconfirm } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { DatePickerSinglePresets, DiagnosisOptions, DiseaseOptions, DosageOptions, FrequencyOptions, MedicalCheckupOptions, PatientStatus, appointemntStatusOption } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import SelectFormForMedicine from "../../UI/form/SelectFormForMedicine";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";
import { useGetPrescriptionQuery, useUpdatePrescriptionAndAppointmentMutation } from "../../../redux/api/prescriptionApi";
import { useCreateMedicineMutation, useDeleteMedicineMutation, useUpdateMedicineMutation } from "../../../redux/api/medicineApi";
import { useMessageEffect } from "../../../utils/messageSideEffect";
import TreatmentOverview from "./TreatmentOverview";

const TreatmentEdit = () => {
    const [createMedicine, { isLoading: createLoading, isSuccess, isError, error }] = useCreateMedicineMutation();
    const [updateMedicine, { isLoading: updateIsloading, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError }] = useUpdateMedicineMutation();
    const [deleteMedicine, { isLoading: deleteIsloading, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError }] = useDeleteMedicineMutation();
    const [updatePrescriptionAndAppointment, { isLoading: presIsloading, isSuccess: presIsSuccess, isError: presIsError, error: presError }] = useUpdatePrescriptionAndAppointmentMutation();
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetPrescriptionQuery(id);
    const [isReadyData, setIsReadyData] = useState(false);
    const { handleSubmit } = useForm();
    const [selectAppointmentStatus, setSelectAppointmentStatus] = useState('');
    const [patientStatus, setPatientStatus] = useState('');
    const [daignosis, setDaignosis] = useState([]);
    const [disease, setDisease] = useState([]);
    const [medicalCheckup, setMedicalCheckup] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [followUpDate, setFollowUpdate] = useState('');
    const [medicineList, setMedicineList] = useState([]);
    const [addMedicine, setAddMedicine] = useState([]);
    const [nextId, setNextId] = useState(1)

    const defaultDaignosis = data?.daignosis.split(',');
    const defaultDisease = data?.disease.split(',');
    const defatulTests = data?.test.split(',');

    const addField = (e) => {
        e.preventDefault();
        setAddMedicine([...addMedicine, { id: nextId + 1 }])
        setNextId(nextId + 1)
    }

    const removeFromNewMedicineList = (id) => {
        setAddMedicine(addMedicine.filter((item) => item.id !== id))
    }

    const removeFromOldMedicineList = (id) => {
        setMedicineList(medicineList.filter((item) => item.id !== id))
        deleteMedicine(id);
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

        daignosis.length && (obj["daignosis"] = daignosis.join(','))
        disease.length && (obj["disease"] = disease.join(','))
        medicalCheckup.length && (obj["test"] = medicalCheckup.join(','))
        obj.followUpdate = followUpDate;
        obj.instruction = instruction;
        obj.prescriptionId = id;

        const filteredData = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== ''))
        updatePrescriptionAndAppointment({...filteredData});
    }

    const handleUpdateMedicine = (id) => {
        const findData = medicineList.find((item) => item.id === id);
        updateMedicine(findData);
    }

    const handleAddMedicine = () => {
        const updateNewMedicine = addMedicine.map((item) => {
            return {
                ...item, prescriptionId: id
            }
        });
        createMedicine(updateNewMedicine);
    }

    // Side Effect
    useEffect(() => {
        if (data) {
            setIsReadyData(true);
            setMedicineList(data?.medicines)
        }
        if(presIsSuccess){
            navigate('/dashboard/prescription')
        }
    }, [data, presIsSuccess])
    useMessageEffect(presIsloading, presIsSuccess, presIsError, presError, 'Successfully Prescription Updated!');
    useMessageEffect(deleteIsloading, deleteIsSuccess, deleteIsError, deleteError, 'Successfully Medicine deleted!');
    useMessageEffect(createLoading, isSuccess, isError, error, 'Successfully Medicine Added!');
    useMessageEffect(updateIsloading, updateIsSuccess, updateIsError, updateError, 'Successfully Medicine Updated!');

    return (
        <DashboardLayout>
            <TreatmentOverview data={data} isAppointment={true}/>
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
                            {isReadyData &&
                                <SelectForm
                                    showSearch={true}
                                    options={appointemntStatusOption}
                                    setSelectData={setSelectAppointmentStatus}
                                    defaultValue={data?.appointment?.status}
                                />
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Patient Status</h6>
                            </div>
                            {isReadyData &&
                                <SelectForm
                                    showSearch={true}
                                    options={PatientStatus}
                                    setSelectData={setPatientStatus}
                                    defaultValue={data?.appointment?.patientType}
                                />
                            }
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
                                        {isReadyData &&
                                            <SelectForm
                                                mode={true}
                                                options={DiagnosisOptions}
                                                setSelectData={setDaignosis}
                                                defaultValue={defaultDaignosis}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <div>
                                            <label>Disease</label>
                                        </div>
                                        {isReadyData &&
                                            <SelectForm
                                                mode={true}
                                                options={DiseaseOptions}
                                                setSelectData={setDisease}
                                                defaultValue={defaultDisease}
                                            />
                                        }
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
                                    {isReadyData &&
                                        <SelectForm
                                            mode={true}
                                            setSelectData={setMedicalCheckup}
                                            options={MedicalCheckupOptions}
                                            defaultValue={defatulTests}
                                        />
                                    }
                                    <small className="form-text text-muted">Note : Type & Press enter to add new services</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Medicine</h6>
                            {
                                isReadyData && medicineList?.map((item, index) => (
                                    <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>
                                        <div className="col-md-6 mb-3">
                                            <label>Medicine Name</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                    defaultValue={item.medicine}
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
                                                    defaultValue={item?.dosage}
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
                                                    defaultValue={item?.frequency}
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

                                        <div className="text-end">

                                            <Tooltip title="Update Medicine">
                                                <Button type="primary" shape="circle" icon={<FaCheck />} onClick={() => handleUpdateMedicine(item.id)} />
                                            </Tooltip>
                                        </div>

                                        <div className="position-absolute text-end mb-3 top-0">
                                            <Popconfirm
                                                title="Delete medicine"
                                                description="Are you sure to delete this medicine?"
                                                onConfirm={() => removeFromOldMedicineList(item.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button loading={deleteIsloading} danger icon={<FaRegTrashAlt />} />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                ))
                            }

                            {addMedicine.length > 0 &&
                                <>
                                    <div className="card p-3 mb-3" style={{ background: "#e8e8e8" }}>
                                        <h5>Add New Medicine</h5>
                                        {
                                            addMedicine?.map((item, index) => (
                                                <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>

                                                    <div className="col-md-6 mb-3">
                                                        <label>Medicine Name</label>
                                                        <div className="form-group mb-2">
                                                            <InputAutoCompleteForm
                                                                id={item.id}
                                                                medicineList={addMedicine}
                                                                setMedicineList={setAddMedicine}
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
                                                                medicineList={addMedicine}
                                                                setMedicineList={setAddMedicine}
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
                                                                medicineList={addMedicine}
                                                                setMedicineList={setAddMedicine}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label>Start Date / End Date</label>
                                                        <div className="form-group mb-2">
                                                            <Space direction="vertical" size={12}>
                                                                <MedicineRangePickerForm
                                                                    id={item.id}
                                                                    medicineList={addMedicine}
                                                                    setMedicineList={setAddMedicine}
                                                                />

                                                            </Space>
                                                        </div>
                                                    </div>

                                                    <a className="text-danger position-absolute text-end mb-3 top-0"
                                                        onClick={() => removeFromNewMedicineList(item?.id)}>
                                                        <FaRegTrashAlt />
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="text-end">
                                        <Button type="primary" icon={<FaCheck />} onClick={handleAddMedicine} disabled={addMedicine.length === 0}>Add All Medicine</Button>
                                    </div>
                                </>
                            }

                        </div>

                        <div className="mb-4">
                            <Button style={{ width: '120px' }} type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
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
                            {isReadyData &&
                                <TextArea rows={4} placeholder="Instruction text ..." onChange={(e) => setInstruction(e.target.value)} defaultValue={data?.instruction} />
                            }
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large' loading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </DashboardLayout>
    )
}

export default TreatmentEdit;