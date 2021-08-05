import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import { hanldeSignInWithEmailAndPass } from './LoginManager';


const SignIn = ({ handleResponse }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const { email, password } = data
        hanldeSignInWithEmailAndPass(email, password)
            .then(res => {
                handleResponse(res)
            })
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
            <input className="iBtn" type="submit" value="sign In" />
            <p className="social-text">Or Sign in with social platforms</p>
            <SocialSignUp handleResponse={handleResponse} />
        </form>
    );
};

export default SignIn;