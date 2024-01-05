import React from 'react'
import Footer from '../Shared/Footer/Footer'
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import Header from '../Shared/Header/Header';

const Contact = () => {
    const { register, handleSubmit } = useForm({});
    const onSubmit = (data) => {

    };
    return (
        <>
            <Header />
            <section className="container my-5 py-5 position-relative" id="ContactPage">
                <div className="container">
                    <div className="section-header text-center text-white mb-5">
                        <h5 className="text-white">Contact Us </h5>
                        <h1 className="text-white">Alawys Connect With Us</h1>
                    </div>
                </div>

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

                        <div className='text-center my-3'>
                            <Button htmlType='submit' type="primary" size='large'>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact