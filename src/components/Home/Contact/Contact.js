import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact my-5 py-5" id="ContactPage">
            <div className="container">
                <div className="section-header text-center text-white mb-5">
                    <h5 className="text-secondary">Contact Us </h5>
                    <h1 className="brand-color">Alawys Connect With Us</h1>
                </div>
            </div>

            <div className="col-md-9 mx-auto">
                <form action="">
                    <div className="form-group">
                        <input type="text" name="" id="" placeholder="enter your name" className="form-control mb-3" />
                    </div>
                    <div className="form-group">
                        <input type="email" name="" id="" placeholder="enter your email" className="form-control mb-3" />
                    </div>
                    <div className="form-group">
                        <input type="subject" name="" id="" placeholder="enter your subject" className="form-control mb-3" />
                    </div>

                    <div className="form-group">
                        <textarea name="" id="" cols="30" rows="10" placeholder="enter your message" className="form-control mb-3" />
                    </div>
                    <div className="form-group text-center">
                        <button type="button" className="btn btn-primary mb-3"> Submit</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Contact;