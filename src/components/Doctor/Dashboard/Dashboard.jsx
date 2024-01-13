import React from 'react'
import DoctorDashCard from './doctor/DoctorDashCard';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardPage from './doctor/DashboardPage';
import PatientDashboard from './PatientDashboard';

const Dashboard = () => {
    const { role } = useAuthCheck();
    return (
        <>
            <DashboardLayout>
                {role === 'doctor' && <DoctorDashCard /> }

                <div className="row">
                    {role === 'patient' ?
                        <div className="col-md-12">
                            <h4 className="mb-4">My Appointments</h4>
                            <PatientDashboard />
                        </div>
                        :
                        <div className="col-md-12" style={{ background: '#f8f9fa' }}>
                            <h5 className="my-2">Appointments</h5>
                            <DashboardPage />
                        </div>
                    }

                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;