import React from 'react';
import './ChangePassword.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import logo from '../../../images/logo.png'
const ChangePassword = () => {
    return (
        <DashboardLayout>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 col-lg-6">

                            <form>
                                <div class="form-group">
                                    <label>Old Password</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="submit-section">
                                    <button type="submit" class="btn btn-primary submit-btn">Save Changes</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ChangePassword