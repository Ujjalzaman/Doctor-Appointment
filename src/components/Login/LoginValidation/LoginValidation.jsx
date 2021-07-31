import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './LoginValidation.css';

// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

const LoginValidation = () => {
    const [password, setPassword] = useState({})
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
            const newPass = { ...password };
            newPass[name] = value
            setPassword(newPass)
        }
    }

    const hanldeOnSubmit = (e) => {
        console.log(password)
        console.log(passwordValidation)
        e.preventDefault()
    }

    return (
        <>
            <div title="Signup Form LoginValidation mt-5" />
            <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                    <div className="card bg-light">
                        <article
                            className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            <h4 className="card-title mt-3 text-center">
                                Create Account
                            </h4>

                            <form action="" onSubmit={hanldeOnSubmit}>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FaUser />
                                        </span>
                                    </div>
                                    <input onChange={(e) => hanldeOnChange(e)} name="name" className="form-control" placeholder="Full name" type="text" />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FaEnvelope />
                                        </span>
                                    </div>
                                    <input onChange={(e) => hanldeOnChange(e)} name="email" className="form-control" placeholder="Email address" type="email"
                                    />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>
                                    </div>
                                    <input onChange={(e) => hanldeOnChange(e)} className="form-control" placeholder="Create password" type='password' name="password" />

                                </div>

                                <div className="password-validatity">

                                    <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                                        Must Have to Email Valid
                                    </div>

                                    <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                                        Password Must Have atlast 8 character
                                    </div>

                                    <div style={passwordValidation.specailChar ? { color: "green" } : { color: "red" }}>
                                        Password Must Have a special cracter
                                    </div>

                                    <div style={passwordValidation.upperLowerCase ? { color: "green" } : { color: "red" }}>
                                        Password Must Have uppercase and lower case
                                    </div>

                                    <div style={passwordValidation.numeric ? { color: "green" } : { color: "red" }}>
                                        Password Must Have Number
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button type="submit"
                                        className="btn btn-primary btn-block mt-2"
                                        // disabled=""
                                        disabled={
                                            passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : "true"
                                        }
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </article>
                    </div>


                </div>
            </div>

        </>

    );
};

export default LoginValidation;