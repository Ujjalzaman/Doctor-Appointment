import React, { useEffect } from 'react'
import { useGetSingleBlogQuery, useUpdateBlogMutation } from '../../../redux/api/blogApi';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';

const BlogsEdit = () => {
    const { id } = useParams();
    const { data } = useGetSingleBlogQuery(id);
    const [updateBlog, {isLoading, isError, error, isSuccess} ] = useUpdateBlogMutation();
    const { register, handleSubmit } = useForm({});
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const changeData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
        updateBlog({id: id, data: changeData})
    }
    useEffect(() => {
        if (!isLoading && isError) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success('Successfully Blog Updated !');
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
                            <input defaultValue={data?.title} {...register("title")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Description</label>
                            <textarea defaultValue={data?.description} {...register("description")} className="form-control" rows={5} />
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