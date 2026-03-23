import React from 'react'
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { FaAngleDoubleRight } from "react-icons/fa";
import { truncate } from '../../utils/truncate';
import './index.css';
import moment from 'moment';

const categories = [
    "Professional Development",
    "Global Health Perspectives",
    "Professional Development",
    "Mental Health Awareness",
    "Pediatric Care",
    "Women's Health",
    "Nutrition and Dietetics",
    "Medical Education and Training"
]

const BlogAside = ({ setSearchTerm }) => {
    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const blogData = data?.blogs
    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && blogData?.length === 0) content = <Empty />
    if (!isLoading && !isError && blogData?.length > 0) content =
        <>
            {blogData && blogData?.map((item, index) => (
                <div className="d-flex gap-2 align-items-center mb-2" key={item?.id + index}>

                    <div style={{ maxWidth: '4rem', height:'80px', overflow:'hidden' }}>
                        <img src={item?.img} alt={item?.title} className="w-100 h-100 rounded image-hover object-fit-cover" />
                    </div>

                    <div className="p-2">
                        <Link to={`/blog/${item?.id}`}>
                            <h6 className="text-black text-start mb-1 text-primary"> {truncate(item?.title, 18)}</h6>
                        </Link>
                        <Link to={`/blog/${item?.id}`}>
                            <div className="d-flex text-start gap-2">
                                <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                    <i className="ri-calendar-line"></i>
                                    <span className="form-text">{moment(item?.createdAt).format('LL')}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>


    return (
        <div className='p-3' style={{ background: '#f8f9fa' }}>

            <div className="mb-4">
                <h5 className="blog-title">SEARCH</h5>
                <Search placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%" }} />
            </div>

            <div className="mb-4">
                <h5 className="blog-title">CATEGORIES</h5>
                {
                    categories.map((item, index) => (
                        <div className="my-2 d-flex gap-2 align-items-center categories-title" key={index}>
                            <FaAngleDoubleRight className='icon' /><h6 className='my-2'>{item}</h6>
                        </div>
                    ))
                }
            </div>

            <div className="mb-4">
                <h5 className="blog-title">RECEN POSTS</h5>
                {content}
            </div>

            <div className="mb-4">
                <h5 className="mb-3" style={{ fontWeight: '900' }}>TAGS</h5>
                <div className="d-flex flex-wrap gap-3">
                    {
                        Array(6).fill(null).map((_item, index) => (
                            <button key={index + 2} className="btn text-black px-3 py-1 btn-sm" style={{ background: '#e5e5e5' }}>{'tags' + index}</button>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogAside