import React, { useEffect } from 'react'
import { useCreateBlogMutation } from '../../../redux/api/blogApi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const AddBlog = () => {
    const {data:userData} = useAuthCheck();
    const [createBlog, {isLoading, isError, error, isSuccess} ] = useCreateBlogMutation();
    const { register, handleSubmit } = useForm({});
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if(userData){
            data['userId'] = userData.id;
            createBlog(data)
        };
    };
    
    useEffect(() => {
        if (!isLoading && isError) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success('Successfully Blog Added !');
            navigate('/dashboard/blogs')
        }
    }, [isLoading, isError, error, isSuccess])
    return (
        <DashboardLayout>
            <Toaster />
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