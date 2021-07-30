import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import './SingUp.css';
import { useForm } from "react-hook-form";


const SignUp = () => {
    const [signup, setSignup] = useState(true)
    const handleFrom = () => {
        setSignup(!signup)
    }

    // regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    // regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        data.preventDefault();
    };
    return (
        <>
            <div className="Singup">
                <div className="row">
                    <div className="col-md-5 mx-auto">

                        {
                            signup ? (
                                <div id="first">
                                    <div className="myform form">
                                        <div className="logo mb-3">
                                            <div className="col-md-12 text-center">
                                                <h1>Login</h1>
                                            </div>
                                        </div>
                                        <form action="" method="">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="email" {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className="form-control" name="email" id="email" placeholder="Enter Your Email" />
                                                {errors.email && "email is not found or Invalid"}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="password">Password</label>
                                                <input type="text" {...register('password', { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} className="form-control" name="password" id="password" placeholder="Enter Your Password" />
                                                {errors.password && "password is incorrect"}
                                            </div>

                                            <div className="col-md-12 texd-center mt-3">
                                                <button className="btn btn-block mybtn btn-primary tx-tfm" type="submit">Login</button>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="login-or">
                                                    <hr className="hr-or" />
                                                    <span className="span-or">or</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 b-3">
                                                <p className="text-center">
                                                    <FaGoogle className="google" />
                                                    <span>Singup Using Google</span>
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <p className="text-center">Don't have account ?
                                                    <span id="singup" className="s-button" onClick={handleFrom}>Sign Up Here</span>
                                                </p>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div id="second">
                                    <div className="myform form">
                                        <div className="logo mb-3">
                                            <div className="col-md-12 text-center">
                                                <h1>SingUp</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <form action="" name="" onSubmit={handleSubmit(onSubmit)}>

                                        <div className="form-group">
                                            <label for="exampleInputEmail1">First Name</label>
                                            <input type="text" {...register('rfirstName', { required: true })} name="rfirstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Last Name</label>
                                            <input type="text" {...register('rlastName')} name="rlastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter Lastname" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" {...register('remail', { required: true })} name="remail" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Password</label>
                                            <input type="password" {...register('rpassword', { required: true })} name="rpassword" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12 text-center mb-3 mt-2">
                                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Sign Up</button>
                                            </div>
                                        </div>


                                    </form>
                                    <div className="col-md-12 ">
                                        <div className="form-group">
                                            <p className="text-center s-button"><span id="signin" onClick={handleFrom}>Already have an account?</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }





                    </div>
                </div>
            </div>
        </>



    );
};

export default SignUp;