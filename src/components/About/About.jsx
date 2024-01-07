import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import img2 from '../../images/doc/doctor 5.jpg'
import docImg from '../../images/doc/doctor 3.jpg'

const About = () => {
    return (
        <>
            <Header />
            <section className="about-us">
                <div className="overlay"></div>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='mb-4 section-title text-center'>
                                <h2 className='text-white text-uppercase'>About Us</h2>
                                <p className='text-white m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4 about-title">
                        <h2>Personal care for your healthy living</h2>
                    </div>
                    <div className="col-lg-8">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, quod laborum alias. Vitae dolorum, officia sit! Saepe ullam facere at, consequatur incidunt, quae esse, quis ut reprehenderit dignissimos, libero delectus.</p>
                        <img src={img2} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    {
                        Array(4).fill(null).map((_item, id) => (
                            <div className="col-lg-3 col-md-6" key={id + 4}>
                                <div className="card shadow border-0 mb-5 mb-lg-0">
                                    <img src={img2} alt="" className="m-0 img-fluid w-100" />
                                    <div className='p-2'>
                                        <h4 className="mt-3" style={{ color: '#223a66' }}>Healthcare for Kids</h4>
                                        <p className='form-text'>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium .</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            {
                                Array(6).fill(null).map((_, id) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6" key={id + 3}>
                                        <div className="award-img">
                                            <img src={docImg} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>Meet Our Specialist</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {
                        Array(4).fill(null).map((_, id) => (
                            <div className="col-lg-3 col-md-6 col-sm-6" key={id + 2}>
                                <div className="card shadow border-0 mb-5 mb-lg-0">
                                    <img src={docImg} alt="" className="img-fluid w-100" />

                                    <div className="p-2">
                                        <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>John Marshal</a></h4>
                                        <p>Internist, Emergency Physician</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>


            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>What Doctor's Say</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{color:'#223a66'}} className='my-0'>Amazing service!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                            They provide great service facilty consectetur adipisicing elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam eveniet nostrum nemo commodi numquam quod.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About