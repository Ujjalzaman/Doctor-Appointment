import React from 'react';

const BlogDetail = (props) => {
    const { title, description, author, authorImg, date } = props.blog
    return (
        <div className=" blog-card col-md-4 col-sm-6 col-12">
            <div className="card shadow-lg">
                <div className="card-header d-flex align-itmes-center ">
                    <img src={authorImg} width="50px" alt="" />
                    <div>
                        <h6 className="text-primary">{author}</h6>
                        <p className="m-0">{date}</p>
                    </div>
                </div>
                <div className="card-body">
                    <h5>{title}</h5>
                    <p className="card-text text-secondary mt-4">{description}</p>
                    <a href="!#">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;