import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleBlogQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import BlogAside from './BlogAside';
import img from '../../images/cavity.png';
import dayjs from 'dayjs';

const BlogDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleBlogQuery(id);

    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content =
        <div className="card shadow text-center border-0 rounded-bottom">

            <div className="flex-column card-header p-0 border-0 d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', maxHeight: '40rem' }}>
                <img src={img} alt="blog Image" width={800} height={500} className="image-hover w-100 rounded-top" style={{ objectFit: 'cover' }} />
            </div>

            <div className="card-body p-0">
                <div className="p-2 my-2">
                    <h5 className="text-black text-start mb-1 text-primary"> {data?.title}</h5>
                    <div className="d-flex text-start gap-2">
                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                            <i className="ri-user-3-line"></i>
                            <span className="form-text">Ujjal zaman</span>
                        </div>
                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                            <i className="ri-calendar-line"></i>
                            <span className="form-text">{dayjs(data?.cretedAt).format('MMM D, YYYY hh:mm A')}</span>
                        </div>
                    </div>
                    <hr className="my-1 p-0" />
                </div>
                <div className="px-3 my-3">
                    <p className="form-text text-start">{data?.description}</p>
                </div>
            </div>
            <div className="d-flex gap-2 ms-2">
                <span className="">Tags:</span>
                <div className="text-dark d-flex gap-2" style={{ fontWeight: '900' }}>
                    <p>#Assembling</p>
                    <p>#blog</p>
                    <p>#Sport</p>
                    <p>#Others</p>
                </div>
            </div>
        </div>
    return (
        <div className="container-full">
            <div className="row mx-2" style={{ marginTop: '4rem', marginBottom: '8rem' }}>
                <div className="col-md-9">
                    {
                        content
                    }
                    <hr />
                    <div className="d-flex justify-content-end shadow">
                        <div className="col-md-5 col-lg-4 ml-lg-0 text-end text-md-end">
                            <p className="text-dark rounded d-inline me-2">Share On </p>
                            <a className="btn btn-outline-primary btn-floating m-1">
                                <i className="ri-facebook-fill"></i>
                            </a>

                            <a className="btn btn-outline-primary btn-floating m-1" >
                                <i className="ri-twitter-line"></i>
                            </a>

                            <a className="btn btn-outline-primary btn-floating m-1">
                                <i className="ri-google-line"></i>
                            </a>
                            <a className="btn btn-outline-primary btn-floating m-1">
                                <i className="ri-instagram-line"></i>
                            </a>
                        </div>
                    </div>
                    {/* <BlogComments /> */}
                </div>
                <div className="col-md-3">
                    <BlogAside setSearchTerm={undefined} />
                </div>
            </div>
        </div>
    )
}

export default BlogDetails