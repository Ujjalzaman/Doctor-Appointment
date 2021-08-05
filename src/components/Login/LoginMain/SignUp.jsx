import React, { useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { createAccountWithEmail } from './LoginManager';

// password regex
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
const SignUp = ({ handleResponse }) => {
    // const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({})
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    })
    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }
    const hanldeOnSubmit = (e) => {
        createAccountWithEmail(user.displayName, user.email, user.password)
            .then(res => {
                handleResponse(res)
                alert("Signed Up")
            }).catch(error => {
                console.log(error)
            })

        e.preventDefault();
    }
    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Name" name="displayName" type="text" onChange={(e) => hanldeOnChange(e)} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Email" name="email" type="email" onChange={(e) => hanldeOnChange(e)} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="password" onChange={(e) => hanldeOnChange(e)} />
            </div>
            {/* <input className="iBtn" type="submit" value="sign Up" /> */}
            <button type="submit"
                className="btn btn-primary btn-block mt-2 iBtn"
                disabled={
                    passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : true
                }
            >
                Submit
            </button>

            <div className="password-validatity mx-auto">

                <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Must Have Valid Email.</p>
                </div>

                <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have atlast 8 character.</p>
                </div>

                <div style={passwordValidation.specailChar ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have a special cracter.</p>
                </div>

                <div style={passwordValidation.upperLowerCase ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have uppercase and lower case.</p>
                </div>

                <div style={passwordValidation.numeric ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have Number.</p>
                </div>
            </div>

            <p className="social-text">Or Sign up with social account</p>
            <SocialSignUp />
        </form>

    );
};

export default SignUp;