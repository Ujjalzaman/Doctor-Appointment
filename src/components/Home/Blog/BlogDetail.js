import React from 'react';

const BlogDetail = (props) => {
    const {title, description, author, authorImg, date } = props.blog
    return (
        <div className="card shadow m-2">
            <div className="card-header d-flex align-itmes-center">
                <img src={authorImg} width="60" alt="" />
                <div>
                    <h6 className="text-primary">{author}</h6>
                    <p className="m-0">{date}</p>
                </div>
            </div>
            <div className="card-body">
                <h5>{title}</h5>
                <p className="card-text text-secondary mt-4">{description}</p>
            </div>
        </div>
    );
};

export default BlogDetail;