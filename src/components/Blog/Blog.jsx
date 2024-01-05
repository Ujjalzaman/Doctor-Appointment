import React, { useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { useDebounced } from '../../redux/hooks';
import img from '../../images/cavity.png';
import dayjs from 'dayjs';
import { Empty, Pagination, message } from 'antd';
import BlogAside from './BlogAside';
import { Link } from 'react-router-dom';
import BlogComment from './BlogComment';
import Header from '../Shared/Header/Header';

const Blog = () => {
    const query = {};
    const [size, setSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    })

    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm
    }
    const { data, isError, isLoading } = useGetAllBlogsQuery({ ...query });
    const blogData = data?.blogs;
    const meta = data?.meta

    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && blogData?.length === 0) content = <Empty />
    if (!isLoading && !isError && blogData?.length > 0) content =
        <>
            {
                blogData && blogData?.map((item, index) => (
                    <div className="col-md-4 mb-3" style={{ maxWidth: '25rem' }} key={item?.id + index}>
                        <div className="card shadow text-center border-0 rounded-bottom">

                            <div className="flex-column p-0 border-0 d-flex justify-content-center align-items-center" style={{ height: '11rem', overflow: 'hidden' }}>
                                <img src={img} alt="blog Image" width={300} height={300} className="w-100 h-100 rounded-top image-hover object-fit-cover" />
                            </div>
                            <div className="card-body p-0">
                                <div className="p-2">
                                    <h6 className="text-black text-start mb-1 text-primary">{item?.title}</h6>
                                    <div className="d-flex text-start gap-2">
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <i className="ri-user-3-line"></i>
                                            <span className="form-text">Ujjal zaman</span>
                                        </div>
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <i className="ri-calendar-line"></i>
                                            <span className="form-text">{dayjs(item?.createdAt).format('MMM D, YYYY hh:mm A')}</span>
                                        </div>
                                    </div>
                                    <hr className="my-1 p-0" />
                                </div>
                                <div className="px-2">
                                    <p className="form-text text-start">{item?.description}</p>
                                </div>
                                <div className="mt-1 mb-3 text-start">
                                    <Link to={`/blog/${item?.id}`}>
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
        <>
            <Header />
            <div className="container-full mx-2">
                <div className="row">
                    <div className="col-md-9">
                        <div className="container">
                            <div className="row p-5 container container align-items-center justify-content-center rounded" style={{ background: '#d7ded6', marginTop: '5rem', marginBottom: '8rem' }}>
                                {content}
                                <div className="text-center mt-5">
                                    <Pagination
                                        defaultCurrent={size}
                                        total={meta?.total}
                                        showSizeChanger={true}
                                        showPrevNextJumpers={true}
                                        pageSize={size}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <BlogAside setSearchTerm={setSearchTerm} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Blog;