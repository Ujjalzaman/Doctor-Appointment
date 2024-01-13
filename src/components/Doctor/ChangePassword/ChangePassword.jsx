import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Button } from 'antd';

const ChangePassword = () => {
    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded p-2" style={{ background: '#f8f9fa' }}>
                <h5 className='text-title mt-3'>Change Your Password</h5>
                <form className='container row form-row px-5 mx-auto my-5'>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>Old Password</label>
                            <input type="password" placeholder='Old Password' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>New Password</label>
                            <input type="password" placeholder='New Password' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm Password' className="form-control" />
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <Button htmlType='submit' type="primary" size='large'>Save Changes</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default ChangePassword;