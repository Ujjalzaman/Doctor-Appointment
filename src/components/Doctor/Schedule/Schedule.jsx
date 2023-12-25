import './Schedule.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { Space, Tag, Button, Empty, Modal, TimePicker } from 'antd';
import { useCreateTimeSlotMutation, useGetDoctorTimeSlotQuery } from '../../../redux/api/timeSlotApi';
import { FaWindowClose, FaPlus } from "react-icons/fa";
import UseModal from '../../UI/UseModal';
import toast, { Toaster } from 'react-hot-toast';

const Schedule = () => {
    const [key, setKey] = useState('sunday');
    const [timeSlot, setTimeSlot] = useState([]);
    const [addTimeSlot, setAddTimeSlot] = useState([{ id: 1 }]);
    const { data, refetch, isLoading, isError } = useGetDoctorTimeSlotQuery({ day: key });
    const [createTimeSlot, { isError: AIsError, error, isLoading: AIsLoading, isSuccess }] = useCreateTimeSlotMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(!isModalOpen) };
    const handleCancel = () => { setIsModalOpen(false) };
    const showEditModal = () => { setIsEditModalOpen(!isEditModalOpen) };
    const handleEditOk = () => { setIsEditModalOpen(!isEditModalOpen) };
    const handleEditCancel = () => { setIsEditModalOpen(!isEditModalOpen) };

    const handleOk = () => {
        const timeSlot = addTimeSlot.map(item => {
            const { id, ...rest } = item;
            return rest;
        })
        const data = {
            day: key,
            timeSlot: timeSlot
        }
        createTimeSlot({ data });
        setIsModalOpen(AIsLoading ? true : false)
    };
    useEffect(() => {
        if (!AIsLoading && AIsError) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success('Successfully Add Time Slots')
        }
    }, [isSuccess, AIsError])

    const handleStartTime = (id, time, timeString) => {
        const myChange = addTimeSlot.map((item) => item.id === id ? { ...item, startTime: timeString } : item);
        setAddTimeSlot(myChange)
    }

    const handleEndTime = (id, time, timeString) => {
        const myChange = addTimeSlot.map((item) => item.id === id ? { ...item, endTime: timeString } : item);
        setAddTimeSlot(myChange)
    }

    const handleOnSelect = (value) => {
        setKey(value);
        refetch();
    }

    useEffect(() => {
        if (data && data[0]?.id) {
            setTimeSlot(data[0].timeSlot)
        }
    }, [data])


    const remove = (id) => {
        setTimeSlot(timeSlot.filter((item) => item.id !== id))
    }
    const addField = (e) => {
        const newId = timeSlot.length + 1;
        setTimeSlot([...timeSlot, { id: newId }])
        e.preventDefault();
    }

    const removeFromAddTimeSlot = (id) => {
        setAddTimeSlot(addTimeSlot.filter((item) => item.id !== id))
    }
    const addInAddTimeSlot = (e) => {
        const newId = addTimeSlot.length + 1;
        setAddTimeSlot([...addTimeSlot, { id: newId }])
        e.preventDefault();
    }

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty />
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, index) => (
                    <div key={item.id + index}>
                        <div>
                            {item?.maximumPatient && <h6>Maximum Patient Limit : {item?.maximumPatient}</h6>}
                        </div>
                        <Space size={[0, 'small']} wrap>
                            {
                                item?.timeSlot && item?.timeSlot.map((time, index) => (
                                    <Tag bordered={false} closable color="processing" key={index + 2}>
                                        {time?.startTime} - {time?.endTime}
                                    </Tag>
                                ))
                            }
                        </Space>
                    </div>
                ))
            }
        </>
    return (
        <DashboardLayout>
            <Toaster />
            <h4 className="card-title">Schedule Timings</h4>
            <Tabs
                defaultActiveKey="sunday"
                id="uncontrolled-tab-example-schedule"
                className="mb-3"
                onSelect={(k) => handleOnSelect(k)}
            >
                <Tab eventKey="sunday" title="Sunday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
                <Tab eventKey="monday" title="Monday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
                <Tab eventKey="tuesday" title="TuesDay">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
                <Tab eventKey="wednesday" title="Wednesday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
                <Tab eventKey="thursday" title="Thursday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        <div>
                            {
                                <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                    {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                                </Button>
                            }
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="friday" title="Friday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
                <Tab eventKey="saturday" title="Saturday">
                    <div className='d-flex justify-content-between'>
                        {content}
                        {
                            <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                            </Button>
                        }
                    </div>
                </Tab>
            </Tabs>

            <UseModal title="Edit Time Slots" isModaOpen={isEditModalOpen} handleOk={handleEditOk} handleCancel={handleEditCancel}>
                <form>
                    <div className="hours-info">
                        <div className="row form-row hours-cont">
                            {
                                timeSlot && timeSlot?.map((item, index) => (
                                    <div className="col-12 col-md-10 d-flex align-items-center justify-content-between" key={index + item.id}>
                                        <div className="row form-row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Start Time</label>
                                                    <TimePicker use12Hours format="h:mm a" onChange={handleStartTime} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>End Time</label>
                                                    <TimePicker use12Hours format="h:mm a" onChange={handleEndTime} />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="primary" size='small' htmlType="submit" onClick={() => remove(item?.id)} block icon={<FaWindowClose />}>
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className=" my-2 w-25">
                        <Button type="primary" size='small' htmlType="submit" onClick={(e) => addField(e)} block icon={<FaPlus />}>
                            Add More
                        </Button>
                    </div>
                </form>
            </UseModal>

            <UseModal title="Add Time Slots" isModaOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}>
                <form>
                    <div className="hours-info">
                        <div className="row form-row hours-cont">
                            {
                                addTimeSlot && addTimeSlot?.map((item, index) => (
                                    <div className="col-12 col-md-10 d-flex align-items-center justify-content-between" key={index + 100}>
                                        <div className="row form-row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Start Time</label>
                                                    <TimePicker use12Hours format="h:mm a" onChange={(time, timeString) => handleStartTime(item.id, time, timeString)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>End Time</label>
                                                    <TimePicker use12Hours format="h:mm a" onChange={(time, timeString) => handleEndTime(item.id, time, timeString)} />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="primary" size='small' htmlType="submit" onClick={() => removeFromAddTimeSlot(item?.id)} block icon={<FaWindowClose />}>
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className=" my-2 w-25">
                        <Button type="primary" size='small' htmlType="submit" onClick={(e) => addInAddTimeSlot(e)} block icon={<FaPlus />}>
                            Add More
                        </Button>
                    </div>
                </form>
            </UseModal>


        </DashboardLayout >
    )
}

export default Schedule