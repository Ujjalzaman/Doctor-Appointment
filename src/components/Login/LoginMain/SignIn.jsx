import React from 'react';
import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import infoIcon from '../../../images/doc/infos.svg';
import SocialSignUp from './SocialSignUp';
const SignIn = () => {
    const [show, setShow] = useState(true);
    setTimeout(() => {
        setShow(false)
    }, 10000)


    return (
        <form class="sign-in-form">
            <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                <Toast.Header>
                    <img src={`${infoIcon}`} className="circle mr-2 toastIcon" alt="" />
                    <strong className="mr-auto">Important Info</strong>
                </Toast.Header>
                <Toast.Body>Use this account to sign in as a admin, to test admin panel. Sign in with different account as a user</Toast.Body>
            </Toast>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input defaultValue='test@admin.com' placeholder="Email" />
            </div>
            {/* {errors.email && <span className="text-warning">This field is required</span>} */}
            <div class="input-field">
                <span className="fIcon"><FaLock /></span>
                <input defaultValue="asdf1234" type="password" placeholder="Password" />
            </div>
            {/* {errors.password && <span className="text-warning">This field is required</span>} */}
            <input className="iBtn" type="submit" value="sign In" />
            <p class="social-text">Or Sign in with social platforms</p>
            {/* <SocialMedia handleResponse={handleResponse}/> */}
            <SocialSignUp />
        </form>
    );
};

export default SignIn;