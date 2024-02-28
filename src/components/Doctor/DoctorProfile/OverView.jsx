import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = () => {
    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <div>
                <h5 className='overview-text'>Education</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2011 - 2000"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">American Dental Medical University</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>


                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2003 - 2005"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">American Dental Medical University</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>

                </VerticalTimeline>

            </div>
            <div className='my-5'>
                <h5 className='overview-text'>Work & Experience</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2010 - Present (5 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Glowing Smiles Family Dental Clinic</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2007 - 2010 (3 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Comfort Care Dental Clinic</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="2005 - 2007 (2 years)"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Dream Smile Dental Practice</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dignissimos.</p>
                    </VerticalTimelineElement>


                  

                </VerticalTimeline>
                
            </div>
            <div >
                <h5 className='overview-text'>Awards</h5>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="July 2019"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Humanitarian Award</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="March 2011"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">Certificate for International Volunteer Service</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#2e81c4', color: '#00' }}
                        contentArrowStyle={{ borderRight: '7px solid  #2e81c4' }}
                        date="March 2011"
                        iconStyle={{ background: '#2e81c4', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">The Dental Professional of The Year Award</h5>
                        <h6 className="text-white">Miami, FL</h6>
                        <p style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </VerticalTimelineElement>

                </VerticalTimeline>
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
export default OverView;