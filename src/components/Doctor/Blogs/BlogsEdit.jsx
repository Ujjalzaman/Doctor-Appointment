import React, { useEffect, useState } from 'react'
import { useGetSingleBlogQuery, useUpdateBlogMutation } from '../../../redux/api/blogApi';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import ImageUpload from '../../UI/form/ImageUpload';
import BlogIcon from '../../../images/blogIcon.png';

const BlogsEdit = () => {
    const { id } = useParams();
    const { data } = useGetSingleBlogQuery(id);
    const [updateBlog, { isLoading, isError, error, isSuccess }] = useUpdateBlogMutation();
    const { register, handleSubmit } = useForm({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const updates = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
        const formData = new FormData();
        selectedImage && formData.append('file', file);
        const strData = JSON.stringify(updates)
        formData.append('data', strData)
        updateBlog({ data: formData, id: id, })
    }

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Blog Updated !');
            navigate('/dashboard/blogs')
        }
    }, [isLoading, isError, error, isSuccess])

    return (
        <DashboardLayout>
            <div className="mb-5 p-2" style={{ background: '#f8f9fa' }}>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Title</label>
                            <input defaultValue={data?.title} {...register("title")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Description</label>
                            <textarea defaultValue={data?.description} {...register("description")} className="form-control" rows={5} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className='d-flex gap-2 align-items-center'>
                            <div className="my-3">
                                <img className='' style={{ maxWidth: '150px' }} src={selectedImage ? selectedImage : data?.img || BlogIcon} alt="" />
                            </div>
                            <div className="mt-3">
                                <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
                            </div>
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large' loading={isLoading} disabled={isLoading ? true : false} >
                            {isLoading ? 'Saving ...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default BlogsEdit