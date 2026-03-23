import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Card, Form, Input, Button, message } from 'antd';
import { FaLock } from 'react-icons/fa';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            
            if (values.newPassword !== values.confirmPassword) {
                message.error('New password and confirm password do not match');
                setLoading(false);
                return;
            }

            // API call would go here
            message.info('Change password API needs implementation');
            form.resetFields();
            setLoading(false);
        } catch (error) {
            message.error('Failed to change password');
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">
                        <FaLock style={{ marginRight: '0.5rem' }} />
                        Change Password
                    </h3>
                </div>

                <Card className="password-change-card">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Current Password"
                            name="currentPassword"
                            rules={[
                                { required: true, message: 'Please enter your current password' }
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter current password"
                                prefix={<FaLock />}
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Please enter new password' },
                                { min: 8, message: 'Password must be at least 8 characters' },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: 'Password must contain uppercase, lowercase, and number'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter new password"
                                prefix={<FaLock />}
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm New Password"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Confirm new password"
                                prefix={<FaLock />}
                                size="large"
                            />
                        </Form.Item>

                        <div className="password-requirements">
                            <h4>Password Requirements:</h4>
                            <ul>
                                <li>At least 8 characters long</li>
                                <li>Contains at least one uppercase letter</li>
                                <li>Contains at least one lowercase letter</li>
                                <li>Contains at least one number</li>
                            </ul>
                        </div>

                        <Form.Item className="mt-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                block
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default ChangePassword;
