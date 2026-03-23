import React, { useState, useMemo } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Table, Input, Select, Button, Modal, Form, message, Card, Avatar, Space, Tag, Switch } from 'antd';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import { useGetDoctorsQuery, useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import { doctorSpecialistOptions } from '../../../constant/global';
import ImageUploadWithCrop from '../../UI/ImageUploadWithCrop';
import './Doctors.css';

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState(undefined);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    const queryParams = useMemo(() => ({
        limit: pageSize,
        page,
        ...(searchTerm && { searchTerm }),
        ...(specialtyFilter && { specialist: specialtyFilter }),
    }), [page, pageSize, searchTerm, specialtyFilter]);

    const { data, isLoading, refetch } = useGetDoctorsQuery(queryParams);
    const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();

    const doctors = data?.doctors || [];
    const meta = data?.meta || {};

    const handleAddDoctor = () => {
        setEditingDoctor(null);
        setImageFile(null);
        setImagePreview(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setImagePreview(doctor.img);
        form.setFieldsValue({
            ...doctor,
            verified: doctor.verified || false,
        });
        setIsModalVisible(true);
    };

    const handleImageCropped = (file, preview) => {
        setImageFile(file);
        setImagePreview(preview);
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            
            Object.keys(values).forEach(key => {
                if (values[key] !== undefined && values[key] !== null) {
                    formData.append(key, values[key]);
                }
            });

            if (imageFile) {
                formData.append('file', imageFile);
            }

            if (editingDoctor) {
                await updateDoctor({ id: editingDoctor.id, data: formData }).unwrap();
                message.success('Doctor updated successfully');
            } else {
                // Would need a create doctor mutation
                message.info('Create doctor API not yet implemented');
            }

            setIsModalVisible(false);
            form.resetFields();
            setImageFile(null);
            setImagePreview(null);
            refetch();
        } catch (error) {
            message.error('Failed to save doctor');
            console.error(error);
        }
    };

    const handleStatusToggle = async (doctor) => {
        try {
            await updateDoctor({
                id: doctor.id,
                data: { verified: !doctor.verified }
            }).unwrap();
            message.success('Doctor status updated');
            refetch();
        } catch (error) {
            message.error('Failed to update status');
        }
    };

    const columns = [
        {
            title: 'Doctor',
            key: 'doctor',
            width: 250,
            render: (_, record) => (
                <div className="doctor-info">
                    <Avatar 
                        src={record.img} 
                        icon={<FaUserMd />} 
                        size={50}
                        className="doctor-avatar"
                    />
                    <div className="doctor-details">
                        <div className="doctor-name">Dr. {record.firstName} {record.lastName}</div>
                        <div className="doctor-designation">{record.designation}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Specialty',
            dataIndex: 'specialization',
            key: 'specialization',
            width: 180,
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
            width: 120,
        },
        {
            title: 'Clinic',
            key: 'clinic',
            width: 200,
            render: (_, record) => (
                <div>
                    <div>{record.clinicName || 'N/A'}</div>
                    <div className="text-muted small">{record.city}</div>
                </div>
            ),
        },
        {
            title: 'Contact',
            key: 'contact',
            width: 180,
            render: (_, record) => (
                <div>
                    <div className="small">{record.email}</div>
                    <div className="small text-muted">{record.phone}</div>
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 100,
            render: (_, record) => (
                <Switch
                    checked={record.verified}
                    onChange={() => handleStatusToggle(record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<FaEdit />}
                        onClick={() => handleEditDoctor(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout title="Doctors" breadcrumbs={['Admin', 'Doctors']}>
            <Card className="admin-card">
                <div className="table-toolbar">
                    <Input
                        placeholder="Search doctors..."
                        prefix={<FaSearch />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        placeholder="Filter by specialty"
                        value={specialtyFilter}
                        onChange={setSpecialtyFilter}
                        style={{ width: 200 }}
                        allowClear
                        options={[{ label: 'All Specialties', value: null }, ...doctorSpecialistOptions]}
                    />
                    <Button
                        type="primary"
                        icon={<FaPlus />}
                        onClick={handleAddDoctor}
                    >
                        Add Doctor
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={doctors}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize,
                        total: meta.total || 0,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} doctors`,
                        onChange: (p, ps) => {
                            setPage(p);
                            setPageSize(ps);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            <Modal
                title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <div className="doctor-form-image-section">
                        {imagePreview && (
                            <div className="image-preview-container">
                                <Avatar src={imagePreview} size={120} icon={<FaUserMd />} />
                            </div>
                        )}
                        <Button onClick={() => setIsImageModalVisible(true)}>
                            {imagePreview ? 'Change Photo' : 'Upload Photo'}
                        </Button>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter first name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter last name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter email' },
                                    { type: 'email', message: 'Please enter valid email' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Phone" name="phone">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item
                                label="Specialization"
                                name="specialization"
                                rules={[{ required: true, message: 'Please select specialization' }]}
                            >
                                <Select options={doctorSpecialistOptions} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Designation" name="designation">
                                <Input placeholder="MBBS, MD" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Experience" name="experience">
                                <Input placeholder="e.g., 10 years" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Clinic Name" name="clinicName">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item label="Clinic Address" name="clinicAddress">
                                <Input.TextArea rows={2} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="City" name="city">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Consultation Fee" name="price">
                                <Input prefix="$" type="number" />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item name="verified" valuePropName="checked">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                        <span className="ms-2">Active Status</span>
                    </Form.Item>

                    <div className="form-actions">
                        <Button onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isUpdating}>
                            {editingDoctor ? 'Update' : 'Create'} Doctor
                        </Button>
                    </div>
                </Form>
            </Modal>

            <ImageUploadWithCrop
                visible={isImageModalVisible}
                onCancel={() => setIsImageModalVisible(false)}
                onImageCropped={handleImageCropped}
                aspect={1}
                maxSizeMB={0.5}
                cropShape="round"
            />
        </AdminLayout>
    );
};

export default Doctors;
