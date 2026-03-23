import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from 'react-hook-form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { useResetPasswordMutation, useUserLoginMutation } from '../../redux/api/authApi';
import { message } from 'antd';
import { useMessageEffect } from '../../utils/messageSideEffect';
import { decodeToken } from '../../utils/jwt';

const SignIn = ({ handleResponse }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userLogin, { isLoading }] = useUserLoginMutation();
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetPassword, { isError: resetIsError, isSuccess: resetIsSuccess, error: resetError, isLoading: resetIsLoading }] = useResetPasswordMutation();

    useEffect(() => {
        const t = setTimeout(() => setShow(false), 12000);
        return () => clearTimeout(t);
    }, []);

    const onSubmit = async (formData) => {
        setInfoError('');
        try {
            const result = await userLogin({ ...formData }).unwrap();
            message.success('Successfully Logged in');
            const payload = decodeToken(result.accessToken);
            if (payload.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            const msg = err?.data?.message || 'Login failed';
            message.error(msg);
            setInfoError(typeof msg === 'string' ? msg : '');
        }
    };

    const onHandleForgotPassword = async (e) => {
        e.preventDefault();
        resetPassword({ email: forgotEmail });
        setForgotEmail('');
        setShowForgotPassword(false);
    };

    useMessageEffect(resetIsLoading, resetIsSuccess, resetIsError, resetError, 'Successfully Reset Password, Please check your Email!!');

    const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <>
            {showForgotPassword ? (
                <form className="sign-in-form" onSubmit={onHandleForgotPassword}>
                    <h2 className="title">Forgot Password</h2>
                    <div>To Forgot Your Password Please Enter your email</div>
                    <div className="input-field">
                        <span className="fIcon"><FaEnvelope /></span>
                        <input
                            value={forgotEmail !== undefined && forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            type="email"
                            required
                        />
                    </div>
                    <div onClick={handleShowForgotPassword} className="text-bold" style={{ cursor: 'pointer', color: '#4C25F5' }}>
                        Stil Remember Password ?
                    </div>
                    <button className="iBtn" type="submit" value="sign In">
                        {resetIsLoading ? <Spinner animation="border" variant="info" /> : 'Submit'}
                    </button>
                </form>
            ) : (
                <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                    <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                        <Toast.Header>
                            <strong className="mr-auto">Fair use &amp; demo access</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <p className="mb-2 small">
                                Please do not misuse this app. Do not create extra accounts unless you need them for testing.
                                Respect others&apos; data and availability.
                            </p>
                            <hr />
                            <div className="small mb-2">
                                <strong>Patient</strong> — sign in with your registered email and password (e.g. demo:{' '}
                                <code>patient@gmail.com</code> / <code>123456</code> if that user exists in your database).
                            </div>
                            <div className="bg-dark text-white p-2 px-3 rounded small mb-2">
                                <strong>Doctor</strong>
                                <br />
                                email: doctor@gmail.com
                                <br />
                                password: 123456
                            </div>
                            <div className="bg-secondary text-white p-2 px-3 rounded small mb-2">
                                <strong>Admin</strong>
                                <br />
                                Use an Auth row with <code>role = admin</code> (e.g. <code>admin@gmail.com</code> / your password).
                                <br />
                                Set <code>isDemo = true</code> on that row for a read-only demo admin (can view everything, cannot change data).
                            </div>
                            <div className="bg-primary p-2 rounded text-white small">
                                Replace demo emails/passwords with your own seeded users as needed.
                            </div>
                        </Toast.Body>
                    </Toast>
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <span className="fIcon"><FaEnvelope /></span>
                        <input {...register('email', { required: true })} placeholder="Enter Your Email" type="email" />
                    </div>
                    {errors.email && <span className="text-danger">This field is required</span>}
                    <div className="input-field">
                        <span className="fIcon"><FaLock /></span>
                        <input {...register('password', { required: true })} type="password" placeholder="Enter Your Password" />
                    </div>
                    {errors.password && <span className="text-danger">This field is required</span>}
                    {infoError && <p className="text-danger">{infoError}</p>}
                    <div onClick={handleShowForgotPassword} className="text-bold" style={{ cursor: 'pointer', color: '#4C25F5' }}>
                        Forgot Password ?
                    </div>
                    <button className="iBtn" type="submit" value="sign In">
                        {isLoading ? <Spinner animation="border" variant="info" /> : 'Sign In'}
                    </button>
                    <p className="social-text">Or Sign in with social platforms</p>
                    <SocialSignUp handleResponse={handleResponse} />
                </form>
            )}
        </>
    );
};

export default SignIn;
