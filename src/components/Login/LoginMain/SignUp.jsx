import React from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';

const SignUp = () => {
    return (
        <form class="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div class="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Name" />
            </div>
            <div class="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Email" />
            </div>
            {/* {errors.email && <span className="text-warning">This field is required</span>} */}
            <div class="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" placeholder="Password" />
            </div>
            <input className="iBtn" type="submit" value="sign Up" />
            <p className="social-text">Or Sign up with social account</p>
            {/* <SocialMedia handleResponse={handleResponse}/> */}
            <SocialSignUp />
        </form>
    );
};

export default SignUp;