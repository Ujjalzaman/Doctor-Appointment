import React, { useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { useDebounced } from '../../redux/hooks';
import { Empty, Pagination, message } from 'antd';
import BlogAside from './BlogAside';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { truncate } from '../../utils/truncate';
import { FaRegUser, FaBusinessTime } from "react-icons/fa";
import moment from 'moment';

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
                    <div className="col-md-4 col-sm-12 mb-5" style={{ maxWidth: '25rem' }} key={item?.id + index}>
                        <div className="card shadow text-center border-0 rounded-bottom">

                            <div className="flex-column p-0 border-0 d-flex justify-content-center align-items-center" style={{ height: '11rem', overflow: 'hidden' }}>
                                <img src={item?.img} alt="blog Image" width={300} height={300} className="w-100 h-100 rounded-top image-hover" style={{objectFit:'contain'}}/>
                            </div>
                            <div className="card-body p-0">
                                <div className="p-2">
                                    <Link to={`/blog/${item?.id}`}>
                                        <h6 className="text-start mb-1 text-capitalize" style={{ color: '#05335c' }}>{truncate(item?.title, 60)}</h6>
                                    </Link>
                                    <div className="d-flex text-start gap-2">
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <FaRegUser className='form-text' />
                                            <span className="form-text">{item?.user.firstName + ' ' + item?.user.firstName }</span>
                                        </div>
                                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                            <FaBusinessTime className='form-text' />
                                            <span className="form-text">{moment(item?.createdAt).format('LL')}</span>
                                        </div>
                                    </div>
                                    <hr className="my-1 p-0" />
                                </div>
                                <div className="px-2">
                                    <p className="form-text text-start text-capitalize">{truncate(item?.description, 200)}</p>
                                </div>
                                <div className="mt-1 mb-3 text-start">
                                    <Link to={`/blog/${item?.id}`}>
                                        <button className="btn btn-link border-0" style={{ color: '#1977cc' }}>Read More</button>
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
            <SubHeader title='Blog' subtitle='Lorem ipsum dolor sit amet.' />

            <div className="container-fluid" style={{ marginTop: 150, marginBottom: 100 }}>
                <div className="row">
                    <div className="col-md-9 col-sm-12">
                        <div className="p-3 py-5 mx-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="row">
                                {content}
                            </div>
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
                    <div className="col-md-3 col-sm-12">
                        <BlogAside setSearchTerm={setSearchTerm} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Blog;