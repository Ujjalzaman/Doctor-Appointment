import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Empty } from 'antd';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';

const OurDoctors = () => {
    const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 4 });
    const doctors = data?.doctors;

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && doctors?.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && doctors?.length > 0) content =
        <>
            {
                doctors && doctors?.map((item, key) => (
                    <div className="col-lg-6 mt-3" key={key + 2}>
                        <div className="member d-flex align-items-start">
                            <div className="pic">
                                {item.img && <img src={item.img} className="img-fluid" alt="" />}
                            </div>
                            <div className="member-info">
                                <h4>{item?.firstName + ' ' + item?.lastName}</h4>
                                <span>{item?.designation}</span>
                                <p>{item?.specialization}</p>
                                <div className="social">
                                    <a><FaFacebookSquare className='icon' /></a>
                                    <a><FaInstagramSquare className='icon' /></a>
                                    <a><FaLinkedin className='icon' /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title text-center mb-3">
                    <h2>OUR DOCTORS</h2>
                    <p className='form-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, adipisci?</p>
                </div>

                <div className="row">
                    {content}
                </div>
            </div>
        </section>
    )
}

export default OurDoctors;