import React from 'react'

const OverView = () => {
    return (
        <div className="col-md-12 col-lg-9">

            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <div>
                <h5 className='overview-text'>Education</h5>

                <div className="experience-box">
                    <ul className="experience-list">
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <a href="#/" className="name">American Dental Medical University</a>
                                    <div>BDS</div>
                                    <span className="time">1998 - 2003</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <a href="#/" className="name">American Dental Medical University</a>
                                    <div>MDS</div>
                                    <span className="time">2003 - 2005</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h5 className='overview-text'>Work & Experience</h5>
                <div className="experience-box">
                    <ul className="experience-list">
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <a href="#/" className="name">Glowing Smiles Family Dental Clinic</a>
                                    <span className="time">2010 - Present (5 years)</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <a href="#/" className="name">Comfort Care Dental Clinic</a>
                                    <span className="time">2007 - 2010 (3 years)</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <a href="#/" className="name">Dream Smile Dental Practice</a>
                                    <span className="time">2005 - 2007 (2 years)</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div >
                <h5 className='overview-text'>Awards</h5>

                <div className="experience-box">
                    <ul className="experience-list">
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <p className="exp-year">July 2019</p>
                                    <h6 className="exp-title">Humanitarian Award</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <p className="exp-year">March 2011</p>
                                    <h6 className="exp-title">Certificate for International Volunteer Service</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="experience-user">
                                <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                                <div className="timeline-content">
                                    <p className="exp-year">May 2008</p>
                                    <h4 className="exp-title">The Dental Professional of The Year Award</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h5 className='overview-text'>Services</h5>
                <ul>
                    <li>Tooth cleaning </li>
                    <li>Root Canal Therapy</li>
                    <li>Implants</li>
                    <li>Composite Bonding</li>
                    <li>Fissure Sealants</li>
                    <li>Surgical Extractions</li>
                </ul>
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <ul className="clearfix">
                    <li>Children Care</li>
                    <li>Dental Care</li>
                    <li>Oral and Maxillofacial Surgery </li>
                    <li>Orthodontist</li>
                    <li>Periodontist</li>
                    <li>Prosthodontics</li>
                </ul>
            </div>

        </div>
    )
}

export default OverView