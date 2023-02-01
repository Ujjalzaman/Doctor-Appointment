import React, { useState } from 'react';
import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useHistory, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import log from '../../../images/doc/info.svg';
import register from '../../../images/doc/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';
import toast, { Toaster } from 'react-hot-toast';


const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    // const history = useNavigate();
    // const location = useLocation();

    const handleResponse = (res) => {
        // setLoggedInUser(res);
        // if (!res.error) {
        //     toast.success("Successfully Sign in")
        //     history.replace(from)
        // }
    }

    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn handleResponse={handleResponse} />
                    <SignUp handleResponse={handleResponse} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button>
                    </div>
                    <img src={`${log}`} alt="" className="pImg" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                    </div>
                    <img src={`${register}`} alt="" className="pImg" />
                </div>
            </div>
        </div>

    );
};

export default SignInForm;