import React, { useState } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Card, Table, Button, Modal, Form, Input, message, Space, Tag } from 'antd';
import { FaPlus, FaEdit, FaTrash, FaStethoscope } from 'react-icons/fa';
import { doctorSpecialistArray } from '../../../constant/global';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import './Specialites.css';

const Specialites = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSpecialty, setEditingSpecialty] = useState(null);
    const [form] = Form.useForm();

    const { data: doctorsData } = useGetDoctorsQuery({ limit: 100 });
    const doctors = doctorsData?.doctors || [];

    const specialtiesWithCount = doctorSpecialistArray.map(spec => ({
        ...spec,
        doctorCount: doctors.filter(d => d.specialization === spec.value).length
    }));

    const handleAdd = () => {
        setEditingSpecialty(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (specialty) => {
        setEditingSpecialty(specialty);
        form.setFieldsValue(specialty);
        setIsModalVisible(true);
    };

    const handleSubmit = (values) => {
        message.info('Specialty CRUD API not yet implemented');
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Specialty',
            content: 'Are you sure you want to delete this specialty?',
            onOk: () => {
                message.info('Delete API not yet implemented');
            },
        });
    };

    const columns = [
        {
            title: 'Specialty',
            dataIndex: 'value',
            key: 'value',
            render: (text) => (
                <div className="specialty-name">
                    <FaStethoscope className="specialty-icon" />
                    {text}
                </div>
            ),
        },
        {
            title: 'Doctors',
            dataIndex: 'doctorCount',
            key: 'doctorCount',
            width: 150,
            render: (count) => (
                <Tag color={count > 0 ? 'blue' : 'default'}>
                    {count} doctor{count !== 1 ? 's' : ''}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<FaEdit />}
                        onClick={() => handleEdit(record)}
                        size="small"
                    />
                    <Button
                        type="link"
                        danger
                        icon={<FaTrash />}
                        onClick={() => handleDelete(record.id)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout title="Specialties" breadcrumbs={['Admin', 'Specialties']}>
            <Card className="admin-card">
                <div className="table-toolbar">
                    <div></div>
                    <Button
                        type="primary"
                        icon={<FaPlus />}
                        onClick={handleAdd}
                    >
                        Add Specialty
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={specialtiesWithCount}
                    rowKey="id"
                    pagination={{
                        pageSize: 15,
                        showTotal: (total) => `Total ${total} specialties`,
                    }}
                />
            </Card>

            <Modal
                title={editingSpecialty ? 'Edit Specialty' : 'Add Specialty'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Specialty Name"
                        name="value"
                        rules={[{ required: true, message: 'Please enter specialty name' }]}
                    >
                        <Input placeholder="e.g., Cardiologist" />
                    </Form.Item>

                    <div className="form-actions">
                        <Button onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {editingSpecialty ? 'Update' : 'Create'} Specialty
                        </Button>
                    </div>
                </Form>
            </Modal>
        </AdminLayout>
    );
};

export default Specialites;
