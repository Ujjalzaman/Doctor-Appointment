import React, { useEffect, useState } from 'react'
import { useCreateBlogMutation } from '../../../redux/api/blogApi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import ImageUpload from '../../UI/form/ImageUpload';
import BlogIcon from '../../../images/blogIcon.png';

const AddBlog = () => {
    const { data: userData } = useAuthCheck();
    const [createBlog, { isLoading, isError, error, isSuccess }] = useCreateBlogMutation();
    const { register, handleSubmit } = useForm({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        if (userData && selectedImage) {
            const formData = new FormData();
            data['userId'] = userData.id;
            const blogData = JSON.stringify(data);
            formData.append('file', file);
            formData.append('data', blogData)
            await createBlog(formData);
        };
    };

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Blog Added !');
            navigate('/dashboard/blogs')
        }
    }, [isLoading, isError, error, isSuccess])
    return (
        <DashboardLayout>
       
            <div className="card mb-5 p-2 shadow-sm">
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Title</label>
                            <input placeholder='Title' {...register("title")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Description</label>
                            <textarea placeholder='Description' {...register("description")} className="form-control" rows={5} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className='d-flex gap-2 align-items-center'>
                            <div className="my-3">
                                <img className='' style={{ maxWidth: '150px' }} src={selectedImage ? selectedImage : BlogIcon} alt="" />
                            </div>
                            <div className="mt-3">
                                <ImageUpload setFile={setFile} setSelectedImage={setSelectedImage} />
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

export default AddBlog