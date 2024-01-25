import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { useUserLoginMutation } from '../../redux/api/authApi';
import { message } from 'antd';

const SignIn = ({ handleResponse }) => {
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    setTimeout(() => {
        setShow(false);
    }, 10000)
    const [userLogin, {isError, isLoading, isSuccess, error}] = useUserLoginMutation();

    const onSubmit = async (event) => {
        userLogin({...event})
    }
    useEffect(() => {
        if(isError){
            setInfoError(error?.data?.message)
        }
        if(isSuccess){
            message.success('Successfully Logged in');
            navigate("/")
        }
    }, [isError, error, isSuccess, navigate])

    return (
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                <Toast.Header>
                    <strong className="mr-auto">Demo credential</strong>
                </Toast.Header>
                <Toast.Body>Use this account to sign in as a doctor <br />
                    <hr />
                    <div className='bg-dark text-white p-2 px-3 rounded'>
                        email : doctor@gmail.com <br />
                        password : 123456 <br />
                    </div>
                    <hr />
                    <div className='bg-primary p-2 rounded text-white'>
                        Please do not abuse the facility
                    </div>
                </Toast.Body>
            </Toast>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input {...register("email", { required: true })} placeholder="Enter Your Email" type="email" />
            </div>
            {errors.email && <span className="text-danger">This field is required</span>}
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input {...register("password", { required: true })} type="password" placeholder="Enter Your Password" />
            </div>
            {errors.password && <span className="text-danger">This field is required</span>}
            {infoError && <p className="text-danger">{infoError}</p>}
            <button className="iBtn" type="submit" value="sign In" >
                {isLoading ? <Spinner animation="border" variant="info" /> : "Sign In"}
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <SocialSignUp handleResponse={handleResponse} />
        </form>
    );
};

export default SignIn;