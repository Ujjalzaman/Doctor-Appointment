import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleBlogQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import BlogAside from './BlogAside';
import Footer from '../Shared/Footer/Footer';
import BlogComment from './BlogComment';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { FaRegUser, FaBusinessTime } from "react-icons/fa";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import moment from 'moment';

const BlogDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleBlogQuery(id);

    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content =
        <div className="card shadow-sm text-center border-0 rounded-bottom">

            <div className="flex-column card-header p-0 border-0 d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', maxHeight: '40rem' }}>
                {data?.img && <img src={data?.img} alt="blog Image" width={800} height={500} className="image-hover w-100 rounded-top" style={{ objectFit: 'cover' }} />}
            </div>

            <div className="card-body p-0">
                <div className="p-2 my-2">
                    <h5 className="text-start mb-1" style={{ color: '#05335c' }}>{data?.title}</h5>
                    <div className="d-flex text-start gap-2">
                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                            <FaRegUser className='form-text' />
                            <span className="form-text">{data?.user?.firstName + ' ' + data?.user?.lastName}</span>
                        </div>
                        <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                            <FaBusinessTime className='form-text' />
                            <span className="form-text">{moment(data?.cretedAt).format('LL')}</span>
                        </div>
                    </div>
                    <hr className="my-1 p-0" />
                </div>
                <div className="px-3 my-3">
                    <p className="text-secondary text-start">{data?.description}</p>
                </div>
            </div>
            <div className="d-flex gap-2 ms-2 px-2 py-3">
                <span className="">Tags:</span>
                <div className="d-flex gap-2">
                    {
                        Array(4).fill(null).map((_item, index) => (<h5 key={index + 2}>#tag{index}</h5>))
                    }
                </div>
            </div>
        </div>
    return (
        <>
            <Header />
            <SubHeader title='Blog Details' subtitle='Lorem ipsum dolor sit amet.' />
            <div className="container-fluid" style={{ marginTop: 150 }}>
                <div className="row mx-2">
                    <div className="col-md-9 col-sm-12">
                        {
                            content
                        }
                        <hr />
                        <div className="d-flex justify-content-end">
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-end text-md-end">
                                <h5 className="text-dark rounded d-inline me-2">Share On </h5>
                                <a className="btn btn-outline-primary btn-floating m-1" >
                                    <FaFacebookSquare />
                                </a>
                                <a className="btn btn-outline-primary btn-floating m-1">
                                    <FaInstagramSquare />
                                </a>
                                <a className="btn btn-outline-primary btn-floating m-1">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                        <BlogComment />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <BlogAside setSearchTerm={undefined} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BlogDetails