import React from 'react'
import AdminSidebar from '../../UI/AdminSidebar'
import AdminHeader from '../../UI/AdminHeader'
import './AdminLayout.css';
const AdminLayout = ({ children }) => {
    return (
        <div class="main-wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div class="page-wrapper">
                <div class="content container-fluid">
                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title">Welcome Admin!</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout