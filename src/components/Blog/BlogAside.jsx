import React from 'react'
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, Input, message } from 'antd';
import img from '../../images/cavity.png';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

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
                    
                        <div style={{ minHeight: '4rem', overflow: 'hidden' }}>
                            <img src={img} alt={item?.title} width={90} height={90} className="w-100 h-100 rounded image-hover object-fit-cover" />
                        </div>
                    
                    <div className="p-2">
                        <Link to={`/blog/${item?.id}`}>
                            <h6 className="text-black text-start mb-1 text-primary"> {item?.title}</h6>
                        </Link>
                        <Link to={`/blog/${item?.id}`}>
                            <div className="d-flex text-start gap-2">
                                <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                                    <i className="ri-calendar-line"></i>
                                    <span className="form-text">{dayjs(item?.createdAt).format('MMM D, YYYY hh:mm A')}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    return (
        <div>
            {setSearchTerm !== undefined &&
                <div className="mb-4">
                    <h5 className="mb-3" style={{ fontWeight: '900' }}>SEARCH</h5>
                    <div className="form-group has-search">
                        <i className="ri-search-line form-control-feedback"></i>
                        <Input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            }
            <div className="mb-4">
                <h5 className="mb-3" style={{ fontWeight: '900' }}>CATEGORIES</h5>
                <ul className="px-0">
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                        <i className="ri-arrow-drop-right-line" style={{ fontSize: '2rem' }}></i>
                        <span>Pc & Mac Repair</span>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h5 className="mb-3" style={{ fontWeight: '900' }}>RECEN POSTS</h5>
                {content}
            </div>

            <div className="mb-4">
                <h5 className="mb-3" style={{ fontWeight: '900' }}>TAGS</h5>
                <div className="d-flex flex-wrap gap-3">
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>Repair</button>
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>Dissembing</button>
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>Installation</button>
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>SmartPhone</button>
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>Data Recovery</button>
                    <button className="btn text-black px-3 py-1 btn-sm" style={{ background: '#cbcaca' }}>Display</button>
                </div>
            </div>
        </div>
    )
}

export default BlogAside