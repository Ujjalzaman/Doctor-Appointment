import React, { useState } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Card, Form, Input, Button, Avatar, message, Tabs } from 'antd';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import ImageUploadWithCrop from '../../UI/ImageUploadWithCrop';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import './Profile.css';

const Profile = () => {
    const { data: user } = useAuthCheck();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [imagePreview, setImagePreview] = useState(user?.img || null);
    const [imageFile, setImageFile] = useState(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageCropped = (file, preview) => {
        setImageFile(file);
        setImagePreview(preview);
    };

    const handleUpdateProfile = async (values) => {
        try {
            setLoading(true);
            message.info('Profile update API needs implementation');
            setLoading(false);
        } catch (error) {
            message.error('Failed to update profile');
            setLoading(false);
        }
    };

    const handleChangePassword = async (values) => {
        try {
            setLoading(true);
            if (values.newPassword !== values.confirmPassword) {
                message.error('Passwords do not match');
                return;
            }
            message.info('Change password API needs implementation');
            passwordForm.resetFields();
            setLoading(false);
        } catch (error) {
            message.error('Failed to change password');
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Profile" breadcrumbs={['Admin', 'Profile']}>
            <div className="row">
                <div className="col-md-4">
                    <Card className="profile-sidebar-card">
                        <div className="profile-avatar-section">
                            <Avatar src={imagePreview} icon={<FaUser />} size={120} />
                            <Button
                                type="primary"
                                onClick={() => setIsImageModalVisible(true)}
                                className="mt-3"
                            >
                                Change Photo
                            </Button>
                        </div>
                        <div className="profile-info-section">
                            <h3>{user?.firstName} {user?.lastName}</h3>
                            <p className="text-muted">{user?.email}</p>
                            <p className="text-muted">Administrator</p>
                        </div>
                    </Card>
                </div>

                <div className="col-md-8">
                    <Card className="profile-details-card">
                        <Tabs
                            items={[
                                {
                                    key: '1',
                                    label: 'Profile Information',
                                    children: (
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            initialValues={{
                                                firstName: user?.firstName || '',
                                                lastName: user?.lastName || '',
                                                email: user?.email || '',
                                                phone: user?.phone || '',
                                            }}
                                            onFinish={handleUpdateProfile}
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="First Name"
                                                        name="firstName"
                                                        rules={[{ required: true, message: 'Please enter first name' }]}
                                                    >
                                                        <Input prefix={<FaUser />} />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Last Name"
                                                        name="lastName"
                                                        rules={[{ required: true, message: 'Please enter last name' }]}
                                                    >
                                                        <Input prefix={<FaUser />} />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    { required: true, message: 'Please enter email' },
                                                    { type: 'email', message: 'Please enter valid email' }
                                                ]}
                                            >
                                                <Input prefix={<FaEnvelope />} />
                                            </Form.Item>
                                            <Form.Item label="Phone" name="phone">
                                                <Input prefix={<FaPhone />} />
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit" loading={loading}>
                                                Update Profile
                                            </Button>
                                        </Form>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Change Password',
                                    children: (
                                        <Form
                                            form={passwordForm}
                                            layout="vertical"
                                            onFinish={handleChangePassword}
                                        >
                                            <Form.Item
                                                label="Current Password"
                                                name="currentPassword"
                                                rules={[{ required: true, message: 'Please enter current password' }]}
                                            >
                                                <Input.Password prefix={<FaLock />} />
                                            </Form.Item>
                                            <Form.Item
                                                label="New Password"
                                                name="newPassword"
                                                rules={[
                                                    { required: true, message: 'Please enter new password' },
                                                    { min: 6, message: 'Password must be at least 6 characters' }
                                                ]}
                                            >
                                                <Input.Password prefix={<FaLock />} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                rules={[{ required: true, message: 'Please confirm password' }]}
                                            >
                                                <Input.Password prefix={<FaLock />} />
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit" loading={loading}>
                                                Change Password
                                            </Button>
                                        </Form>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </div>
            </div>

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

export default Profile;
