
import dayjs from 'dayjs';
import { Empty, message } from 'antd';
import { useGetAllBlogsQuery } from "../../../redux/api/blogApi";
import { Link } from 'react-router-dom';
import { truncate } from '../../../utils/truncate';

const Blog = () => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 3 });
    const blogData = data?.blogs;
    let content = null;

    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <div>{message.error('something went Wrong!')}</div>
    if (!isLoading && !isError && blogData?.length === 0) content = <Empty />
    if (!isLoading && !isError && blogData?.length > 0) content =
        <>
            {
                blogData?.map((item) => (
                    <div className="col-md-4 col-sm-12 mb-3 custom-blog-card" key={item?.id}>
                        <div className="card shadow text-center border-0 rounded-bottom">

                            <div className="flex-column p-0 border-0 d-flex justify-content-center align-items-center" style={{ height: '11rem', overflow: 'hidden' }}>
                                {item?.img && <img src={item?.img} alt="blog Image" width={300} height={300} className="w-100 h-100 rounded-top image-hover" style={{objectFit:'cover'}}/>}
                            </div>

                            <div className="card-body p-0">
                                <div className="p-2">
                                    <Link to={`/blog/${item?.id}`} style={{ textDecoration: 'none' }}>
                                        <h6 className="text-black text-start mb-1 text-primary">{truncate(item?.title, 60)}</h6>
                                    </Link>
                                    <div className="d-flex text-start gap-2">
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <i className="ri-user-3-line"></i>
                                            <span className="form-text">{item?.user?.firstName + ' ' + item?.user?.lastName}</span>
                                        </div>
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <i className="ri-calendar-line"></i>
                                            <span className="form-text">{dayjs(item?.createdAt).format('MMM D, YYYY hh:mm A')}</span>
                                        </div>
                                    </div>
                                    <hr className="my-1 p-0" />
                                </div>
                                <div className="px-2">
                                    <p className="form-text text-start">{truncate(item?.description, 180)}</p>
                                </div>
                                <div className="mt-1 mb-3 text-start">
                                    <Link to={`blog/${item?.id}`}>
                                        <button className="btn btn-link border-0 text-primary">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    return (
        <div className="container" style={{ marginTop: "8.5rem", marginBottom: '7rem' }}>
            <div className='mb-5 section-title text-center'>
                <h2>OUR BLOG</h2>
                <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="container">
                <div className="row py-5 align-items-center justify-content-center rounded" style={{ background: '#f8f9fa' }}>
                    {content}
                    <div className='text-center mt-5'>
                        <Link to={'/blog'} className='more-btn'>See More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog