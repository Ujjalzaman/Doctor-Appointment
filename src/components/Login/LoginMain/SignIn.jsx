import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Toast } from 'react-bootstrap';

const SignIn = ({ handleResponse }) => {
    const { user, loading, error, dispatch } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [show, setShow] = useState(true);

    setTimeout(() => {
        setShow(false);
    }, 10000)

    const onSubmit = async (event) => {
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post(`${baseUrl}/auth/login`, event);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            swal({
                icon: 'success',
                text: 'Successfully Sign In',
                timer: 2000
            })
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }

    return (
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                <Toast.Header>
                    <strong className="mr-auto">Important Info</strong>
                </Toast.Header>
                <Toast.Body>Use this account to sign in as a admin <br />
                    <hr />
                    <div className='bg-dark text-white p-2 px-3 rounded'>
                        email : Admin@gmail.com <br />
                        password : 1234 <br />
                    </div>
                    <hr />
                    <div className='bg-primary p-2 rounded text-white'>
                        Please Don't abuse the facility
                    </div>
                </Toast.Body>
            </Toast>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input {...register("email", { required: true })} placeholder="Enter Your Email" type="email" />
            </div>
            {errors.email && <span className="text-warning">This field is required</span>}
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input {...register("password", { required: true })} type="password" placeholder="Enter Your Password" />
            </div>
            {errors.password && <span className="text-warning">This field is required</span>}
            {error && <p className="text-danger">{error.message}</p>}
            <button className="iBtn" type="submit" value="sign In" >
                {loading ? <Spinner animation="border" variant="info" /> : "Sign In"}
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <SocialSignUp handleResponse={handleResponse} />
        </form>
    );
};

export default SignIn;