import DashboardLayout from '../DashboardLayout/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Card, Tag, Button, Empty, message, TimePicker, Modal, Tabs } from 'antd';
import { useCreateTimeSlotMutation, useGetDoctorTimeSlotQuery, useUpdateTimeSlotMutation } from '../../../redux/api/timeSlotApi';
import { FaPlus, FaEdit, FaTrash, FaClock } from "react-icons/fa";
import moment from 'moment';
import './Schedule.css';

const Schedule = () => {
    const [activeDay, setActiveDay] = useState('sunday');
    const [timeSlot, setTimeSlot] = useState([]);
    const [editTimeSlot, setEditTimeSlot] = useState([]);
    const [addTimeSlot, setAddTimeSlot] = useState([{ id: 1 }]);
    const [UpdateTimeSlot, { isError: uIsError, error: uError, isLoading: UIsLoading, isSuccess: uIsSuccess }] = useUpdateTimeSlotMutation();
    const { data, refetch, isLoading, isError } = useGetDoctorTimeSlotQuery({ day: activeDay });
    const [createTimeSlot, { isError: AIsError, error, isLoading: AIsLoading, isSuccess }] = useCreateTimeSlotMutation();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const daysOfWeek = [
        { key: 'sunday', label: 'Sunday' },
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
    ];

    const handleEditOk = () => {
        if (editTimeSlot.length > 0) {
            const { toCreate, toUpdate } = editTimeSlot.reduce((acc, cur) => {
                if (cur.doctorTimeSlotId) {
                    acc.toUpdate.push(cur);
                } else {
                    acc.toCreate.push({ ...cur, day: activeDay })
                }
                return acc;
            }, { toCreate: [], toUpdate: [] });
            UpdateTimeSlot({ timeSlot: toUpdate, create: toCreate })
        }
    };

    useEffect(() => {
        if (!UIsLoading && uIsError) {
            message.error(uError?.data?.message)
        }
        if (uIsSuccess) {
            message.success('Successfully Updated Time Slots')
            setIsEditModalOpen(false);
            setEditTimeSlot([]);
            refetch();
        }
    }, [uIsSuccess, uIsError, UIsLoading, uError?.data?.message])

    const handleEditStartTime = (id, timeString) => {
        const findIndex = timeSlot.find(item => item.id === id);
        const updatedItem = { ...findIndex, startTime: timeString }
        setEditTimeSlot(prev => {
            const indexToUpdate = prev.findIndex(item => item.id === id);
            if (indexToUpdate !== -1) {
                const updatedArray = [...prev];
                updatedArray[indexToUpdate] = updatedItem;
                return updatedArray
            } else {
                return [...prev, updatedItem]
            }
        })
    }

    const handleEditEndTime = (id, timeString) => {
        const findObject = timeSlot.find(item => item.id === id);
        if (findObject) {
            const editedObject = editTimeSlot.find(item => item.id === id);
            const updateObject = editedObject?.id ? { ...editedObject, endTime: timeString } : { ...findObject, endTime: timeString };
            setEditTimeSlot(prev => {
                const findIndex = prev.findIndex(item => item.id === id);
                if (findIndex !== -1) {
                    const updateArray = [...prev];
                    updateArray[findIndex] = updateObject;
                    return updateArray;
                } else {
                    return [...prev, updateObject]
                }
            })
        }
    }

    const handleAddOk = () => {
        const validTimeSlots = addTimeSlot.filter(slot => slot.startTime && slot.endTime);
        if (validTimeSlots.length === 0) {
            message.error('Please add at least one time slot');
            return;
        }
        const timeSlots = validTimeSlots.map(({ id, ...rest }) => rest);
        const data = {
            day: activeDay,
            timeSlot: timeSlots
        }
        createTimeSlot({ data });
    };

    useEffect(() => {
        if (!AIsLoading && AIsError) {
            message.error(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Added Time Slots')
            setIsAddModalOpen(false);
            setAddTimeSlot([{ id: 1 }]);
            refetch();
        }
    }, [isSuccess, AIsError, error?.data?.message, AIsLoading])

    const handleAddStartTime = (id, timeString) => {
        setAddTimeSlot(prev => (prev.map(item => item.id === id ? { ...item, startTime: timeString } : item)));
    }

    const handleAddEndTime = (id, timeString) => {
        setAddTimeSlot(prev => prev.map(item => item.id === id ? { ...item, endTime: timeString } : item));
    }

    const handleDayChange = (day) => {
        setActiveDay(day);
        refetch();
    }

    useEffect(() => {
        if (data && data[0]?.id) {
            setTimeSlot(data[0].timeSlot || [])
        } else {
            setTimeSlot([]);
        }
    }, [data])

    const removeEditSlot = (id) => {
        setTimeSlot(timeSlot.filter((item) => item.id !== id))
    }

    const addEditField = () => {
        const newId = timeSlot.length > 0 ? Math.max(...timeSlot.map(s => s.id)) + 1 : 1;
        setTimeSlot([...timeSlot, { id: newId }])
    }

    const removeAddSlot = (id) => {
        setAddTimeSlot(addTimeSlot.filter((item) => item.id !== id))
    }

    const addNewSlot = () => {
        const newId = addTimeSlot.length > 0 ? Math.max(...addTimeSlot.map(s => s.id)) + 1 : 1;
        setAddTimeSlot([...addTimeSlot, { id: newId }])
    }

    const openEditModal = () => {
        if (data && data[0]?.timeSlot) {
            setTimeSlot(data[0].timeSlot);
            setIsEditModalOpen(true);
        } else {
            message.warning('No schedule available to edit');
        }
    };

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Schedule Timings</h3>
                    <div className="d-flex gap-2">
                        <Button 
                            type="primary" 
                            icon={<FaPlus />}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add Schedule
                        </Button>
                        {data && data[0]?.timeSlot?.length > 0 && (
                            <Button 
                                type="default" 
                                icon={<FaEdit />}
                                onClick={openEditModal}
                            >
                                Edit Schedule
                            </Button>
                        )}
                    </div>
                </div>

                <Tabs
                    activeKey={activeDay}
                    onChange={handleDayChange}
                    items={daysOfWeek.map(day => ({
                        key: day.key,
                        label: day.label,
                    }))}
                />

                <Card loading={isLoading}>
                    {isError && <Empty description="Something went wrong loading schedule" />}
                    
                    {!isLoading && !isError && data?.length === 0 && (
                        <Empty description="No schedule set for this day" />
                    )}
                    
                    {!isLoading && !isError && data?.length > 0 && data[0]?.timeSlot && (
                        <div className="schedule-content">
                            {data[0]?.maximumPatient && (
                                <div className="mb-3">
                                    <h6 className="text-muted">Maximum Patient Limit: {data[0].maximumPatient}</h6>
                                </div>
                            )}
                            <div className="time-slots-grid">
                                {data[0].timeSlot.map((time, index) => (
                                    <div key={index} className="time-slot-card">
                                        <FaClock className="time-icon" />
                                        <div className="time-range">
                                            {time?.startTime} - {time?.endTime}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            <Modal
                title="Edit Time Slots"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={() => setIsEditModalOpen(false)}
                width={700}
                confirmLoading={UIsLoading}
            >
                <div className="time-slot-editor">
                    {timeSlot.map((item, index) => (
                        <div key={index} className="time-slot-row">
                            <div className="time-picker-group">
                                <div>
                                    <label>Start Time</label>
                                    <TimePicker
                                        format="HH:mm"
                                        value={item.startTime ? moment(item.startTime, 'HH:mm') : null}
                                        onChange={(time, timeString) => handleEditStartTime(item.id, timeString)}
                                        style={{ width: '100%' }}
                                        size="large"
                                    />
                                </div>
                                <div>
                                    <label>End Time</label>
                                    <TimePicker
                                        format="HH:mm"
                                        value={item.endTime ? moment(item.endTime, 'HH:mm') : null}
                                        onChange={(time, timeString) => handleEditEndTime(item.id, timeString)}
                                        style={{ width: '100%' }}
                                        size="large"
                                    />
                                </div>
                            </div>
                            <Button
                                danger
                                icon={<FaTrash />}
                                onClick={() => removeEditSlot(item.id)}
                            />
                        </div>
                    ))}
                    <Button
                        type="dashed"
                        icon={<FaPlus />}
                        onClick={addEditField}
                        block
                        className="mt-3"
                    >
                        Add More
                    </Button>
                </div>
            </Modal>

            <Modal
                title="Add Time Slots"
                open={isAddModalOpen}
                onOk={handleAddOk}
                onCancel={() => setIsAddModalOpen(false)}
                width={700}
                confirmLoading={AIsLoading}
            >
                <div className="time-slot-editor">
                    {addTimeSlot.map((item, index) => (
                        <div key={index} className="time-slot-row">
                            <div className="time-picker-group">
                                <div>
                                    <label>Start Time</label>
                                    <TimePicker
                                        format="HH:mm"
                                        value={item.startTime ? moment(item.startTime, 'HH:mm') : null}
                                        onChange={(time, timeString) => handleAddStartTime(item.id, timeString)}
                                        style={{ width: '100%' }}
                                        size="large"
                                    />
                                </div>
                                <div>
                                    <label>End Time</label>
                                    <TimePicker
                                        format="HH:mm"
                                        value={item.endTime ? moment(item.endTime, 'HH:mm') : null}
                                        onChange={(time, timeString) => handleAddEndTime(item.id, timeString)}
                                        style={{ width: '100%' }}
                                        size="large"
                                    />
                                </div>
                            </div>
                            {addTimeSlot.length > 1 && (
                                <Button
                                    danger
                                    icon={<FaTrash />}
                                    onClick={() => removeAddSlot(item.id)}
                                />
                            )}
                        </div>
                    ))}
                    <Button
                        type="dashed"
                        icon={<FaPlus />}
                        onClick={addNewSlot}
                        block
                        className="mt-3"
                    >
                        Add More
                    </Button>
                </div>
            </Modal>
        </DashboardLayout>
    )
}

export default Schedule;
