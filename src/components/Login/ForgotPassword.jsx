import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetConfirmMutation } from '../../redux/api/authApi';

const ForgotPassword = () => {
    const [matchePass, setMatchPass] = useState(true);
    const { userId, uniqueString } = useParams();
    const navigate = useNavigate();
    const [resetConfirm, { isError, isLoading, isSuccess, error }] = useResetConfirmMutation();

    const onFinish = (values) => {
        const { password, rePassword } = values
        if (password && password === rePassword) {
            setMatchPass(true);
            const obj = { password, userId, uniqueString }
            resetConfirm(obj);
        } else {
            setMatchPass(false)
        }
    };

    useEffect(() => {
        if (isError) {
            message.error(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Password changed');
            navigate("/login")
        }
    }, [isError, error, isSuccess, navigate])
    return (
        <>
            <Header />
            <div className='d-flex justify-content-center'>
                <div style={{ marginTop: '8rem', marginBottom: '8rem', minWidth: "450px" }} >
                    <div className='card bg-white shadow p-3 border-0'>
                        <div>
                            <Form
                                layout="vertical"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item label="Re-enter Password" name="rePassword" rules={[{ required: true, message: 'Please re-enter your password!' }]}>
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" disabled={isLoading} htmlType="submit" loading={isLoading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            {!matchePass && <p className='text-danger'>Password is not Matched</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword