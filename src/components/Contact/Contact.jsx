import React from 'react'
import Footer from '../Shared/Footer/Footer'
import { useForm } from 'react-hook-form';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from '../Shared/Header/Header';
import './index.css';

const Contact = () => {
    const { register, handleSubmit } = useForm({});
    const onSubmit = (data) => {

    };
    return (
        <>
            <Header />
            <section id="contact" className="contact">
                <div className="container">

                    <div className="section-title">
                        <h2>Contact</h2>
                        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                    </div>
                </div>

                <div>
                    {/* eslint-disable-next-line */}
                    <iframe style={{ border: 0, width: "100%", height: "350px" }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
                </div>

                <div className="container" style={{ marginTop: 80, marginBottom: 120 }}>
                    <div className="row">

                        <div className="col-lg-4">
                            <div className="info">
                                <div className="address d-flex mb-5">
                                    <div>
                                        <FaLocationArrow className='icon' />
                                    </div>
                                    <div>
                                        <h4>Location:</h4>
                                        <p>1212 Dhaka, Kazi Nozrul Avenur, Sylhet, Bangladesh 03214</p>
                                    </div>
                                </div>

                                <div className="email d-flex mb-5">
                                    <div>
                                        <FaEnvelope className='icon' />
                                    </div>
                                    <div>
                                        <h4>Email:</h4>
                                        <p>ujjalzaman@gmail.com</p>
                                    </div>
                                </div>

                                <div className="phone d-flex mb-5">
                                    <div>
                                        <FaPhoneAlt className='icon' />
                                    </div>
                                    <div>
                                        <h4>Call:</h4>
                                        <p>+88 01751 040425</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-8 mt-5 mt-lg-0">
                            <div className="card mb-5 p-2 shadow-sm">
                                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>First Name</label>
                                            <input type="text" name="" id="" placeholder="First Name" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Last Name</label>
                                            <input type="text" name="" id="" placeholder="Last Name" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Email</label>
                                            <input type="email" name="" id="" placeholder="Email" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Subject</label>
                                            <input type="text" name="" id="" placeholder="enter your subject" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='form-label'>Subject</label>
                                            <textarea name="" id="" cols="30" rows="10" placeholder="enter your message" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 mb-5">
                                        <button type='submit' className="appointment-btn scrollto">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact