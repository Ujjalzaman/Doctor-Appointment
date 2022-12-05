import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';


const SignIn = ({ handleResponse }) => {
    const {user, loading, error, dispatch} = useContext(AuthContext);
    // const [loading, setLoading] = useState(false);
    const [err, setErr] = useState({})
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async(event) => {
        dispatch({type: "LOGIN_START"})
        try{
            const res = await axios.post('http://localhost:5000/auth/login', event);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
            // setLoading(false)
            console.log(err)
            setErr(err);
        }

        //REMOVE ONLY ==>  Sign In code --- Authentication with firebase
        // ===================================================
        // hanldeSignInWithEmailAndPass(email, password)
        //     .then(res => {
        //         handleResponse(res)
        //         setLoading(true)
        //         if (res.error) {
        //             setLoading(false)
        //             setErr(res.error)
        //         }
        //     })

        console.log(user, loading, error);

    }

    return (
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
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
            {error && <p className="text-danger">{error}</p>}
            <button className="iBtn" type="submit" value="sign In" >
                {loading ? <Spinner animation="border" variant="info" /> : "Sign In"}
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <SocialSignUp handleResponse={handleResponse} />
        </form>
    );
};

export default SignIn;